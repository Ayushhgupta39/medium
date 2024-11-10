import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware
blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization") || "";

    // Remove "Bearer " if present
    const token = authHeader.replace("Bearer ", "");

    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload.id) {
      return c.json({ message: "Unauthorized access - no user id" }, 403);
    }

    c.set("userId", payload.id as string);
    await next();
  } catch (error) {
    return c.json({ message: "Unauthorized access" }, 403);
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { title, content } = await c.req.json();
    const userId = c.get("userId");

    console.log("userId from context:", userId); // Debug log

    if (!userId) {
      return c.json({ message: "User ID is required" }, 400);
    }

    const createdBlog = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return c.json({
      message: "Blog created successfully",
      data: createdBlog,
    });
  } catch (error) {
    console.error("Error while creating blog:", (error as Error).message);
    return c.json(
      {
        message: "Error creating blog",
        error: (error as Error).message,
      },
      411
    );
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({});
    if (!blogs) {
      c.status(404);
      return c.json({
        message: "Blogs not found.",
      });
    }

    return c.json({
      message: "Blogs found successfully",
      data: blogs,
    });
  } catch (error) {
    c.status(500);
    console.error("Error while finding blogs :", (error as Error).message);
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");

    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({
        message: "Blog not found.",
      });
    }

    return c.json({
      message: "Blog found successfully",
      data: blog,
    });
  } catch (error) {
    c.status(500);
    console.error("Error while finding blog :", (error as Error).message);
  }
});

blogRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { title, content } = await c.req.json();
    const { id } = c.req.param();

    const updatedBlog = await prisma.post.update({
      where: { id: id },
      data: {
        title: title,
        content: content,
      },
    });

    if (!updatedBlog) {
      c.status(500);
      return c.json({
        message: "Something went wrong while updating Blog",
      });
    }

    return c.json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    c.status(500);
    console.error("Error while updating blog :", (error as Error).message);
  }
});

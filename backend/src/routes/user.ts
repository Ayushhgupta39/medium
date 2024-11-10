import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@ayushgupta39/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/", (c) => {
  return c.text("Hello Hono!");
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const payload = {
      sub: body.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 60 minutes
    };
    const secret = "mySecretKey";
    const token = await sign(payload, secret);

    if (!createdUser) {
      return c.json({ error: "User could not be created" }, 500);
    }

    return c.json({
      message: "User created successfully",
      user: createdUser,
      token: token,
    });
  } catch (error) {
    console.log((error as Error).message);
  }
});

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const body = await c.req.json();
      const { success } = signinInput.safeParse(body);

      if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
  
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password,
        },
      });
  
      if (!user) {
        return c.json({ error: "Incorrect email or password." }, 403);
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ message: "Login successful", jwt });
    } catch (error) {
      return c.json({ error: "Login failed" }, 500);
    }
  });
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

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
    const { name, email, password } = await c.req.json();

    const createdUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    const payload = {
      sub: email,
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
      const { email, password } = await c.req.json();
  
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          password: password,
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
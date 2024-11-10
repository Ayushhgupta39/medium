import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// APP Routes

// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk

// HTTP Methods
app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

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
});

app.get("/api/v1/blog/:id", async (c) => {
  return c.text("Blog page");
});
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("All blogs page");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("Sign in page!");
});
app.post("/api/v1/blog", (c) => c.text("POST /"));
app.put("/api/v1/blog/:id", (c) => c.text("PUT /"));
app.delete("/", (c) => c.text("DELETE /"));

export default app;

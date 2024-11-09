import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// APP Routes

// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk

// HTTP Methods
app.get('/api/v1/blog/:id', async (c) => {
  return c.text("Blog page")
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text("All blogs page")
})
app.post('/api/v1/user/signup', async (c) => {
  // const { username, email, password } = c.req.json;
  return c.text('Sign up page!')
})
app.post('/api/v1/user/signin', (c) => {
  return c.text("Sign in page!")
})
app.post('/api/v1/blog', (c) => c.text('POST /'))
app.put('/api/v1/blog/:id', (c) => c.text('PUT /'))
app.delete('/', (c) => c.text('DELETE /'))


export default app

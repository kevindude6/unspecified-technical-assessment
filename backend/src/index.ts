import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prisma } from './lib/prisma.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/producttest', async (c) => {
  const products = await prisma.product.findMany({});
  return c.json(products, 200);
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

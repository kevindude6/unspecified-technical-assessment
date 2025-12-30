import { Hono } from "hono";
import productsRoutes from "./routes/products.js";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// Nest product routes under /api/products
app.route("/api/product", productsRoutes);

export default app;

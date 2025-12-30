import { Hono } from "hono";
import { cors } from "hono/cors";
import productsRoutes from "./routes/products.js";
import categoriesRoutes from "./routes/categories.js";

const app = new Hono();

app.use("*", cors());
app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// Nest product routes under /api/products
app.route("/api/product", productsRoutes);

// Nest category routes under /api/categories
app.route("/api/categories", categoriesRoutes);

export default app;

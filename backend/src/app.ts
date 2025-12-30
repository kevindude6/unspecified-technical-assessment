import { Hono } from "hono";
import productsRoutes from "./routes/products.js";
import categoriesRoutes from "./routes/categories.js";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// Nest product routes under /api/products
app.route("/api/product", productsRoutes);

// Nest category routes under /api/categories
app.route("/api/categories", categoriesRoutes);

export default app;

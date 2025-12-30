import { Hono } from "hono";
import { cors } from "hono/cors";
import productsRoutes from "./routes/products.js";
import categoriesRoutes from "./routes/categories.js";
import { serveStatic } from "@hono/node-server/serve-static";

const publicDir = "./dist/frontend";
const app = new Hono();

app.use("*", cors());

// Nest product routes under /api/products
app.route("/api/product", productsRoutes);

// Nest category routes under /api/categories
app.route("/api/category", categoriesRoutes);

app.use(
	"*",
	serveStatic({
		root: publicDir,
	}),
);

app.use(
	"*",
	serveStatic({
		root: publicDir,
		path: "/index.html",
	}),
);

export default app;

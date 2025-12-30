import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { type } from "arktype";
import { sValidator } from "@hono/standard-validator";

const app = new Hono();

// Product creation schema validation using ArkType
const productSchema = type({
	title: "1 <= string <= 255",
	description: "1 <= string <= 255",
	categoryId: "number.integer",
	price: "number >= 0",
	stock: "number.integer",
	brand: "1 <= string <= 255",
	sku: "1 <= string <= 255",
	weight: "number > 0",
});

// POST /api/products - Create a new product
app.post(
	"/",
	sValidator("json", productSchema, (result, c) => {
		if (!result.success) {
			return c.json({ success: false, error: "Validation Error" }); // More details good, but we need to move quickly
		}
	}),
	async (c) => {
		try {
			const productData = await c.req.valid("json");

			// Check if category exists
			const category = await prisma.category.findUnique({
				where: { id: productData.categoryId },
			});

			if (!category) {
				return c.json({ success: false, error: "Category not found" }, 404);
			}

			// Create the product
			const product = await prisma.product.create({
				data: {
					title: productData.title,
					description: productData.description,
					categoryId: productData.categoryId,
					price: productData.price,
					stock: productData.stock,
					brand: productData.brand,
					sku: productData.sku,
					weight: productData.weight,
				},
			});

			return c.json(
				{
					success: true,
					data: {
						products: [product],
					},
					message: "Product created successfully",
				},
				201,
			);
		} catch (error) {
			console.error("Error creating product:", error);
			return c.json({ success: false, error: "Failed to create product" }, 500);
		}
	},
);

export default app;

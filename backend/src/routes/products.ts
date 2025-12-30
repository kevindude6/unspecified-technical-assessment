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

// Product update schema validation using ArkType
const productUpdateSchema = type({
	"title?": "1 <= string <= 255",
	"description?": "1 <= string <= 255",
	"categoryId?": "number.integer",
	"price?": "number >= 0",
	"stock?": "number.integer",
	"brand?": "1 <= string <= 255",
	"sku?": "1 <= string <= 255",
	"weight?": "number > 0",
	"id?": "number.integer",
	"category?": "object",
});

// POST /api/products - Create a new product
app.post(
	"/",
	sValidator("json", productSchema, (result, c) => {
		if (!result.success) {
			return c.json({ success: false, error: "Validation Error" }, 400); // More details good, but we need to move quickly
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

// Query parameter schema for filtering and pagination
const productQuerySchema = type({
	"search?": "string",
	"categoryId?": "string.integer.parse",
	"page?": "string.integer.parse",
});

// GET /api/products - Get all products with filtering and pagination
app.get(
	"/",
	sValidator("query", productQuerySchema, (result, c) => {
		if (!result.success) {
			return c.json({ success: false, error: "Invalid query parameters" }, 400);
		}
	}),
	async (c) => {
		try {
			const QUERY_LIMIT = 30;
			const { search, categoryId, page = 1 } = c.req.valid("query");

			// Build where clause for filtering
			// biome-ignore lint/suspicious/noExplicitAny: need to allow this
			const where: any = {};

			// Add search filter (case-insensitive match on title, description, or category name)
			if (search) {
				where.OR = [
					{
						title: {
							contains: search,
							mode: "insensitive",
						},
					},
					{
						description: {
							contains: search,
							mode: "insensitive",
						},
					},
					{
						category: {
							name: {
								contains: search,
								mode: "insensitive",
							},
						},
					},
				];
			}

			// Add category filter
			if (categoryId) {
				where.categoryId = categoryId;
			}

			// Calculate pagination
			const skip = (page - 1) * QUERY_LIMIT;
			const take = QUERY_LIMIT;

			// Get total count for pagination metadata
			const total = await prisma.product.count({ where });

			// Get products with filtering and pagination
			const products = await prisma.product.findMany({
				where,
				include: {
					category: true,
				},
				skip,
				take,
				orderBy: {
					id: "desc", // Show newest products first
				},
			});

			// Calculate pagination metadata
			const totalPages = Math.ceil(total / QUERY_LIMIT);
			const hasNextPage = page < totalPages;
			const hasPrevPage = page > 1;

			return c.json({
				success: true,
				data: {
					products: products,
					pagination: {
						currentPage: page,
						totalPages: totalPages,
						totalItems: total,
						itemsPerPage: QUERY_LIMIT,
						hasNextPage: hasNextPage,
						hasPrevPage: hasPrevPage,
					},
				},
				message: "Products retrieved successfully",
			});
		} catch (error) {
			console.error("Error retrieving products:", error);
			return c.json(
				{ success: false, error: "Failed to retrieve products" },
				500,
			);
		}
	},
);

// GET /api/products/:id - Get a single product by ID
app.get("/:id", async (c) => {
	try {
		const id = parseInt(c.req.param("id"), 10);

		if (Number.isNaN(id)) {
			return c.json({ success: false, error: "Invalid product ID" }, 400);
		}

		const product = await prisma.product.findUnique({
			where: { id: id },
			include: {
				category: true,
			},
		});

		if (!product) {
			return c.json({ success: false, error: "Product not found" }, 404);
		}

		return c.json({
			success: true,
			data: {
				products: [product],
			},
			message: "Product retrieved successfully",
		});
	} catch (error) {
		console.error("Error retrieving product:", error);
		return c.json({ success: false, error: "Failed to retrieve product" }, 500);
	}
});

// PUT /api/products/:id - Update a product by ID
app.put(
	"/:id",
	sValidator("json", productUpdateSchema, (result, c) => {
		if (!result.success) {
			return c.json({ success: false, error: "Validation Error" }, 400);
		}
	}),
	async (c) => {
		try {
			const id = parseInt(c.req.param("id"), 10);

			if (Number.isNaN(id)) {
				return c.json({ success: false, error: "Invalid product ID" }, 400);
			}

			const productData = await c.req.valid("json");

			// Check if product exists
			const existingProduct = await prisma.product.findUnique({
				where: { id: id },
			});

			if (!existingProduct) {
				return c.json({ success: false, error: "Product not found" }, 404);
			}

			// Check if category exists if categoryId is provided
			if (productData.categoryId !== undefined) {
				const category = await prisma.category.findUnique({
					where: { id: productData.categoryId },
				});

				if (!category) {
					return c.json({ success: false, error: "Category not found" }, 404);
				}
			}

			const { id: _, category: __, ...toUpdate } = productData;
			// Update the product
			const product = await prisma.product.update({
				where: { id: id },
				data: toUpdate,
			});

			return c.json({
				success: true,
				data: {
					products: [product],
				},
				message: "Product updated successfully",
			});
		} catch (error) {
			console.error("Error updating product:", error);
			return c.json({ success: false, error: "Failed to update product" }, 500);
		}
	},
);

// DELETE /api/products/:id - Delete a product by ID
app.delete("/:id", async (c) => {
	try {
		const id = parseInt(c.req.param("id"), 10);

		if (Number.isNaN(id)) {
			return c.json({ success: false, error: "Invalid product ID" }, 400);
		}

		// Check if product exists
		const existingProduct = await prisma.product.findUnique({
			where: { id: id },
		});

		if (!existingProduct) {
			return c.json({ success: false, error: "Product not found" }, 404);
		}

		// Delete the product
		await prisma.product.delete({
			where: { id: id },
		});

		return c.json({
			success: true,
			data: {
				products: [existingProduct],
			},
			message: "Product deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting product:", error);
		return c.json({ success: false, error: "Failed to delete product" }, 500);
	}
});

export default app;

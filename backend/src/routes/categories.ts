import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { type } from "arktype";
import { sValidator } from "@hono/standard-validator";

const app = new Hono();

// Category creation schema validation using ArkType
const categorySchema = type({
	name: "1 <= string <= 255",
	description: "1 <= string <= 255",
});

// Category update schema validation using ArkType
const categoryUpdateSchema = type({
	"name?": "1 <= string <= 255",
	"description?": "1 <= string <= 255",
});

// POST /api/categories - Create a new category
app.post(
	"/",
	sValidator("json", categorySchema, (result, c) => {
		if (!result.success) {
			return c.json({ success: false, error: "Validation Error" }, 400);
		}
	}),
	async (c) => {
		try {
			const categoryData = await c.req.valid("json");

			// Check if category with the same name already exists
			const existingCategory = await prisma.category.findUnique({
				where: { name: categoryData.name },
			});

			if (existingCategory) {
				return c.json(
					{ success: false, error: "Category with this name already exists" },
					409,
				);
			}

			// Create the category
			const category = await prisma.category.create({
				data: {
					name: categoryData.name,
					description: categoryData.description,
				},
			});

			return c.json(
				{
					success: true,
					data: {
						categories: [category],
					},
					message: "Category created successfully",
				},
				201,
			);
		} catch (error) {
			console.error("Error creating category:", error);
			return c.json(
				{ success: false, error: "Failed to create category" },
				500,
			);
		}
	},
);

// GET /api/categories - Get all categories
app.get("/", async (c) => {
	try {
		const categories = await prisma.category.findMany();

		return c.json({
			success: true,
			data: {
				categories: categories,
			},
			message: "Categories retrieved successfully",
		});
	} catch (error) {
		console.error("Error retrieving categories:", error);
		return c.json(
			{ success: false, error: "Failed to retrieve categories" },
			500,
		);
	}
});

// GET /api/categories/:id - Get a single category by ID
app.get("/:id", async (c) => {
	try {
		const id = parseInt(c.req.param("id"), 10);

		if (Number.isNaN(id)) {
			return c.json({ success: false, error: "Invalid category ID" }, 400);
		}

		const category = await prisma.category.findUnique({
			where: { id: id },
		});

		if (!category) {
			return c.json({ success: false, error: "Category not found" }, 404);
		}

		return c.json({
			success: true,
			data: {
				categories: [category],
			},
			message: "Category retrieved successfully",
		});
	} catch (error) {
		console.error("Error retrieving category:", error);
		return c.json(
			{ success: false, error: "Failed to retrieve category" },
			500,
		);
	}
});

// PUT /api/categories/:id - Update a category by ID
app.put(
	"/:id",
	sValidator("json", categoryUpdateSchema, (result, c) => {
		if (!result.success) {
			return c.json({ success: false, error: "Validation Error" }, 400);
		}
	}),
	async (c) => {
		try {
			const id = parseInt(c.req.param("id"), 10);

			if (Number.isNaN(id)) {
				return c.json({ success: false, error: "Invalid category ID" }, 400);
			}

			const categoryData = await c.req.valid("json");

			// Check if category exists
			const existingCategory = await prisma.category.findUnique({
				where: { id: id },
			});

			if (!existingCategory) {
				return c.json({ success: false, error: "Category not found" }, 404);
			}

			// Check if name is being updated and if it already exists
			if (categoryData.name !== undefined) {
				const duplicateCategory = await prisma.category.findFirst({
					where: {
						name: categoryData.name,
						id: { not: id },
					},
				});

				if (duplicateCategory) {
					return c.json(
						{ success: false, error: "Category with this name already exists" },
						409,
					);
				}
			}

			// Update the category
			const category = await prisma.category.update({
				where: { id: id },
				data: categoryData,
			});

			return c.json({
				success: true,
				data: {
					categories: [category],
				},
				message: "Category updated successfully",
			});
		} catch (error) {
			console.error("Error updating category:", error);
			return c.json(
				{ success: false, error: "Failed to update category" },
				500,
			);
		}
	},
);

// DELETE /api/categories/:id - Delete a category by ID
app.delete("/:id", async (c) => {
	try {
		const id = parseInt(c.req.param("id"), 10);

		if (Number.isNaN(id)) {
			return c.json({ success: false, error: "Invalid category ID" }, 400);
		}

		// Check if category exists
		const existingCategory = await prisma.category.findUnique({
			where: { id: id },
		});

		if (!existingCategory) {
			return c.json({ success: false, error: "Category not found" }, 404);
		}

		// Check if category has associated products
		const productCount = await prisma.product.count({
			where: { categoryId: id },
		});

		if (productCount > 0) {
			return c.json(
				{
					success: false,
					error: "Cannot delete category with associated products",
				},
				400,
			);
		}

		// Delete the category
		await prisma.category.delete({
			where: { id: id },
		});

		return c.json({
			success: true,
			data: {
				categories: [existingCategory],
			},
			message: "Category deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting category:", error);
		return c.json({ success: false, error: "Failed to delete category" }, 500);
	}
});

export default app;

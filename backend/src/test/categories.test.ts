import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { prisma } from "../lib/prisma.js";
import { mockCategory, seedMockData } from "./mock.js";
import app from "../app.js";

const testApp = app;

describe("Category Routes", () => {
	beforeEach(async () => {
		await seedMockData();
	});

	afterEach(async () => {
		// Clean up after each test
		await prisma.product.deleteMany({});
		await prisma.category.deleteMany({});
	});

	describe("POST /api/categories", () => {
		it("should create a category successfully", async () => {
			const categoryData = {
				name: "POST Category",
				description: "A test category for testing",
			};

			const response = await testApp.request("/api/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(categoryData),
			});

			expect(response.status).toBe(201);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.categories).toHaveLength(1);
			expect(result.data.categories[0].name).toBe(categoryData.name);
			expect(result.data.categories[0].description).toBe(
				categoryData.description,
			);
			expect(result.message).toBe("Category created successfully");
		});

		it("should return validation error for invalid data", async () => {
			const { id, ...invalidCategoryData } = {
				...mockCategory,
			};
			invalidCategoryData.name = "";

			const response = await testApp.request("/api/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidCategoryData),
			});

			expect(response.status).toBe(400);
			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Validation Error");
		});

		it("should return 409 for duplicate category name", async () => {
			const categoryData = {
				name: mockCategory.name,
				description: "A different description",
			};

			const response = await testApp.request("/api/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(categoryData),
			});

			expect(response.status).toBe(409);
			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Category with this name already exists");
		});
	});

	describe("GET /api/categories", () => {
		it("should retrieve all categories successfully", async () => {
			const response = await testApp.request("/api/categories", {
				method: "GET",
			});

			expect(response.status).toBe(200);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.categories).toHaveLength(1);
			expect(result.data.categories[0].name).toBe(mockCategory.name);
			expect(result.data.categories[0].description).toBe(
				mockCategory.description,
			);
			expect(result.message).toBe("Categories retrieved successfully");
		});
	});

	describe("GET /api/categories/:id", () => {
		it("should retrieve a single category by ID successfully", async () => {
			const response = await testApp.request(
				`/api/categories/${mockCategory.id}`,
				{
					method: "GET",
				},
			);

			expect(response.status).toBe(200);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.categories).toHaveLength(1);
			expect(result.data.categories[0].name).toBe(mockCategory.name);
			expect(result.data.categories[0].description).toBe(
				mockCategory.description,
			);
			expect(result.message).toBe("Category retrieved successfully");
		});

		it("should return 404 for non-existent category", async () => {
			const response = await testApp.request("/api/categories/99999", {
				method: "GET",
			});

			expect(response.status).toBe(404);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Category not found");
		});

		it("should return 400 for invalid category ID", async () => {
			const response = await testApp.request("/api/categories/invalid", {
				method: "GET",
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Invalid category ID");
		});
	});

	describe("PUT /api/categories/:id", () => {
		it("should update a category successfully", async () => {
			const updateData = {
				name: "Updated Category Name",
				description: "Updated category description",
			};

			const response = await testApp.request(
				`/api/categories/${mockCategory.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateData),
				},
			);

			expect(response.status).toBe(200);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.categories).toHaveLength(1);
			expect(result.data.categories[0].name).toBe(updateData.name);
			expect(result.data.categories[0].description).toBe(
				updateData.description,
			);
			expect(result.message).toBe("Category updated successfully");
		});

		it("should return 404 for non-existent category", async () => {
			const updateData = {
				name: "Updated Category Name",
			};

			const response = await testApp.request("/api/categories/99999", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});

			expect(response.status).toBe(404);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Category not found");
		});

		it("should return 400 for invalid category ID", async () => {
			const updateData = {
				name: "Updated Category Name",
			};

			const response = await testApp.request("/api/categories/invalid", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Invalid category ID");
		});

		it("should return validation error for invalid update data", async () => {
			const invalidUpdateData = {
				name: "", // Empty name should fail validation
			};

			const response = await testApp.request(
				`/api/categories/${mockCategory.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(invalidUpdateData),
				},
			);

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Validation Error");
		});
	});

	describe("DELETE /api/categories/:id", () => {
		it("should delete a category successfully", async () => {
			// First create a second category for testing deletion
			const secondCategory = await prisma.category.create({
				data: {
					name: "Second Test Category",
					description: "Another test category",
				},
			});

			const response = await testApp.request(
				`/api/categories/${secondCategory.id}`,
				{
					method: "DELETE",
				},
			);

			expect(response.status).toBe(200);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.categories).toHaveLength(1);
			expect(result.message).toBe("Category deleted successfully");

			// Verify the category was actually deleted
			const deletedCategory = await prisma.category.findUnique({
				where: { id: secondCategory.id },
			});
			expect(deletedCategory).toBeNull();
		});

		it("should return 404 for non-existent category", async () => {
			const response = await testApp.request("/api/categories/99999", {
				method: "DELETE",
			});

			expect(response.status).toBe(404);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Category not found");
		});

		it("should return 400 for invalid category ID", async () => {
			const response = await testApp.request("/api/categories/invalid", {
				method: "DELETE",
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Invalid category ID");
		});

		it("should return 400 when trying to delete category with associated products", async () => {
			const response = await testApp.request(
				`/api/categories/${mockCategory.id}`,
				{
					method: "DELETE",
				},
			);

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe(
				"Cannot delete category with associated products",
			);
		});
	});
});

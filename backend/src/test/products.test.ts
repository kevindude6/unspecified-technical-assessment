import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import productsRoutes from "../routes/products.js";
import { mockCategory, mockProduct, seedMockData } from "./mock.js";
import app from "../app.js";

const testApp = app;

describe("Product Routes", () => {
	beforeEach(async () => {
		await seedMockData();
	});

	afterEach(async () => {
		// Clean up after each test
		await prisma.product.deleteMany({});
		await prisma.category.deleteMany({});
	});

	describe("POST /api/product", () => {
		it("should create a product successfully", async () => {
			const productData = {
				title: "Test Product",
				description: "A test product for testing",
				categoryId: mockCategory.id,
				price: 29.99,
				stock: 100,
				brand: "Test Brand",
				sku: "TEST-001",
				weight: 1.5,
			};

			const response = await testApp.request("/api/product", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(productData),
			});

			expect(response.status).toBe(201);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.products).toHaveLength(1);
			expect(result.data.products[0].title).toBe(productData.title);
			expect(result.data.products[0].description).toBe(productData.description);
			expect(result.data.products[0].categoryId).toBe(productData.categoryId);
			expect(result.data.products[0].price).toBe(productData.price);
			expect(result.data.products[0].stock).toBe(productData.stock);
			expect(result.data.products[0].brand).toBe(productData.brand);
			expect(result.data.products[0].sku).toBe(productData.sku);
			expect(result.data.products[0].weight).toBe(productData.weight);
			expect(result.message).toBe("Product created successfully");
		});

		it("should return validation error for invalid data", async () => {
			const { id, ...invalidProductData } = {
				...mockProduct,
			};
			invalidProductData.title = "";

			const response = await testApp.request("/api/product", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidProductData),
			});

			expect(response.status).toBe(400);
			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Validation Error");
		});
	});

	describe("GET /api/product", () => {
		it("should retrieve all products successfully", async () => {
			const response = await testApp.request("/api/product", {
				method: "GET",
			});

			expect(response.status).toBe(200);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.products).toHaveLength(1);
			expect(result.data.products[0].title).toBe(mockProduct.title);
			expect(result.data.products[0].description).toBe(mockProduct.description);
			expect(result.data.products[0].categoryId).toBe(mockProduct.categoryId);
			expect(result.data.products[0].price).toBe(mockProduct.price);
			expect(result.data.products[0].stock).toBe(mockProduct.stock);
			expect(result.data.products[0].brand).toBe(mockProduct.brand);
			expect(result.data.products[0].sku).toBe(mockProduct.sku);
			expect(result.data.products[0].weight).toBe(mockProduct.weight);
			expect(result.message).toBe("Products retrieved successfully");
		});
	});

	describe("GET /api/product/:id", () => {
		it("should retrieve a single product by ID successfully", async () => {
			const response = await testApp.request(`/api/product/${mockProduct.id}`, {
				method: "GET",
			});

			expect(response.status).toBe(200);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.products).toHaveLength(1);
			expect(result.data.products[0].title).toBe(mockProduct.title);
			expect(result.data.products[0].description).toBe(mockProduct.description);
			expect(result.data.products[0].categoryId).toBe(mockProduct.categoryId);
			expect(result.data.products[0].price).toBe(mockProduct.price);
			expect(result.data.products[0].stock).toBe(mockProduct.stock);
			expect(result.data.products[0].brand).toBe(mockProduct.brand);
			expect(result.data.products[0].sku).toBe(mockProduct.sku);
			expect(result.data.products[0].weight).toBe(mockProduct.weight);
			expect(result.message).toBe("Product retrieved successfully");
		});

		it("should return 404 for non-existent product", async () => {
			const response = await testApp.request("/api/product/99999", {
				method: "GET",
			});

			expect(response.status).toBe(404);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Product not found");
		});

		it("should return 400 for invalid product ID", async () => {
			const response = await testApp.request("/api/product/invalid", {
				method: "GET",
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Invalid product ID");
		});
	});

	describe("PUT /api/product/:id", () => {
		it("should update a product successfully", async () => {
			const updateData = {
				title: "Updated Product Title",
				description: "Updated product description",
				price: 39.99,
				stock: 150,
			};

			const response = await testApp.request(`/api/product/${mockProduct.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});

			expect(response.status).toBe(200);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.products).toHaveLength(1);
			expect(result.data.products[0].title).toBe(updateData.title);
			expect(result.data.products[0].description).toBe(updateData.description);
			expect(result.data.products[0].price).toBe(updateData.price);
			expect(result.data.products[0].stock).toBe(updateData.stock);
			expect(result.data.products[0].brand).toBe(mockProduct.brand);
			expect(result.data.products[0].sku).toBe(mockProduct.sku);
			expect(result.data.products[0].weight).toBe(mockProduct.weight);
			expect(result.message).toBe("Product updated successfully");
		});

		it("should return 404 for non-existent product", async () => {
			const updateData = {
				title: "Updated Product Title",
			};

			const response = await testApp.request("/api/product/99999", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});

			expect(response.status).toBe(404);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Product not found");
		});

		it("should return 400 for invalid product ID", async () => {
			const updateData = {
				title: "Updated Product Title",
			};

			const response = await testApp.request("/api/product/invalid", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Invalid product ID");
		});

		it("should return validation error for invalid update data", async () => {
			const invalidUpdateData = {
				title: "", // Empty title should fail validation
			};

			const response = await testApp.request(`/api/product/${mockProduct.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidUpdateData),
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Validation Error");
		});

		it("should return 404 for non-existent category when updating categoryId", async () => {
			const updateData = {
				categoryId: 99999, // Non-existent category
			};

			const response = await testApp.request(`/api/product/${mockProduct.id}`, {
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
	});

	describe("DELETE /api/product/:id", () => {
		it("should delete a product successfully", async () => {
			const response = await testApp.request(`/api/product/${mockProduct.id}`, {
				method: "DELETE",
			});

			expect(response.status).toBe(200);

			const result = await response.json();
			expect(result.success).toBe(true);
			expect(result.data.products).toHaveLength(1);
			expect(result.message).toBe("Product deleted successfully");

			// Verify the product was actually deleted
			const deletedProduct = await prisma.product.findUnique({
				where: { id: mockProduct.id },
			});
			expect(deletedProduct).toBeNull();
		});

		it("should return 404 for non-existent product", async () => {
			const response = await testApp.request("/api/product/99999", {
				method: "DELETE",
			});

			expect(response.status).toBe(404);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Product not found");
		});

		it("should return 400 for invalid product ID", async () => {
			const response = await testApp.request("/api/product/invalid", {
				method: "DELETE",
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result.success).toBe(false);
			expect(result.error).toBe("Invalid product ID");
		});
	});
});

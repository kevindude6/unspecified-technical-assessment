import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Hono } from "hono";
import { Prisma, prisma } from "../lib/prisma.js";
import productsRoutes from "../routes/products.js";
import { mockCategory, mockProduct, seedMockData } from "./mock.js";

// Test database setup
const testApp = new Hono();

// Mount the product routes
testApp.route("/api/product", productsRoutes);

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
});

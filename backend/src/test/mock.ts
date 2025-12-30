import { prisma } from "../lib/prisma.js";

export const mockCategory = {
	name: "Test Category",
	description: "Test category for product tests",
	id: 9999,
};

export const mockProduct = {
	title: "Test Product",
	description: "A test product for testing",
	categoryId: mockCategory.id,
	price: 29.99,
	stock: 100,
	brand: "Test Brand",
	sku: "TEST-001",
	weight: 1.5,
	id: 9999,
};

export const seedMockData = async () => {
	await prisma.category.upsert({
		where: {
			id: mockCategory.id,
		},
		create: {
			...mockCategory,
		},
		update: {
			...mockCategory,
		},
	});

	await prisma.product.upsert({
		where: {
			id: mockProduct.id,
		},
		create: {
			...mockProduct,
		},
		update: {
			...mockProduct,
		},
	});
};

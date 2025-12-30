import "dotenv/config";
import { faker } from "@faker-js/faker";
import { prisma } from "./lib/prisma.js";

async function seed() {
	// Check if NODE_ENV is set to 'dev'
	if (process.env.NODE_ENV !== "dev") {
		console.error("Seed script can only run in development environment");
		console.error(`Current NODE_ENV: ${process.env.NODE_ENV}`);
		console.error("Please set NODE_ENV=dev to run this script");
		process.exit(1);
	}

	console.log("Starting database seed...");
	faker.seed(12345);
	try {
		// Clear existing data
		console.log("Clearing existing data...");
		await prisma.product.deleteMany();
		await prisma.category.deleteMany();

		// Generate 20 categories
		console.log("Creating 20 categories...");
		const categories = [];

		for (let i = 0; i < 20; i++) {
			const categoryName = faker.commerce.department();

			categories.push({
				name: `${categoryName}-${i}`,
				description: faker.lorem.sentences(2),
			});
		}

		// Create categories in database
		const createdCategories = await prisma.category.createMany({
			data: categories,
		});

		console.log(`Created ${createdCategories.count} categories`);

		// Generate 500 products
		console.log("Creating 500 products...");
		const products = [];

		// Fetch all categories to get their IDs
		const allCategories = await prisma.category.findMany();
		const categoryIds = allCategories.map((cat) => cat.id);

		for (let i = 0; i < 500; i++) {
			const productTitle = `${faker.commerce.productName()}`;

			// Generate unique SKU
			const sku = `SKU-${faker.string.alphanumeric(8).toUpperCase()}-${i + 1}`;

			products.push({
				title: productTitle,
				description: faker.commerce.productDescription(),
				categoryId: categoryIds[Math.floor(Math.random() * categoryIds.length)],
				price: parseFloat(faker.commerce.price({ min: 5, max: 100, dec: 2 })),
				stock: faker.number.int({ min: 0, max: 100 }),
				brand: faker.company.name(),
				sku: sku,
				weight: parseFloat(faker.commerce.price({ min: 0.1, max: 5, dec: 2 })),
			});
		}

		// Create products in database
		const createdProducts = await prisma.product.createMany({
			data: products,
		});

		console.log(`Created ${createdProducts.count} products`);

		console.log("Database seeding completed successfully!");
		console.log(
			`Total: ${createdCategories.count} categories, ${createdProducts.count} products`,
		);
	} catch (error) {
		console.error("Error during seeding:", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

// Run the seed function
seed();

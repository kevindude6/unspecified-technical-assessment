import { beforeAll, afterAll, } from "vitest";
import { prisma } from "./lib/prisma.js";

// Global test setup
beforeAll(async () => {
	// Ensure database is ready
	await prisma.$connect();
});

afterAll(async () => {
	// Clean up and disconnect
	await prisma.$disconnect();
});

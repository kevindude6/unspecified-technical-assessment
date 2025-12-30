import type { Product } from "./models/product";
import type { Category } from "./models/category";

export const sampleCategories: Category[] = [
	{
		id: 1,
		name: "Vinyl",
		description: "Vinyl records",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 2,
		name: "CDs",
		description: "Compact discs",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 3,
		name: "Tapes",
		description: "Audio cassettes",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export const sampleProducts: Product[] = [
	{
		id: 1,
		title: "The Dark Side of the Moon",
		description: "Pink Floyd's iconic 1973 progressive rock album",
		price: 29.99,
		stock: 10,
		brand: "Pink Floyd",
		sku: "PF-DSOTM-001",
		weight: 0.5,
		categoryId: 1,
		category: sampleCategories[0],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 2,
		title: "Thriller",
		description: "Michael Jackson's best-selling album of all time",
		price: 19.99,
		stock: 15,
		brand: "Michael Jackson",
		sku: "MJ-THRILL-002",
		weight: 0.3,
		categoryId: 2,
		category: sampleCategories[1],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 3,
		title: "Abbey Road",
		description: "The Beatles' classic 1969 album",
		price: 24.99,
		stock: 8,
		brand: "The Beatles",
		sku: "TB-ABBEY-003",
		weight: 0.5,
		categoryId: 1,
		category: sampleCategories[0],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

import type { Category } from "./category";

export interface ProductBase {
	title: string;
	description: string;
	categoryId: number;
	price: number;
	stock: number;
	brand: string;
	sku: string;
	weight: number;
}
export interface Product extends ProductBase {
	id: number;
	category: Category;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateProductRequest extends ProductBase {}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

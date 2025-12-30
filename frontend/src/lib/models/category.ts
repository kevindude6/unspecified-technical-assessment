import type { Product } from "./product";

export interface CategoryBase {
	name: string;
	description: string;
}
// Category model
export interface Category extends CategoryBase {
	id: number;
	products?: Product[];
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateCategoryRequest extends CategoryBase {}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}

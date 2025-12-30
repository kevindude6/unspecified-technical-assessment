import { SafeRequest } from "./helper";
import type {
	Category,
	CreateCategoryRequest,
	UpdateCategoryRequest,
} from "../lib/models/category";

/**
 * Category API functions that wrap the backend CRUD routes
 */

// Type for category list response
export interface CategoryListResponse {
	categories: Category[];
}

// Type for query parameters
export interface CategoryQueryParams {
	search?: string;
}

/**
 * Create a new category
 */
export async function createCategory(
	categoryData: CreateCategoryRequest,
): Promise<Category> {
	return SafeRequest<Category>("/api/category", {
		method: "POST",
		body: JSON.stringify(categoryData),
	});
}

/**
 * Get all categories with optional filtering
 */
export async function getCategories(
	params?: CategoryQueryParams,
): Promise<CategoryListResponse> {
	// Build query string
	const searchParams = new URLSearchParams();
	if (params?.search) searchParams.append("search", params.search);

	const queryString = searchParams.toString();
	const endpoint = queryString
		? `/api/category?${queryString}`
		: "/api/category";

	return SafeRequest<CategoryListResponse>(endpoint);
}

/**
 * Get a single category by ID
 */
export async function getCategoryById(id: number): Promise<Category> {
	return SafeRequest<Category>(`/api/category/${id}`);
}

/**
 * Update a category by ID
 */
export async function updateCategory(
	id: number,
	categoryData: UpdateCategoryRequest,
): Promise<Category> {
	return SafeRequest<Category>(`/api/category/${id}`, {
		method: "PUT",
		body: JSON.stringify(categoryData),
	});
}

/**
 * Delete a category by ID
 */
export async function deleteCategory(id: number): Promise<Category> {
	return SafeRequest<Category>(`/api/category/${id}`, {
		method: "DELETE",
	});
}

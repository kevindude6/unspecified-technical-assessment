import { SafeRequest } from "./helper";
import type {
	Product,
	CreateProductRequest,
	UpdateProductRequest,
} from "../lib/models/product";

/**
 * Product API functions that wrap the backend CRUD routes
 */

// Type for pagination response
export interface ProductPagination {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

// Type for product list response
export interface ProductListResponse {
	products: Product[];
	pagination: ProductPagination;
}

// Type for query parameters
export interface ProductQueryParams {
	search?: string;
	categoryId?: number;
	page?: number;
	sortBy?:
		| "id"
		| "title"
		| "price"
		| "stock"
		| "brand"
		| "createdAt"
		| "updatedAt"
		| "categoryName";
	sortOrder?: "asc" | "desc";
}

/**
 * Create a new product
 */
export async function createProduct(
	productData: CreateProductRequest,
): Promise<Product> {
	return SafeRequest<Product>("/api/product", {
		method: "POST",
		body: JSON.stringify(productData),
	});
}

/**
 * Get all products with optional filtering, sorting, and pagination
 */
export async function getProducts(
	params?: ProductQueryParams,
): Promise<ProductListResponse> {
	// Build query string
	const searchParams = new URLSearchParams();
	if (params?.search) searchParams.append("search", params.search);
	if (params?.categoryId)
		searchParams.append("categoryId", params.categoryId.toString());
	if (params?.page) searchParams.append("page", params.page.toString());
	if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
	if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

	const queryString = searchParams.toString();
	const endpoint = queryString ? `/api/product?${queryString}` : "/api/product";

	return SafeRequest<ProductListResponse>(endpoint);
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: number): Promise<Product> {
	return SafeRequest<Product>(`/api/product/${id}`);
}

/**
 * Update a product by ID
 */
export async function updateProduct(
	id: number,
	productData: UpdateProductRequest,
): Promise<Product> {
	return SafeRequest<Product>(`/api/product/${id}`, {
		method: "PUT",
		body: JSON.stringify(productData),
	});
}

/**
 * Delete a product by ID
 */
export async function deleteProduct(id: number): Promise<Product> {
	return SafeRequest<Product>(`/api/product/${id}`, {
		method: "DELETE",
	});
}

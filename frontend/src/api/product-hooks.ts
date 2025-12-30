import {
	useMutation,
	useQuery,
	useQueryClient,
	keepPreviousData,
} from "@tanstack/react-query";
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from "./products";
import type {
	CreateProductRequest,
	Product,
	UpdateProductRequest,
} from "../lib/models/product";
import type { ProductListResponse, ProductQueryParams } from "./products";

/**
 * TanStack Query hooks for product operations
 */

// Query keys for cache management
export const productKeys = {
	all: ["products"] as const,
	lists: () => [...productKeys.all, "list"] as const,
	list: (params?: ProductQueryParams) =>
		[...productKeys.lists(), params] as const,
	details: () => [...productKeys.all, "detail"] as const,
	detail: (id: number) => [...productKeys.details(), id] as const,
};

/**
 * Hook to fetch all products with optional filtering and pagination
 */
export function useProducts(params?: ProductQueryParams) {
	return useQuery<ProductListResponse, Error>({
		queryKey: productKeys.list(params),
		queryFn: () => getProducts(params),
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(id: number) {
	return useQuery<Product, Error>({
		queryKey: productKeys.detail(id),
		queryFn: () => getProductById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

/**
 * Hook to create a new product
 */
export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation<Product, Error, CreateProductRequest>({
		mutationFn: createProduct,
		onSuccess: (newProduct) => {
			// Invalidate and refetch product lists
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			// Add the new product to the cache
			queryClient.setQueryData(productKeys.detail(newProduct.id), newProduct);
		},
	});
}

/**
 * Hook to update an existing product
 */
export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation<
		Product,
		Error,
		{ id: number; data: UpdateProductRequest }
	>({
		mutationFn: ({ id, data }) => updateProduct(id, data),
		onSuccess: (updatedProduct, { id }) => {
			// Invalidate and refetch product lists
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			// Update the specific product in cache
			queryClient.setQueryData(productKeys.detail(id), updatedProduct);
			// Also update in lists if it exists
			queryClient.setQueriesData(
				{ queryKey: productKeys.lists() },
				(oldData: ProductListResponse | undefined) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						products: oldData.products.map((product) =>
							product.id === updatedProduct.id ? updatedProduct : product,
						),
					};
				},
			);
		},
	});
}

/**
 * Hook to delete a product
 */
export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation<Product, Error, number>({
		mutationFn: deleteProduct,
		onSuccess: (deletedProduct, id) => {
			// Invalidate and refetch product lists
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			// Remove the product from cache
			queryClient.removeQueries({ queryKey: productKeys.detail(id) });
			// Remove from lists if it exists
			queryClient.setQueriesData(
				{ queryKey: productKeys.lists() },
				(oldData: ProductListResponse | undefined) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						products: oldData.products.filter((product) => product.id !== id),
					};
				},
			);
		},
	});
}

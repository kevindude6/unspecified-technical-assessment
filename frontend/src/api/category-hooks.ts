import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createCategory,
	deleteCategory,
	getCategoryById,
	getCategories,
	updateCategory,
} from "./categories";
import type {
	CreateCategoryRequest,
	Category,
	UpdateCategoryRequest,
} from "../lib/models/category";
import type { CategoryListResponse, CategoryQueryParams } from "./categories";

/**
 * TanStack Query hooks for category operations
 */

// Query keys for cache management
export const categoryKeys = {
	all: ["categories"] as const,
	lists: () => [...categoryKeys.all, "list"] as const,
	list: (params?: CategoryQueryParams) =>
		[...categoryKeys.lists(), params] as const,
	details: () => [...categoryKeys.all, "detail"] as const,
	detail: (id: number) => [...categoryKeys.details(), id] as const,
};

/**
 * Hook to fetch all categories with optional filtering
 */
export function useCategories(params?: CategoryQueryParams) {
	return useQuery<CategoryListResponse, Error>({
		queryKey: categoryKeys.list(params),
		queryFn: () => getCategories(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

/**
 * Hook to fetch a single category by ID
 */
export function useCategory(id: number) {
	return useQuery<Category, Error>({
		queryKey: categoryKeys.detail(id),
		queryFn: () => getCategoryById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

/**
 * Hook to create a new category
 */
export function useCreateCategory() {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, CreateCategoryRequest>({
		mutationFn: createCategory,
		onSuccess: (newCategory) => {
			// Invalidate and refetch category lists
			queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
			// Add the new category to the cache
			queryClient.setQueryData(
				categoryKeys.detail(newCategory.id),
				newCategory,
			);
		},
	});
}

/**
 * Hook to update an existing category
 */
export function useUpdateCategory() {
	const queryClient = useQueryClient();

	return useMutation<
		Category,
		Error,
		{ id: number; data: UpdateCategoryRequest }
	>({
		mutationFn: ({ id, data }) => updateCategory(id, data),
		onSuccess: (updatedCategory, { id }) => {
			// Invalidate and refetch category lists
			queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
			// Update the specific category in cache
			queryClient.setQueryData(categoryKeys.detail(id), updatedCategory);
			// Also update in lists if it exists
			queryClient.setQueriesData(
				{ queryKey: categoryKeys.lists() },
				(oldData: CategoryListResponse | undefined) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						categories: oldData.categories.map((category) =>
							category.id === updatedCategory.id ? updatedCategory : category,
						),
					};
				},
			);
		},
	});
}

/**
 * Hook to delete a category
 */
export function useDeleteCategory() {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, number>({
		mutationFn: deleteCategory,
		onSuccess: (deletedCategory, id) => {
			// Invalidate and refetch category lists
			queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
			// Remove the category from cache
			queryClient.removeQueries({ queryKey: categoryKeys.detail(id) });
			// Remove from lists if it exists
			queryClient.setQueriesData(
				{ queryKey: categoryKeys.lists() },
				(oldData: CategoryListResponse | undefined) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						categories: oldData.categories.filter(
							(category) => category.id !== id,
						),
					};
				},
			);
		},
	});
}

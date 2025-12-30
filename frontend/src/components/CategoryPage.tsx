import { useState } from "react";
import { useCategories, useDeleteCategory } from "../api/category-hooks";
import { CategoryEditModal } from "./CategoryEditModal";
import { CategoryDeleteModal } from "./CategoryDeleteModal";
import { toast } from "sonner";
import type { Category } from "../lib/models/category";

export function CategoryPage() {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [deletingCategory, setDeletingCategory] = useState<Category | null>(
		null,
	);
	const [showDeleteWarning, setShowDeleteWarning] = useState(false);

	const { data, isLoading, error } = useCategories();
	const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

	const handleDelete = (category: Category) => {
		setDeletingCategory(category);
		setShowDeleteWarning(true);
	};

	const confirmDelete = () => {
		if (!deletingCategory) return;

		deleteCategory(deletingCategory.id, {
			onSuccess: () => {
				toast.success("Category deleted successfully");
				setDeletingCategory(null);
				setShowDeleteWarning(false);
			},
			onError: (error) => {
				toast.error(`Failed to delete category: ${error.message}`);
				setDeletingCategory(null);
				setShowDeleteWarning(false);
			},
		});
	};

	const cancelDelete = () => {
		setDeletingCategory(null);
		setShowDeleteWarning(false);
	};

	const CategoriesDisplay = () => {
		if (isLoading)
			return (
				<div className="text-center py-12">
					<p className="text-muted-foreground">Loading categories...</p>
				</div>
			);

		if (error || data === undefined)
			return (
				<div className="text-center py-12">
					<p className="text-red-500">
						Error loading categories: {error?.message}
					</p>
				</div>
			);

		if (data.categories.length === 0)
			return (
				<div className="text-center py-12">
					<p className="text-muted-foreground">No categories found.</p>
					<p className="text-sm text-muted-foreground mt-2">
						Create your first category to get started.
					</p>
				</div>
			);

		return (
			<div className="space-y-4">
				{data.categories.map((category) => (
					<div
						key={category.id}
						className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
					>
						<div className="space-y-1">
							<h3 className="font-medium">{category.name}</h3>
							<p className="text-sm text-muted-foreground">
								{category.description}
							</p>
						</div>
						<div className="flex space-x-2">
							<button
								type="button"
								onClick={() => setEditingCategory(category)}
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
							>
								Edit
							</button>
							<button
								type="button"
								onClick={() => handleDelete(category)}
								disabled={isDeleting && deletingCategory?.id === category.id}
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
							>
								{isDeleting && deletingCategory?.id === category.id
									? "Deleting..."
									: "Delete"}
							</button>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold mb-2">Categories</h1>
						<p className="text-muted-foreground">
							Manage your product categories
						</p>
					</div>
					<button
						type="button"
						onClick={() => setIsAddModalOpen(true)}
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
					>
						Add Category
					</button>
				</div>
			</div>

			{CategoriesDisplay()}

			{/* Add Category Modal */}
			{isAddModalOpen && (
				<CategoryEditModal onClose={() => setIsAddModalOpen(false)} />
			)}

			{/* Edit Category Modal */}
			{editingCategory && (
				<CategoryEditModal
					category={editingCategory}
					onClose={() => setEditingCategory(null)}
				/>
			)}

			{/* Delete Confirmation Modal */}
			<CategoryDeleteModal
				category={deletingCategory}
				isOpen={showDeleteWarning}
				isDeleting={isDeleting}
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>
		</div>
	);
}

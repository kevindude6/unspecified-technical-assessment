import { useState } from "react";
import { useCategories, useDeleteCategory } from "../api/category-hooks";
import { CategoryEditModal } from "./CategoryEditModal";
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
			{showDeleteWarning && deletingCategory && (
				<>
					{/* Backdrop */}
					<button
						type="button"
						className={`fixed inset-0 min-h-screen bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
							showDeleteWarning
								? "opacity-100"
								: "opacity-0 pointer-events-none"
						}`}
						onClick={cancelDelete}
						onKeyUp={(e) => e.key === "Escape" && cancelDelete()}
						aria-label="Close modal"
					/>

					{/* Modal */}
					<div
						className={`fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card shadow-lg transition-all duration-200 ${
							showDeleteWarning ? "scale-100 opacity-100" : "scale-95 opacity-0"
						}`}
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between border-b px-6 py-4">
							<h2 className="text-lg font-semibold text-red-600">
								Confirm Deletion
							</h2>
							<button
								type="button"
								onClick={cancelDelete}
								className="text-muted-foreground hover:text-foreground"
								aria-label="Close modal"
							>
								×
							</button>
						</div>

						{/* Modal Content */}
						<div className="space-y-4 p-6">
							<div className="flex items-start space-x-3">
								<div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
									<svg
										className="w-4 h-4 text-red-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
										/>
									</svg>
								</div>
								<div>
									<h3 className="font-medium">
										Delete "{deletingCategory.name}"?
									</h3>
									<p className="text-sm text-muted-foreground mt-1">
										This action cannot be undone. All products associated with
										this category will also be deleted.
									</p>
								</div>
							</div>

							<div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
								<p className="text-sm text-yellow-800">
									<strong>Warning:</strong> Deleting this category will
									permanently remove all products that belong to it.
								</p>
							</div>

							{/* Modal Footer */}
							<div className="flex justify-end space-x-2 border-t pt-4">
								<button
									type="button"
									onClick={cancelDelete}
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={confirmDelete}
									disabled={isDeleting}
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-9 px-3"
								>
									{isDeleting ? "Deleting..." : "Delete Category"}
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

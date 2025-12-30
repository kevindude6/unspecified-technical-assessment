
import { useForm } from "react-hook-form";
import { type } from "arktype";
import { arktypeResolver } from "@hookform/resolvers/arktype";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateCategory } from "@/api/category-hooks";
import { useCreateCategory } from "@/api/category-hooks";
import { toast } from "sonner";
import type { Category } from "@/lib/models/category";

interface CategoryEditModalProps {
	category?: Category;
	onClose: () => void;
	isOpen?: boolean;
}

// ArkType validation schemas based on backend/src/routes/categories.ts
const categoryCreateSchema = type({
	name: "1 <= string <= 255",
	description: "1 <= string <= 255",
});

const categoryUpdateSchema = type({
	"name?": "1 <= string <= 255",
	"description?": "1 <= string <= 255",
});

export function CategoryEditModal({
	category,
	onClose,
	isOpen = true,
}: CategoryEditModalProps) {
	const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
	const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
	const isEditing = !!category;
	const isPending = isUpdating || isCreating;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: arktypeResolver(
			isEditing ? categoryUpdateSchema : categoryCreateSchema,
		),
		defaultValues: category || {
			name: "",
			description: "",
		},
	});

	const onSubmit = (data: any) => {
		if (isEditing && category) {
			updateCategory(
				{
					id: category.id,
					data: data,
				},
				{
					onSuccess: () => {
						toast.success("Category updated successfully");
						onClose();
					},
					onError: (error) => {
						toast.error(`Failed to update category: ${error.message}`);
					},
				},
			);
		} else {
			createCategory(data, {
				onSuccess: () => {
					toast.success("Category created successfully");
					onClose();
				},
				onError: (error) => {
					toast.error(`Failed to create category: ${error.message}`);
				},
			});
		}
	};

	const handleClose = () => {
		// Allow modal to animate out before calling onClose
		setTimeout(onClose, 200);
	};

	if (!isOpen) return null;
	return (
		<>
			{/* Backdrop */}
			<button
				type="button"
				className="fixed inset-0 min-h-screen bg-black/50 backdrop-blur-sm transition-opacity duration-200 opacity-100"
				onClick={handleClose}
				onKeyUp={(e) => e.key === "Escape" && handleClose()}
				aria-label="Close modal"
			/>

			{/* Modal */}
			<div className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card shadow-lg transition-all duration-200 scale-100 opacity-100">
				{/* Modal Header */}
				<div className="flex items-center justify-between border-b px-6 py-4">
					<h2 className="text-lg font-semibold">
						{isEditing ? "Edit Category" : "Add Category"}
					</h2>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClose}
						className="text-muted-foreground hover:text-foreground"
					>
						×
					</Button>
				</div>

				{/* Modal Content */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
					<div className="space-y-2">
						<label htmlFor="name" className="text-sm font-medium">
							Name
						</label>
						<Input
							id="name"
							{...register("name")}
							placeholder="Category name"
						/>
						{errors.name && (
							<p className="text-sm text-red-600">{errors.name.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<label htmlFor="description" className="text-sm font-medium">
							Description
						</label>
						<textarea
							id="description"
							{...register("description")}
							placeholder="Category description"
							className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							rows={3}
						/>
						{errors.description && (
							<p className="text-sm text-red-600">
								{errors.description.message}
							</p>
						)}
					</div>

					{/* Modal Footer */}
					<div className="flex justify-end space-x-2 border-t pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={handleClose}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending
								? isEditing
									? "Updating..."
									: "Creating..."
								: isEditing
									? "Update Category"
									: "Create Category"}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { type } from "arktype";
import { arktypeResolver } from "@hookform/resolvers/arktype";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategorySelect } from "@/components/CategorySelect";
import { useUpdateProduct } from "@/api/product-hooks";
import { useCreateProduct } from "@/api/product-hooks";
import { toast } from "sonner";
import type { Product } from "@/lib/models/product";

interface ProductEditModalProps {
	product?: Product;
	onClose: () => void;
}

// ArkType validation schemas based on backend/src/routes/products.ts
const productCreateSchema = type({
	title: "1 <= string <= 255",
	description: "1 <= string <= 255",
	categoryId: "number.integer",
	price: "number >= 0",
	stock: "number.integer",
	brand: "1 <= string <= 255",
	sku: "1 <= string <= 255",
	weight: "number > 0",
});

const productUpdateSchema = type({
	"title?": "1 <= string <= 255",
	"description?": "1 <= string <= 255",
	"categoryId?": "number.integer",
	"price?": "number >= 0",
	"stock?": "number.integer",
	"brand?": "1 <= string <= 255",
	"sku?": "1 <= string <= 255",
	"weight?": "number > 0",
});

export function ProductEditModal({ product, onClose }: ProductEditModalProps) {
	const [isOpen, setIsOpen] = useState(true);
	const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
	const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
	const isEditing = !!product;
	const isPending = isUpdating || isCreating;

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: arktypeResolver(
			isEditing ? productUpdateSchema : productCreateSchema,
		),
		defaultValues: product || {
			title: "",
			description: "",
			categoryId: 0,
			price: 0,
			stock: 0,
			brand: "",
			sku: "",
			weight: 0,
		},
	});

	const onSubmit = (data: any) => {
		if (isEditing && product) {
			updateProduct(
				{
					id: product.id,
					data: data,
				},
				{
					onSuccess: () => {
						toast.success("Product updated successfully");
						onClose();
					},
					onError: (error) => {
						toast.error(`Failed to update product: ${error.message}`);
					},
				},
			);
		} else {
			createProduct(data, {
				onSuccess: () => {
					toast.success("Product created successfully");
					onClose();
				},
				onError: (error) => {
					toast.error(`Failed to create product: ${error.message}`);
				},
			});
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		// Allow modal to animate out before calling onClose
		setTimeout(onClose, 200);
	};

	return (
		<>
			{/* Backdrop */}
			<button
				type="button"
				className={`fixed inset-0 min-h-screen bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={handleClose}
				onKeyUp={(e) => e.key === "Escape" && handleClose()}
				aria-label="Close modal"
			/>

			{/* Modal */}
			<div
				className={`fixed left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card shadow-lg transition-all duration-200 ${
					isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
				}`}
			>
				{/* Modal Header */}
				<div className="flex items-center justify-between border-b px-6 py-4">
					<h2 className="text-lg font-semibold">
						{isEditing ? "Edit Product" : "Add Product"}
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
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<label htmlFor="title" className="text-sm font-medium">
								Title
							</label>
							<Input
								id="title"
								{...register("title")}
								placeholder="Product title"
							/>
							{errors.title && (
								<p className="text-sm text-red-600">{errors.title.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor="brand" className="text-sm font-medium">
								Brand
							</label>
							<Input
								id="brand"
								{...register("brand")}
								placeholder="Product brand"
							/>
							{errors.brand && (
								<p className="text-sm text-red-600">{errors.brand.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor="sku" className="text-sm font-medium">
								SKU
							</label>
							<Input id="sku" {...register("sku")} placeholder="Product SKU" />
							{errors.sku && (
								<p className="text-sm text-red-600">{errors.sku.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor="price" className="text-sm font-medium">
								Price ($)
							</label>
							<Input
								id="price"
								type="number"
								step="0.01"
								{...register("price", { valueAsNumber: true })}
								placeholder="0.00"
							/>
							{errors.price && (
								<p className="text-sm text-red-600">{errors.price.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor="stock" className="text-sm font-medium">
								Stock
							</label>
							<Input
								id="stock"
								type="number"
								{...register("stock", { valueAsNumber: true })}
								placeholder="0"
							/>
							{errors.stock && (
								<p className="text-sm text-red-600">{errors.stock.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor="weight" className="text-sm font-medium">
								Weight (kg)
							</label>
							<Input
								id="weight"
								type="number"
								step="0.01"
								{...register("weight", { valueAsNumber: true })}
								placeholder="0.00"
							/>
							{errors.weight && (
								<p className="text-sm text-red-600">{errors.weight.message}</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<label htmlFor="category" className="text-sm font-medium">
							Category
						</label>
						<CategorySelect
							value={watch("categoryId")}
							onChange={(categoryId) => setValue("categoryId", categoryId || 0)}
							placeholder="Select a category"
							className="w-full"
							allowAll={false}
						/>
						{errors.categoryId && (
							<p className="text-sm text-red-600">
								{errors.categoryId.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<label htmlFor="description" className="text-sm font-medium">
							Description
						</label>
						<textarea
							id="description"
							{...register("description")}
							placeholder="Product description"
							className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							rows={4}
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
									? "Update Product"
									: "Create Product"}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}

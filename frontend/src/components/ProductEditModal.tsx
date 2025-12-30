import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategorySelect } from "@/components/CategorySelect";
import { useUpdateProduct } from "@/api/product-hooks";
import { toast } from "sonner";
import type { Product } from "@/lib/models/product";

interface ProductEditModalProps {
	product: Product;
	onClose: () => void;
}

export function ProductEditModal({ product, onClose }: ProductEditModalProps) {
	const [isOpen, setIsOpen] = useState(true);
	const { mutate: updateProduct, isPending } = useUpdateProduct();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: product.title,
			description: product.description,
			categoryId: product.categoryId,
			price: product.price,
			stock: product.stock,
			brand: product.brand,
			sku: product.sku,
			weight: product.weight,
		},
	});

	const handleCategoryChange = (categoryId: number | undefined) => {
		setValue("categoryId", categoryId || 0, { shouldValidate: true });
	};

	const onSubmit = (data: any) => {
		updateProduct(
			{
				id: product.id,
				data: {
					title: data.title,
					description: data.description,
					categoryId: data.categoryId,
					price: data.price,
					stock: data.stock,
					brand: data.brand,
					sku: data.sku,
					weight: data.weight,
				},
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
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
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
					<h2 className="text-lg font-semibold">Edit Product</h2>
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
								{...register("title", {
									required: "Title is required",
									minLength: { value: 1, message: "Title is required" },
									maxLength: { value: 200, message: "Title too long" },
								})}
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
								{...register("brand", {
									required: "Brand is required",
									minLength: { value: 1, message: "Brand is required" },
									maxLength: { value: 100, message: "Brand too long" },
								})}
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
							<Input
								id="sku"
								{...register("sku", {
									required: "SKU is required",
									minLength: { value: 1, message: "SKU is required" },
									maxLength: { value: 50, message: "SKU too long" },
								})}
								placeholder="Product SKU"
							/>
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
								{...register("price", {
									required: "Price is required",
									valueAsNumber: true,
									min: { value: 0.01, message: "Price must be greater than 0" },
								})}
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
								{...register("stock", {
									required: "Stock is required",
									valueAsNumber: true,
									min: { value: 0, message: "Stock cannot be negative" },
								})}
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
								{...register("weight", {
									required: "Weight is required",
									valueAsNumber: true,
									min: {
										value: 0.01,
										message: "Weight must be greater than 0",
									},
								})}
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
							onChange={handleCategoryChange}
							placeholder="Select a category"
							className="w-full"
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
							{...register("description", {
								required: "Description is required",
								minLength: { value: 1, message: "Description is required" },
								maxLength: { value: 1000, message: "Description too long" },
							})}
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
							{isPending ? "Updating..." : "Update Product"}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}

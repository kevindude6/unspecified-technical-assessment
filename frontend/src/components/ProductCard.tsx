import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/api/product-hooks";
import { toast } from "sonner";
import { useState } from "react";
import { ProductEditModal } from "./ProductEditModal";
import type { Product } from "@/lib/models/product";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	const { mutate: deleteProduct, isPending } = useDeleteProduct();
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const handleDelete = () => {
		if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
			deleteProduct(product.id, {
				onSuccess: () => {
					toast.success("Product deleted successfully");
				},
				onError: (error) => {
					toast.error(`Failed to delete product: ${error.message}`);
				},
			});
		}
	};

	const handleEdit = () => {
		setIsEditModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsEditModalOpen(false);
	};

	return (
		<>
			<Card className="h-full flex flex-col">
				<CardHeader className="flex-1">
					<CardTitle className="text-lg">{product.title}</CardTitle>
					<CardDescription className="text-sm text-muted-foreground">
						{product.category.name}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<p className="text-sm text-muted-foreground line-clamp-2">
						{product.description}
					</p>
					<div className="mt-2 space-y-1 text-sm text-muted-foreground">
						<div>Brand: {product.brand}</div>
						<div>Stock: {product.stock}</div>
					</div>
				</CardContent>

				<CardFooter className="flex justify-between items-center">
					<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
					<div className="flex gap-2">
						<Button size="sm" variant="outline" onClick={handleEdit}>
							Edit
						</Button>
						<Button
							size="sm"
							variant="destructive"
							onClick={handleDelete}
							disabled={isPending}
						>
							{isPending ? "Deleting..." : "Delete"}
						</Button>
					</div>
				</CardFooter>
			</Card>

			{isEditModalOpen && (
				<ProductEditModal product={product} onClose={handleCloseModal} />
			)}
		</>
	);
}

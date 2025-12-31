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
import { useTranslation } from "react-i18next";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	const { t } = useTranslation();
	const { mutate: deleteProduct, isPending } = useDeleteProduct();
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const handleDelete = () => {
		if (
			window.confirm(t("confirmation.deleteProduct", { title: product.title }))
		) {
			deleteProduct(product.id, {
				onSuccess: () => {
					toast.success(t("productEditModal.successDelete"));
				},
				onError: (error) => {
					toast.error(
						t("productEditModal.errorDelete", { message: error.message }),
					);
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
						<div>
							{t("product.brand")}: {product.brand}
						</div>
						<div>
							{t("product.stock")}: {product.stock}
						</div>
					</div>
				</CardContent>

				<CardFooter className="flex justify-between items-center">
					<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
					<div className="flex gap-2">
						<Button size="sm" variant="outline" onClick={handleEdit}>
							{t("product.edit")}
						</Button>
						<Button
							size="sm"
							variant="destructive"
							onClick={handleDelete}
							disabled={isPending}
						>
							{isPending ? t("product.deleting") : t("product.delete")}
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

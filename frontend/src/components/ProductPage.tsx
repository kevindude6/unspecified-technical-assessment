import { useState } from "react";
import { ProductFilter } from "./ProductFilter";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import { ProductEditModal } from "./ProductEditModal";
import { useProducts } from "../api/product-hooks";
import { useTranslation } from "react-i18next";

export type SortTerm = "title" | "price" | "stock" | "categoryName";
export type SortOrder = "asc" | "desc";
export function ProductPage() {
	const { t } = useTranslation();
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<SortTerm>("title");
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
	const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
	const [currentPage, setCurrentPage] = useState(1);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const {
		data: productsData,
		isLoading,
		error,
	} = useProducts({
		search: searchTerm,
		categoryId,
		page: currentPage,
		sortBy,
		sortOrder,
	});

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		setCurrentPage(1); // Reset to first page when searching
	};

	const handleSort = (newSortBy: SortTerm, newSortOrder: SortOrder) => {
		setSortBy(newSortBy);
		setSortOrder(newSortOrder);
	};

	const handleCategoryFilter = (categoryId: number | undefined) => {
		setCategoryId(categoryId);
		setCurrentPage(1); // Reset to first page when filtering by category
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const GridDisplay = () => {
		if (isLoading)
			return (
				<div className="text-center py-12">
					<p className="text-muted-foreground">{t("common.loadingProducts")}</p>
				</div>
			);

		if (error || productsData === undefined)
			return (
				<div className="text-center py-12">
					<p className="text-red-500">
						{t("common.errorLoadingProducts")}: {error?.message}
					</p>
				</div>
			);

		return (
			<div>
				<div className="flex justify-between items-center mb-4">
					<div className="text-sm text-muted-foreground">
						{t("common.showingPage")} {productsData.pagination.currentPage}{" "}
						{t("common.of")} {productsData.pagination.totalPages}
					</div>
					<div className="text-sm text-muted-foreground">
						{t("common.totalProducts")}: {productsData.pagination.totalItems}
					</div>
				</div>
				<ProductGrid products={productsData.products} />
			</div>
		);
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold mb-2">{t("navbar.products")}</h1>
						<p className="text-muted-foreground">
							{t("product.browseProducts")}
						</p>
					</div>
					<button
						type="button"
						onClick={() => setIsAddModalOpen(true)}
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
					>
						{t("product.create")}
					</button>
				</div>
			</div>

			<ProductFilter
				onSearch={handleSearch}
				onSort={handleSort}
				onCategoryFilter={handleCategoryFilter}
			/>

			{GridDisplay()}

			{productsData && (
				<Pagination
					currentPage={productsData.pagination.currentPage}
					totalPages={productsData.pagination.totalPages}
					onPageChange={handlePageChange}
				/>
			)}

			{isAddModalOpen && (
				<ProductEditModal onClose={() => setIsAddModalOpen(false)} />
			)}
		</div>
	);
}

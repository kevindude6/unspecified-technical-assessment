import { useState } from "react";
import { ProductFilter } from "./ProductFilter";
import { ProductGrid } from "./ProductGrid";
import { useProducts } from "../api/product-hooks";
import { sampleProducts, sampleCategories } from "../lib/sample-data";
import type { Product } from "../lib/models/product";

export function ProductPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

	// For now, using sample data until backend is connected
	// TODO: Replace with actual API calls when backend is ready
	const {
		data: productsData,
		isLoading,
		error,
	} = useProducts({
		search: searchTerm,
		categoryId,
		page: 1,
	});

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	const handleSort = (sortBy: string) => {
		setSortBy(sortBy);
	};

	const handleCategoryFilter = (categoryId: number | undefined) => {
		setCategoryId(categoryId);
	};

	const GridDisplay = () => {
		if (isLoading)
			return (
				<div className="text-center py-12">
					<p className="text-muted-foreground">Loading products...</p>
				</div>
			);

		if (error || productsData === undefined)
			return (
				<div className="text-center py-12">
					<p className="text-red-500">
						Error loading products: {error?.message}
					</p>
				</div>
			);

		return <ProductGrid products={productsData?.products} />;
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold mb-2">Products</h1>
				<p className="text-muted-foreground">
					Browse our collection of music products
				</p>
			</div>

			<ProductFilter
				onSearch={handleSearch}
				onSort={handleSort}
				onCategoryFilter={handleCategoryFilter}
			/>

			{GridDisplay()}
		</div>
	);
}

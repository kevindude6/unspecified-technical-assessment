import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CategorySelect } from "./CategorySelect";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface ProductFilterProps {
	onSearch: (searchTerm: string) => void;
	onSort: (sortBy: string) => void;
	onCategoryFilter: (categoryId: number | undefined) => void;
}

export function ProductFilter({
	onSearch,
	onSort,
	onCategoryFilter,
}: ProductFilterProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("title");
	const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

	const handleSort = (newSortBy: string) => {
		setSortBy(newSortBy);
		onSort(newSortBy);
	};

	const handleCategoryFilter = (newCategoryId: number | undefined) => {
		setCategoryId(newCategoryId);
		onCategoryFilter(newCategoryId);
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1">
					<Input
						placeholder="Search products..."
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							onSearch(e.target.value);
						}}
						className="w-full"
					/>
				</div>
				<CategorySelect
					value={categoryId}
					onChange={handleCategoryFilter}
					className="w-full sm:w-64"
				/>
			</div>

			<div className="flex flex-wrap gap-2">
				<Select value={sortBy} onValueChange={handleSort}>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="title">Sort by Name</SelectItem>
						<SelectItem value="price">Sort by Price</SelectItem>
						<SelectItem value="createdAt">Sort by Date</SelectItem>
						<SelectItem value="stock">Sort by Stock</SelectItem>
						<SelectItem value="brand">Sort by Brand</SelectItem>
						<SelectItem value="categoryName">Sort by Category</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}

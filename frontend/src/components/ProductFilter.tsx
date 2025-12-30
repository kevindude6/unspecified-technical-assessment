import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CategorySelect } from "./CategorySelect";

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
	const [sortBy, setSortBy] = useState("name");
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
			</div>

			{false && (
				<div className="flex flex-wrap gap-2">
					<Button
						variant={sortBy === "name" ? "default" : "outline"}
						onClick={() => handleSort("name")}
						size="sm"
					>
						Sort by Name
					</Button>
					<Button
						variant={sortBy === "price" ? "default" : "outline"}
						onClick={() => handleSort("price")}
						size="sm"
					>
						Sort by Price
					</Button>
					<Button
						variant={sortBy === "date" ? "default" : "outline"}
						onClick={() => handleSort("date")}
						size="sm"
					>
						Sort by Date
					</Button>
				</div>
			)}

			<div className="flex flex-wrap gap-2">
				<CategorySelect
					value={categoryId}
					onChange={handleCategoryFilter}
					label="Filter by Category"
					className="w-full sm:w-auto"
				/>
			</div>
		</div>
	);
}

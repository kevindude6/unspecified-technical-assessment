import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductFilterProps {
	onSearch: (searchTerm: string) => void;
	onSort: (sortBy: string) => void;
	onCategoryFilter: (category: string) => void;
}

export function ProductFilter({
	onSearch,
	onSort,
	onCategoryFilter,
}: ProductFilterProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [category, setCategory] = useState("");

	const handleSearch = () => {
		onSearch(searchTerm);
	};

	const handleSort = (newSortBy: string) => {
		setSortBy(newSortBy);
		onSort(newSortBy);
	};

	const handleCategoryFilter = (newCategory: string) => {
		setCategory(newCategory);
		onCategoryFilter(newCategory);
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1">
					<Input
						placeholder="Search products..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full"
					/>
				</div>
				<Button onClick={handleSearch} className="w-full sm:w-auto">
					Search
				</Button>
			</div>

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

			<div className="flex flex-wrap gap-2">
				<Button
					variant={category === "" ? "default" : "outline"}
					onClick={() => handleCategoryFilter("")}
					size="sm"
				>
					All Categories
				</Button>
				<Button
					variant={category === "vinyl" ? "default" : "outline"}
					onClick={() => handleCategoryFilter("vinyl")}
					size="sm"
				>
					Vinyl
				</Button>
				<Button
					variant={category === "cd" ? "default" : "outline"}
					onClick={() => handleCategoryFilter("cd")}
					size="sm"
				>
					CDs
				</Button>
				<Button
					variant={category === "tape" ? "default" : "outline"}
					onClick={() => handleCategoryFilter("tape")}
					size="sm"
				>
					Tapes
				</Button>
			</div>
		</div>
	);
}

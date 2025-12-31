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
import { ArrowUp, ArrowDown } from "lucide-react";
import type { SortTerm, SortOrder } from "./ProductPage";
import { useTranslation } from "react-i18next";

interface ProductFilterProps {
	onSearch: (searchTerm: string) => void;
	onSort: (sortBy: SortTerm, sortOrder: SortOrder) => void;
	onCategoryFilter: (categoryId: number | undefined) => void;
}

export function ProductFilter({
	onSearch,
	onSort,
	onCategoryFilter,
}: ProductFilterProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<SortTerm>("title");
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
	const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
	const { t } = useTranslation();

	const handleSort = (newSortBy: string) => {
		setSortBy(newSortBy as SortTerm);
		onSort(newSortBy as SortTerm, sortOrder);
	};

	const handleSortOrderToggle = () => {
		const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
		setSortOrder(newSortOrder);
		onSort(sortBy, newSortOrder);
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
						placeholder={t("productFilter.searchPlaceholder")}
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
					placeholder={t("productFilter.categoryPlaceholder")}
				/>
			</div>

			<div className="flex flex-wrap gap-2">
				<Select value={sortBy} onValueChange={handleSort}>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder={t("productFilter.sortByPlaceholder")} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="title">
							{t("productFilter.sortByName")}
						</SelectItem>
						<SelectItem value="price">
							{t("productFilter.sortByPrice")}
						</SelectItem>
						<SelectItem value="stock">
							{t("productFilter.sortByStock")}
						</SelectItem>
					</SelectContent>
				</Select>
				<Button
					variant="outline"
					size="sm"
					onClick={handleSortOrderToggle}
					className="flex items-center gap-2"
				>
					{sortOrder === "asc" ? (
						<ArrowUp className="h-4 w-4" />
					) : (
						<ArrowDown className="h-4 w-4" />
					)}
					{sortOrder === "asc"
						? t("productFilter.ascending")
						: t("productFilter.descending")}
				</Button>
			</div>
		</div>
	);
}

import { useState } from "react";
import { useCategories } from "../api/category-hooks";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface CategorySelectProps {
	value?: number;
	onChange?: (categoryId: number | undefined) => void;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	className?: string;
}

export function CategorySelect({
	value,
	onChange,
	placeholder = "Select a category",
	disabled = false,
	label = "",
	className,
}: CategorySelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { data, isLoading, error } = useCategories();

	const handleSelect = (categoryId: string) => {
		const id = categoryId === "all" ? undefined : parseInt(categoryId, 10);
		onChange?.(id);
		setIsOpen(false);
	};

	const selectedCategory = data?.categories.find((cat) => cat.id === value);

	// Sort categories alphabetically by name
	const sortedCategories =
		data?.categories.sort((a, b) => a.name.localeCompare(b.name)) || [];

	return (
		<div className={className}>
			{label && (
				<label htmlFor="category-select" className="mb-2 block">
					{label}
				</label>
			)}
			<Select
				value={value?.toString() || "all"}
				onValueChange={handleSelect}
				onOpenChange={setIsOpen}
				disabled={disabled || isLoading}
			>
				<SelectTrigger
					id="category-select"
					className="w-full"
					disabled={disabled || isLoading}
				>
					<SelectValue placeholder={placeholder}>
						{isLoading
							? "Loading categories..."
							: selectedCategory
								? selectedCategory.name
								: placeholder}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Categories</SelectItem>
					{sortedCategories.map((category) => (
						<SelectItem key={category.id} value={category.id.toString()}>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{error && (
				<p className="mt-2 text-sm text-red-600">
					Failed to load categories. Please try again.
				</p>
			)}
		</div>
	);
}

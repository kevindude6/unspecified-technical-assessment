import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	const handlePrevious = () => {
		if (!isFirstPage) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (!isLastPage) {
			onPageChange(currentPage + 1);
		}
	};

	const handleFirst = () => {
		if (!isFirstPage) {
			onPageChange(1);
		}
	};

	const handleLast = () => {
		if (!isLastPage) {
			onPageChange(totalPages);
		}
	};

	// Generate page numbers to display (show current page + 2 on each side)
	const startPage = Math.max(1, currentPage - 2);
	const endPage = Math.min(totalPages, currentPage + 2);

	const getPageNumbers = () => {
		const pages: number[] = [];

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<div className="flex items-center justify-center gap-2 py-4">
			<Button
				variant="outline"
				size="sm"
				onClick={handleFirst}
				disabled={isFirstPage}
				aria-label="Go to first page"
			>
				«
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={handlePrevious}
				disabled={isFirstPage}
				aria-label="Go to previous page"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{startPage > 1 && (
				<>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(1)}
						aria-label="Go to page 1"
					>
						1
					</Button>
					{startPage > 2 && (
						<span className="px-2 text-sm text-muted-foreground">...</span>
					)}
				</>
			)}

			{pageNumbers.map((page) => (
				<Button
					key={page}
					variant={page === currentPage ? "default" : "outline"}
					size="sm"
					onClick={() => onPageChange(page)}
					aria-label={`Go to page ${page}`}
				>
					{page}
				</Button>
			))}

			{endPage < totalPages && (
				<>
					{endPage < totalPages - 1 && (
						<span className="px-2 text-sm text-muted-foreground">...</span>
					)}
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(totalPages)}
						aria-label={`Go to page ${totalPages}`}
					>
						{totalPages}
					</Button>
				</>
			)}

			<Button
				variant="outline"
				size="sm"
				onClick={handleNext}
				disabled={isLastPage}
				aria-label="Go to next page"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={handleLast}
				disabled={isLastPage}
				aria-label={`Go to page ${totalPages}`}
			>
				»
			</Button>
		</div>
	);
}

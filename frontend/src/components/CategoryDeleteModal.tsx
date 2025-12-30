import { type Category } from "../lib/models/category";

interface CategoryDeleteModalProps {
	category: Category | null;
	isOpen?: boolean;
	isDeleting: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export function CategoryDeleteModal({
	category,
	isOpen = false,
	isDeleting,
	onConfirm,
	onCancel,
}: CategoryDeleteModalProps) {
	if (!isOpen || !category) {
		return null;
	}

	return (
		<>
			{/* Backdrop */}
			<button
				type="button"
				className={`fixed inset-0 min-h-screen bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={onCancel}
				onKeyUp={(e) => e.key === "Escape" && onCancel()}
				aria-label="Close modal"
			/>

			{/* Modal */}
			<div
				className={`fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card shadow-lg transition-all duration-200 ${
					isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
				}`}
			>
				{/* Modal Header */}
				<div className="flex items-center justify-between border-b px-6 py-4">
					<h2 className="text-lg font-semibold text-red-600">
						Confirm Deletion
					</h2>
					<button
						type="button"
						onClick={onCancel}
						className="text-muted-foreground hover:text-foreground"
						aria-label="Close modal"
					>
						×
					</button>
				</div>

				{/* Modal Content */}
				<div className="space-y-4 p-6">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
							<svg
								className="w-4 h-4 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
								/>
							</svg>
						</div>
						<div>
							<h3 className="font-medium">Delete "{category.name}"?</h3>
							<p className="text-sm text-muted-foreground mt-1">
								This action cannot be undone. All products associated with this
								category will also be deleted.
							</p>
						</div>
					</div>

					<div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
						<p className="text-sm text-yellow-800">
							<strong>Warning:</strong> Deleting this category will permanently
							remove all products that belong to it.
						</p>
					</div>

					{/* Modal Footer */}
					<div className="flex justify-end space-x-2 border-t pt-4">
						<button
							type="button"
							onClick={onCancel}
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={onConfirm}
							disabled={isDeleting}
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-9 px-3"
						>
							{isDeleting ? "Deleting..." : "Delete Category"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

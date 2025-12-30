import { Navbar } from "./Navbar";

type Page = "Home" | "Products" | "Categories";

interface LayoutProps {
	children: React.ReactNode;
	currentPage: Page;
	onPageChange: (page: Page) => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
	return (
		<div className="min-h-screen bg-background">
			<Navbar currentPage={currentPage} onPageChange={onPageChange} />
			<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</div>
	);
}

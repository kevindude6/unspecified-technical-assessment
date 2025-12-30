import { Navbar } from "./Navbar";

interface LayoutProps {
	children: React.ReactNode;
	currentPage: string;
	onPageChange: (page: string) => void;
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

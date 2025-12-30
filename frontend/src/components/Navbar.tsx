import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Page = "Home" | "Products" | "Categories";

interface NavbarProps {
	currentPage: Page;
	onPageChange: (page: Page) => void;
}

const pages: Page[] = ["Home", "Products", "Categories"];

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
	return (
		<nav className="border-b bg-background">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<Button variant={"link"} onClick={() => onPageChange("Home")}>
							<h1 className="text-xl font-bold">Product App</h1>
						</Button>
					</div>
					<div className="flex space-x-4">
						{pages.map((page) => (
							<Button
								key={page}
								variant={currentPage === page ? "default" : "ghost"}
								onClick={() => onPageChange(page)}
								className={cn(
									"text-sm font-medium transition-colors hover:text-foreground",
									currentPage === page && "text-accent",
								)}
							>
								{page}
							</Button>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
}

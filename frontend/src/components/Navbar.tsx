import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Page = "Home" | "Products" | "Categories";

interface NavbarProps {
	currentPage: Page;
	onPageChange: (page: Page) => void;
}

const pages: Page[] = ["Home", "Products", "Categories"];

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
	const { t, i18n } = useTranslation();

	const toggleLanguage = () => {
		const newLang = i18n.language === "en" ? "ja" : "en";
		i18n.changeLanguage(newLang);
	};

	return (
		<nav className="border-b bg-background">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<Button variant={"link"} onClick={() => onPageChange("Home")}>
							<h1 className="text-xl font-bold">{t("navbar.productApp")}</h1>
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
								{t(`navbar.${page.toLowerCase()}`)}
							</Button>
						))}
						<Button
							variant="outline"
							size="sm"
							onClick={toggleLanguage}
							className="ml-2"
						>
							{i18n.language === "en" ? "English" : "日本語"}
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}

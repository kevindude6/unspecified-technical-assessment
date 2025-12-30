import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Layout } from "./components/Layout";
import { ProductPage } from "./components/ProductPage";
import { CategoryPage } from "./components/CategoryPage";
import { HomePage } from "./components/HomePage";

export type Page = "Home" | "Products" | "Categories";

function App() {
	const queryClient = new QueryClient();
	const [currentPage, setCurrentPage] = useState<Page>("Home");

	const handlePageChange = (page: Page) => {
		setCurrentPage(page);
	};

	const renderPageContent = () => {
		if (currentPage === "Products") {
			return <ProductPage />;
		}

		if (currentPage === "Categories") {
			return <CategoryPage />;
		}

		return <HomePage onPageChange={handlePageChange} />;
	};

	return (
		<QueryClientProvider client={queryClient}>
			<Layout currentPage={currentPage} onPageChange={handlePageChange}>
				{renderPageContent()}
			</Layout>
		</QueryClientProvider>
	);
}

export default App;

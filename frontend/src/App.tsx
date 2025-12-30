import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Layout } from "./components/Layout";
import { ProductFilter } from "./components/ProductFilter";
import { ProductGrid } from "./components/ProductGrid";
import type { Product } from "./components/ProductCard";

function App() {
	const queryClient = new QueryClient();
	const [currentPage, setCurrentPage] = useState("Home");

	// Sample product data for testing
	const sampleProducts: Product[] = [
		{
			id: "1",
			name: "The Dark Side of the Moon",
			description: "Pink Floyd's iconic 1973 progressive rock album",
			price: 29.99,
			category: "vinyl",
			imageUrl:
				"https://images.unsplash.com/photo-1598256976991-0c4464b0b721?w=400",
		},
		{
			id: "2",
			name: "Thriller",
			description: "Michael Jackson's best-selling album of all time",
			price: 19.99,
			category: "cd",
			imageUrl:
				"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
		},
		{
			id: "3",
			name: "Abbey Road",
			description: "The Beatles' classic 1969 album",
			price: 24.99,
			category: "vinyl",
			imageUrl:
				"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
		},
		{
			id: "4",
			name: "Rumours",
			description: "Fleetwood Mac's 1977 masterpiece",
			price: 22.99,
			category: "cd",
			imageUrl:
				"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
		},
		{
			id: "5",
			name: "Kind of Blue",
			description: "Miles Davis' legendary jazz album",
			price: 17.99,
			category: "vinyl",
			imageUrl:
				"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
		},
		{
			id: "6",
			name: "Nevermind",
			description: "Nirvana's groundbreaking grunge album",
			price: 15.99,
			category: "cd",
			imageUrl:
				"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
		},
	];

	const handlePageChange = (page: string) => {
		setCurrentPage(page);
	};

	const renderPageContent = () => {
		if (currentPage === "Products") {
			return (
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold mb-2">Products</h1>
						<p className="text-muted-foreground">
							Browse our collection of music products
						</p>
					</div>

					<ProductFilter
						onSearch={(term) => console.log("Search:", term)}
						onSort={(sortBy) => console.log("Sort by:", sortBy)}
						onCategoryFilter={(category) => console.log("Filter by:", category)}
					/>

					<ProductGrid products={sampleProducts} />
				</div>
			);
		}

		return (
			<div className="text-center">
				<h1 className="text-3xl font-bold mb-4">Welcome to {currentPage}</h1>
				<p className="text-muted-foreground">
					This is a simple skeleton layout with a navbar using shadcn
					components.
				</p>
			</div>
		);
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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Layout } from "./components/Layout";

function App() {
	const queryClient = new QueryClient();
	const [currentPage, setCurrentPage] = useState("Home");

	const handlePageChange = (page: string) => {
		setCurrentPage(page);
	};

	return (
		<QueryClientProvider client={queryClient}>
			<Layout currentPage={currentPage} onPageChange={handlePageChange}>
				<div className="text-center">
					<h1 className="text-3xl font-bold mb-4">Welcome to {currentPage}</h1>
					<p className="text-muted-foreground">
						This is a simple skeleton layout with a navbar using shadcn
						components.
					</p>
				</div>
			</Layout>
		</QueryClientProvider>
	);
}

export default App;

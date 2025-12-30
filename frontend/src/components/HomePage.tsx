import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HomePageProps {
	onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
	return (
		<div className="text-center space-y-8">
			<div className="space-y-4">
				<h1 className="text-4xl font-bold text-gray-900">Welcome to Vynyl</h1>
				<p className="text-xl text-gray-600 max-w-2xl mx-auto">
					Discover premium vinyl records from our carefully curated collection.
					Whether you're a seasoned collector or just starting your journey, we
					have the perfect records for every taste.
				</p>
			</div>
			<div className="flex justify-center space-x-4">
				<button
					type="button"
					onClick={() => onPageChange("Products")}
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 text-lg"
				>
					Browse Products
				</button>
				<button
					type="button"
					onClick={() => onPageChange("Categories")}
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-6 text-lg"
				>
					Browse Categories
				</button>
			</div>
		</div>
	);
}

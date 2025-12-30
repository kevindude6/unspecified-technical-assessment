import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl?: string;
}

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Card className="h-full flex flex-col">
			<div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
				{product.imageUrl ? (
					<img
						src={product.imageUrl}
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
						<span className="text-gray-600 text-sm">No image</span>
					</div>
				)}
			</div>

			<CardHeader className="flex-1">
				<CardTitle className="text-lg">{product.name}</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					{product.category}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<p className="text-sm text-muted-foreground line-clamp-2">
					{product.description}
				</p>
			</CardContent>

			<CardFooter className="flex justify-between items-center">
				<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
				<Button size="sm">Add to Cart</Button>
			</CardFooter>
		</Card>
	);
}

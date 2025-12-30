import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/models/product";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex-1">
				<CardTitle className="text-lg">{product.title}</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					{product.category.name}
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

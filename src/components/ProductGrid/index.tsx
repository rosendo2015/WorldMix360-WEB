import type { VariantProps } from "class-variance-authority";
import { cn } from "tailwind-variants";

import type { Product } from "../../contexts/ProductsContext";
import { ProductCard } from "../ProductCard";
import { productGridVariants } from "./productGridVariants";

interface ProductGridProps extends VariantProps<typeof productGridVariants> {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, gap, className }: ProductGridProps) {
  return (
    <div className={cn(productGridVariants({ gap }), className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-[var(--shadow-card)] hover:-translate-y-1 [transition:var(--transition-smooth)]">
      <CardContent className="p-0">
        <div className="aspect-square bg-secondary relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-semibold text-base mb-2">{product.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">{product.price} kr</span>
            <span className="text-sm text-muted-foreground">/ {product.unit}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-[var(--gradient-fresh)] hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

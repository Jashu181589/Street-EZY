import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  supplier: string;
  rating: number;
  stock: number;
  image: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="shadow-soft hover:shadow-medium transition-all duration-300 group overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-4 w-4" />
            </Button>
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                {product.discount}% OFF
              </Badge>
            )}
          </div>
          
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.supplier}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {product.stock} {product.unit} left
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                <span className="text-sm text-muted-foreground">/{product.unit}</span>
              </div>
            </div>
            
            <Button className="w-full bg-gradient-primary">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
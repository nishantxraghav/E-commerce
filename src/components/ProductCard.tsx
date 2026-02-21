import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    addToCart(product);
    
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card
        className="group overflow-hidden bg-white border border-[#e5e5e5] rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col animate-fade-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative aspect-square bg-gradient-to-br from-[#f5f5f5] to-[#e5e5e5] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {product.rating.rate >= 4.5 && (
            <div className="absolute top-4 right-4 bg-[#ff6b35] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              HOT
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="mb-2">
            <p className="text-xs text-[#666] uppercase tracking-wider font-medium mb-2">
              {product.category}
            </p>
            <h3 className="font-display font-bold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-[#0066ff] transition-colors">
              {product.title}
            </h3>
          </div>

          <p className="text-sm text-[#666] line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#ff6b35] text-[#ff6b35]" />
              <span className="text-sm font-medium">{product.rating.rate}</span>
            </div>
            <span className="text-xs text-[#999]">
              ({product.rating.count} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="font-mono-tech text-3xl font-bold">
              ${product.price.toFixed(2)}
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`bg-[#0066ff] hover:bg-[#0052cc] text-white gap-2 transition-all ${
                isAdding ? 'animate-pulse-scale' : ''
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

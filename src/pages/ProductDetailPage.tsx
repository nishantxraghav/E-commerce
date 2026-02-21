import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ArrowLeft, Minus, Plus, AlertCircle } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const productData = await api.getProduct(Number(id));
        setProduct(productData);
        
        const categoryProducts = await api.getProductsByCategory(productData.category);
        const filtered = categoryProducts
          .filter(p => p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 300);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="aspect-square bg-[#e0e0e0] animate-shimmer rounded-2xl" />
          <div className="space-y-6">
            <div className="h-8 w-32 bg-[#e0e0e0] animate-shimmer rounded" />
            <div className="h-12 w-full bg-[#e0e0e0] animate-shimmer rounded" />
            <div className="h-6 w-24 bg-[#e0e0e0] animate-shimmer rounded" />
            <div className="h-32 w-full bg-[#e0e0e0] animate-shimmer rounded" />
            <div className="h-12 w-full bg-[#e0e0e0] animate-shimmer rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-[#ff6b35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-[#ff6b35]" />
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">Product Not Found</h3>
          <p className="text-[#666] mb-6">{error || 'This product does not exist'}</p>
          <Link to="/">
            <Button className="bg-[#0066ff] hover:bg-[#0052cc] text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-[#666] hover:text-[#0066ff] transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </Link>

      <div className="grid lg:grid-cols-2 gap-16 mb-32">
        <div className="relative">
          <div className="sticky top-24 bg-gradient-to-br from-[#f5f5f5] to-[#e5e5e5] rounded-2xl p-12 aspect-square flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-sm text-[#666] uppercase tracking-wider font-medium mb-3">
              {product.category}
            </p>
            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[#ff6b35] text-[#ff6b35]" />
                <span className="text-lg font-bold">{product.rating.rate}</span>
              </div>
              <span className="text-[#999]">
                ({product.rating.count} reviews)
              </span>
            </div>

            <div className="font-mono-tech text-6xl font-bold mb-8">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <div className="prose prose-lg">
            <p className="text-[#666] leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t border-[#e5e5e5] pt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-12 w-12 border-[#e5e5e5]"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-2xl font-mono-tech font-bold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-12 w-12 border-[#e5e5e5]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full h-14 text-lg bg-[#0066ff] hover:bg-[#0052cc] text-white gap-3 ${
                isAdding ? 'animate-pulse-scale' : ''
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-4xl font-display font-bold mb-12">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

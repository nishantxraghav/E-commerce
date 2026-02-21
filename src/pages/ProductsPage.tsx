import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/ProductSkeleton';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-[#ff6b35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-[#ff6b35]" />
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">Oops!</h3>
          <p className="text-[#666] mb-6">{error}</p>
          <Button
            onClick={fetchProducts}
            className="bg-[#0066ff] hover:bg-[#0052cc] text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-20">
      <div className="mb-16">
        <h1 className="text-6xl lg:text-7xl font-display font-bold mb-4 leading-none">
          Discover
          <br />
          Products
        </h1>
        <p className="text-xl text-[#666] max-w-2xl">
          Explore our curated collection of premium products
        </p>
      </div>

      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

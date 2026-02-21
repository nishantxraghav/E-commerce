import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Home, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import { api } from '@/services/api';
import { Product } from '@/types/product';

export function Navigation() {
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartItemsCount();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await api.searchProducts(searchQuery);
        setSearchResults(results.slice(0, 5));
        setShowResults(true);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearchResultClick = (productId: number) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-[#0066ff]/20 text-[#0066ff] font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#faf8f5]/80 backdrop-blur-xl border-b border-[#e5e5e5]">
      <div className="max-w-[1400px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#0066ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold">PRODUX</span>
          </Link>

          <div className="flex-1 max-w-xl relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="pl-12 h-12 text-base bg-white border-[#e5e5e5] focus:border-[#0066ff] focus:ring-[#0066ff]/20"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-[#0066ff] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-[#e5e5e5] overflow-hidden z-50">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSearchResultClick(product.id)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f5f5f5] transition-colors text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 object-contain rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {highlightMatch(product.title, searchQuery)}
                      </p>
                      <p className="text-xs text-[#666] font-mono-tech">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-[#1a1a1a] hover:text-[#0066ff] transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-[#1a1a1a] hover:text-[#0066ff] transition-colors group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 min-w-[20px] flex items-center justify-center bg-[#ff6b35] text-white text-xs font-mono-tech px-1 group-hover:scale-110 transition-transform">
                    {cartCount}
                  </Badge>
                )}
              </div>
              <span className="font-medium">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

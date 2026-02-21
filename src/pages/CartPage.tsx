import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-[#e5e5e5] rounded-full flex items-center justify-center mx-auto mb-6 bg-texture">
            <ShoppingBag className="w-12 h-12 text-[#999]" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-3">Your Cart is Empty</h2>
          <p className="text-[#666] mb-8">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link to="/">
            <Button className="bg-[#0066ff] hover:bg-[#0052cc] text-white text-lg px-8 h-12">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-20">
      <h1 className="text-6xl font-display font-bold mb-4 leading-none">
        Shopping Cart
      </h1>
      <p className="text-xl text-[#666] mb-16">
        {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
      </p>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="p-6 bg-white border border-[#e5e5e5] rounded-xl">
              <div className="flex gap-6">
                <Link 
                  to={`/product/${item.id}`}
                  className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-[#f5f5f5] to-[#e5e5e5] rounded-lg p-4 hover:scale-105 transition-transform"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between gap-4 mb-2">
                    <div>
                      <p className="text-xs text-[#666] uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <Link 
                        to={`/product/${item.id}`}
                        className="font-display font-bold text-lg hover:text-[#0066ff] transition-colors"
                      >
                        {item.title}
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#ff6b35] hover:text-[#ff6b35] hover:bg-[#ff6b35]/10"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-10 w-10 border-[#e5e5e5]"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-xl font-mono-tech font-bold w-12 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-10 w-10 border-[#e5e5e5]"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-[#666] mb-1">Subtotal</p>
                      <p className="font-mono-tech text-2xl font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-8 bg-white border border-[#e5e5e5] rounded-xl sticky top-24">
            <h3 className="text-2xl font-display font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-[#e5e5e5]">
              <div className="flex justify-between">
                <span className="text-[#666]">Subtotal</span>
                <span className="font-mono-tech font-medium">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">Shipping</span>
                <span className="font-mono-tech font-medium text-[#0066ff]">
                  FREE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">Tax</span>
                <span className="font-mono-tech font-medium">
                  ${(getCartTotal() * 0.1).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <span className="text-xl font-display font-bold">Total</span>
              <span className="font-mono-tech text-3xl font-bold">
                ${(getCartTotal() * 1.1).toFixed(2)}
              </span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full h-14 text-lg bg-[#0066ff] hover:bg-[#0052cc] text-white gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Link to="/">
              <Button
                variant="outline"
                className="w-full mt-4 border-[#e5e5e5]"
              >
                Continue Shopping
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

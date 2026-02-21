import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package } from 'lucide-react';
import { useEffect, useState } from 'react';

export function OrderConfirmationPage() {
  const [orderNumber] = useState(() => 
    Math.floor(100000 + Math.random() * 900000)
  );
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div
          className={`w-32 h-32 bg-gradient-to-br from-[#0066ff] to-[#0052cc] rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-700 ${
            animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <CheckCircle2 className="w-16 h-16 text-white" />
        </div>

        <h1
          className={`text-6xl lg:text-7xl font-display font-bold mb-4 transition-all duration-700 delay-200 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Order Confirmed!
        </h1>

        <p
          className={`text-xl text-[#666] mb-12 transition-all duration-700 delay-300 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div
          className={`bg-white border border-[#e5e5e5] rounded-2xl p-8 mb-12 transition-all duration-700 delay-400 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Package className="w-6 h-6 text-[#0066ff]" />
            <h2 className="text-2xl font-display font-bold">Order Details</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[#e5e5e5]">
              <span className="text-[#666]">Order Number</span>
              <span className="font-mono-tech text-lg font-bold">
                #{orderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#e5e5e5]">
              <span className="text-[#666]">Order Date</span>
              <span className="font-mono-tech font-medium">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-[#666]">Estimated Delivery</span>
              <span className="font-mono-tech font-medium text-[#0066ff]">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`bg-[#f5f5f5] rounded-xl p-6 mb-8 transition-all duration-700 delay-500 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-[#666]">
            We've sent a confirmation email with your order details to your email
            address. You can track your order status from your email.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600 ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <Link to="/">
            <Button className="bg-[#0066ff] hover:bg-[#0052cc] text-white text-lg px-8 h-12">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

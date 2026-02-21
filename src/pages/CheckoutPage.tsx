import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CheckCircle2, CreditCard, MapPin, User } from 'lucide-react';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof CheckoutFormData)[] = [];
    
    if (step === 'shipping') {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode'];
    } else if (step === 'payment') {
      fieldsToValidate = ['cardNumber', 'expiryDate', 'cvv'];
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      if (step === 'shipping') setStep('payment');
      else if (step === 'payment') setStep('review');
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Order submitted:', { ...data, cart, total: getCartTotal() });
    clearCart();
    navigate('/order-confirmation');
  };

  const total = getCartTotal();
  const tax = total * 0.1;
  const grandTotal = total + tax;

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-20">
      <h1 className="text-6xl font-display font-bold mb-4 leading-none">
        Checkout
      </h1>
      <p className="text-xl text-[#666] mb-16">
        Complete your purchase
      </p>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-12">
            <StepIndicator 
              number={1} 
              label="Shipping" 
              active={step === 'shipping'} 
              completed={step === 'payment' || step === 'review'} 
            />
            <div className="flex-1 h-0.5 bg-[#e5e5e5]" />
            <StepIndicator 
              number={2} 
              label="Payment" 
              active={step === 'payment'} 
              completed={step === 'review'} 
            />
            <div className="flex-1 h-0.5 bg-[#e5e5e5]" />
            <StepIndicator 
              number={3} 
              label="Review" 
              active={step === 'review'} 
              completed={false} 
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 'shipping' && (
              <Card className="p-8 bg-white border border-[#e5e5e5] rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#0066ff]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#0066ff]" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">Shipping Information</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                        className="mt-2 h-12"
                      />
                      {errors.firstName && (
                        <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        className="mt-2 h-12"
                      />
                      {errors.lastName && (
                        <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="mt-2 h-12"
                    />
                    {errors.email && (
                      <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      {...register('address')}
                      className="mt-2 h-12"
                    />
                    {errors.address && (
                      <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        {...register('city')}
                        className="mt-2 h-12"
                      />
                      {errors.city && (
                        <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        {...register('zipCode')}
                        placeholder="12345"
                        className="mt-2 h-12"
                      />
                      {errors.zipCode && (
                        <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full mt-8 h-12 bg-[#0066ff] hover:bg-[#0052cc] text-white"
                >
                  Continue to Payment
                </Button>
              </Card>
            )}

            {step === 'payment' && (
              <Card className="p-8 bg-white border border-[#e5e5e5] rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#0066ff]/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#0066ff]" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">Payment Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      {...register('cardNumber')}
                      placeholder="1234567890123456"
                      maxLength={16}
                      className="mt-2 h-12 font-mono-tech"
                    />
                    {errors.cardNumber && (
                      <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        {...register('expiryDate')}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="mt-2 h-12 font-mono-tech"
                      />
                      {errors.expiryDate && (
                        <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                          {errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        {...register('cvv')}
                        placeholder="123"
                        maxLength={4}
                        className="mt-2 h-12 font-mono-tech"
                      />
                      {errors.cvv && (
                        <p className="text-[#ff6b35] text-sm mt-1 slide-in-right">
                          {errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('shipping')}
                    className="flex-1 h-12 border-[#e5e5e5]"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 h-12 bg-[#0066ff] hover:bg-[#0052cc] text-white"
                  >
                    Review Order
                  </Button>
                </div>
              </Card>
            )}

            {step === 'review' && (
              <Card className="p-8 bg-white border border-[#e5e5e5] rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#0066ff]/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#0066ff]" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">Review Your Order</h2>
                </div>

                <div className="space-y-6 mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-[#e5e5e5]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain bg-[#f5f5f5] rounded-lg p-2"
                      />
                      <div className="flex-1">
                        <h3 className="font-display font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-[#666]">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono-tech font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('payment')}
                    className="flex-1 h-12 border-[#e5e5e5]"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-12 bg-[#0066ff] hover:bg-[#0052cc] text-white"
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </Card>
            )}
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-8 bg-white border border-[#e5e5e5] rounded-xl sticky top-24">
            <h3 className="text-2xl font-display font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-3 mb-6 pb-6 border-b border-[#e5e5e5]">
              <div className="flex justify-between">
                <span className="text-[#666]">Subtotal</span>
                <span className="font-mono-tech font-medium">
                  ${total.toFixed(2)}
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
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-xl font-display font-bold">Total</span>
              <span className="font-mono-tech text-3xl font-bold">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ 
  number, 
  label, 
  active, 
  completed 
}: { 
  number: number; 
  label: string; 
  active: boolean; 
  completed: boolean; 
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
          completed
            ? 'bg-[#0066ff] text-white'
            : active
            ? 'bg-[#0066ff] text-white'
            : 'bg-[#e5e5e5] text-[#999]'
        }`}
      >
        {completed ? <CheckCircle2 className="w-6 h-6" /> : number}
      </div>
      <span
        className={`text-sm font-medium ${
          active || completed ? 'text-[#1a1a1a]' : 'text-[#999]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

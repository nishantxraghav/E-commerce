# E-Commerce Product Browser

A modern, multi-page React application for browsing and purchasing products. Built with React, TypeScript, Vite, and Tailwind CSS following the Swiss International design archetype with technical accents.

## Features

### Core Functionality
- **Product Browsing**: Browse a curated catalog with asymmetrical Bento grid layout
- **Search**: Debounced search with live results and highlighted matching text
- **Product Details**: Comprehensive product pages with image galleries and specifications
- **Shopping Cart**: Full cart management with quantity controls and real-time calculations
- **Checkout Flow**: Multi-step checkout with form validation
- **Order Confirmation**: Professional order confirmation page with details

### Design Highlights
- **Typography**: Space Grotesk for headings, Manrope for body, JetBrains Mono for technical elements
- **Color Scheme**: Warm cream (#faf8f5) background, electric blue (#0066ff) accents, burnt orange (#ff6b35) for urgency
- **Animations**: Staggered fade-up entrance, smooth transitions, hover effects with cubic-bezier easing
- **Responsive**: Mobile-first design with breakpoints for all screen sizes

### Technical Features
- Real-time cart synchronization with localStorage persistence
- Form validation with Zod and React Hook Form
- Toast notifications for user feedback
- Error boundaries with retry functionality
- Loading skeletons with shimmer effects
- Keyboard navigation support
- SEO-friendly routing

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner
- **API**: FakeStore API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Header with search and cart
│   ├── ProductCard.tsx  # Product grid item
│   ├── ProductSkeleton.tsx # Loading states
│   └── ui/             # shadcn/ui components
├── pages/              # Route pages
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   └── OrderConfirmationPage.tsx
├── contexts/           # React contexts
│   └── CartContext.tsx # Cart state management
├── services/           # API services
│   └── api.ts         # Product API calls
├── types/             # TypeScript definitions
│   └── product.ts     # Product interfaces
├── App.tsx            # Main app component
└── main.tsx          # App entry point
```

## Key Features Implementation

### Cart Management
The cart uses React Context for global state management with localStorage persistence. All cart operations (add, remove, update quantity) trigger toast notifications for user feedback.

### Search Functionality
Search implements 300ms debouncing to reduce API calls. Results display in a dropdown with highlighted matching text, keyboard navigation support, and click-outside-to-close behavior.

### Checkout Flow
Multi-step checkout with:
1. Shipping information
2. Payment details (mock)
3. Order review

Each step has real-time validation using Zod schemas. Errors display with slide-in animations and auto-focus on invalid fields.

### Animations
- Product cards: Staggered fade-up with 100ms delays
- Buttons: Scale animation on add-to-cart
- Cart badge: Pulse animation when updated
- Transitions: Cubic-bezier easing for organic feel

## Design System

### Colors
- Background: `#faf8f5` (warm cream)
- Text: `#1a1a1a` (deep charcoal)
- Primary: `#0066ff` (electric blue)
- Accent: `#ff6b35` (burnt orange)
- Border: `#e5e5e5`

### Typography Scale
- Display (72px): Product detail titles
- Heading (48-60px): Page titles
- Body (16-18px): Content
- Technical (mono): Prices and SKUs

### Spacing
- Sections: 80-120px vertical gaps
- Components: 32-48px internal spacing
- Elements: 16-24px between related items

## API Integration

The app uses the FakeStore API (https://fakestoreapi.com) for product data:
- GET /products - List all products
- GET /products/:id - Get single product
- GET /products/categories - List categories
- GET /products/category/:category - Products by category

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Code splitting with React.lazy
- Image lazy loading
- Debounced search
- Optimized animations (transform/opacity only)
- Memoized calculations

## Future Enhancements

- User authentication
- Order history
- Product reviews
- Wishlist functionality
- Advanced filtering
- Real payment integration
- Backend API integration
- Admin dashboard

## License

MIT

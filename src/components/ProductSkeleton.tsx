import { Card } from '@/components/ui/card';

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-white border border-[#e5e5e5] rounded-xl h-full flex flex-col">
      <div className="relative aspect-square bg-[#e0e0e0] animate-shimmer" />
      
      <div className="p-6 flex flex-col flex-1">
        <div className="h-3 w-20 bg-[#e0e0e0] animate-shimmer rounded mb-2" />
        <div className="h-5 w-full bg-[#e0e0e0] animate-shimmer rounded mb-2" />
        <div className="h-5 w-3/4 bg-[#e0e0e0] animate-shimmer rounded mb-4" />
        
        <div className="h-4 w-full bg-[#e0e0e0] animate-shimmer rounded mb-2" />
        <div className="h-4 w-5/6 bg-[#e0e0e0] animate-shimmer rounded mb-4" />
        
        <div className="h-4 w-24 bg-[#e0e0e0] animate-shimmer rounded mb-4" />
        
        <div className="flex items-center justify-between gap-4 mt-auto">
          <div className="h-8 w-24 bg-[#e0e0e0] animate-shimmer rounded" />
          <div className="h-10 w-24 bg-[#e0e0e0] animate-shimmer rounded" />
        </div>
      </div>
    </Card>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

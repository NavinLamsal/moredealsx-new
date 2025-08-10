export const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className ?? "h-6 w-full"}`} />
);
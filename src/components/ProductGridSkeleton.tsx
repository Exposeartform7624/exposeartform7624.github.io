export default function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <div className="skeleton aspect-[4/5]" />
          <div className="p-5 space-y-3">
            <div className="skeleton h-3 w-1/3" />
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="skeleton h-9" />
              <div className="skeleton h-9" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

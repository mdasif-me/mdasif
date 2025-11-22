export default function Loading() {
  return (
    <section className="space-y-8 py-12 mt-40 container mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Hero Skeleton */}
        <div className="relative h-[400px] overflow-hidden rounded-2xl md:h-[550px] lg:col-span-2 bg-secondary-foreground/50 animate-pulse">
          <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-4">
            <div className="h-6 w-24 bg-secondary-foreground/10 rounded-md" />
            <div className="h-10 w-3/4 bg-secondary-foreground/10 rounded-md" />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="bg-secondary-foreground text-secondary space-y-4 rounded-2xl border border-border/10 p-4 lg:col-span-1">
          <div className="h-7 w-40 bg-secondary-foreground/10 rounded-md animate-pulse" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-16 w-16 bg-secondary-foreground/10 rounded-md shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-secondary-foreground/10 rounded-md" />
                  <div className="h-4 w-2/3 bg-secondary-foreground/10 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Posts Skeleton */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-8 w-48 bg-secondary-foreground/10 rounded-md animate-pulse" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-secondary-foreground overflow-hidden rounded-2xl border-border/10 border animate-pulse"
            >
              <div className="h-48 w-full bg-secondary-foreground/10" />
              <div className="grid gap-2 p-4">
                <div className="h-6 w-3/4 bg-secondary-foreground/10 rounded-md" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-secondary-foreground/10 rounded-md" />
                  <div className="h-4 w-full bg-secondary-foreground/10 rounded-md" />
                  <div className="h-4 w-2/3 bg-secondary-foreground/10 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

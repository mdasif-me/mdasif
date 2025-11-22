export default function Loading() {
  return (
    <section className="space-y-8 py-12 mt-48">
      <div className="mx-auto px-6">
        {/* Header Skeleton */}
        <header className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Back Button */}
              <div className="h-10 w-20 bg-secondary-foreground/10 rounded-md animate-pulse" />
              {/* Views */}
              <div className="ml-2 h-5 w-24 bg-secondary-foreground/10 rounded-md animate-pulse" />
            </div>
            <div className="flex items-center gap-4">
              {/* Category Badge */}
              <div className="h-6 w-24 bg-secondary-foreground/10 rounded-full animate-pulse" />
              {/* Engagement Buttons */}
              <div className="flex gap-2">
                <div className="h-6 w-12 bg-secondary-foreground/10 rounded-md animate-pulse" />
                <div className="h-6 w-12 bg-secondary-foreground/10 rounded-md animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-12 w-3/4 bg-secondary-foreground/10 rounded-md animate-pulse" />
            <div className="h-12 w-1/2 bg-secondary-foreground/10 rounded-md animate-pulse" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {/* Date */}
                <div className="h-5 w-32 bg-secondary-foreground/10 rounded-md animate-pulse" />
                {/* Badge */}
                <div className="h-6 w-20 bg-secondary-foreground/10 rounded-full animate-pulse" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Share Label */}
              <div className="h-4 w-20 bg-secondary-foreground/10 rounded-md animate-pulse" />
              {/* Share Buttons */}
              <div className="flex gap-2">
                <div className="h-10 w-10 bg-secondary-foreground/10 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-secondary-foreground/10 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-secondary-foreground/10 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Skeleton */}
        <div className="space-y-8">
          {/* Cover Image */}
          <div className="bg-secondary-foreground/10 aspect-video w-full overflow-hidden rounded-xl animate-pulse" />

          <div className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-secondary-foreground/10 rounded-md animate-pulse" />
              <div className="h-4 w-full bg-secondary-foreground/10 rounded-md animate-pulse" />
              <div className="h-4 w-2/3 bg-secondary-foreground/10 rounded-md animate-pulse" />
            </div>

            {/* Main Content */}
            <div className="space-y-4 pt-4">
              <div className="h-4 w-full bg-secondary-foreground/10 rounded-md animate-pulse" />
              <div className="h-4 w-full bg-secondary-foreground/10 rounded-md animate-pulse" />
              <div className="h-4 w-full bg-secondary-foreground/10 rounded-md animate-pulse" />
              <div className="h-4 w-5/6 bg-secondary-foreground/10 rounded-md animate-pulse" />
              <div className="h-4 w-full bg-secondary-foreground/10 rounded-md animate-pulse" />
            </div>
          </div>
        </div>

        {/* Comments Skeleton */}
        <div className="mb-12">
          <div className="space-y-8">
            <div className="h-8 w-40 bg-secondary-foreground/10 rounded-md animate-pulse" />
            {/* Comment Input */}
            <div className="h-32 w-full bg-secondary-foreground/10 rounded-xl animate-pulse" />

            {/* Comment List */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 bg-secondary-foreground/10 rounded-full animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-32 bg-secondary-foreground/10 rounded-md animate-pulse" />
                    <div className="h-4 w-full bg-secondary-foreground/10 rounded-md animate-pulse" />
                    <div className="h-4 w-2/3 bg-secondary-foreground/10 rounded-md animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

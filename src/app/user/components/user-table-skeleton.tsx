export default function UserTableSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="py-4 bg-white rounded-md">
        <div className="px-4 mb-4">
          <div className="h-10 bg-gray-200 rounded-md w-full max-w-md"></div>
        </div>

        <div className="overflow-x-scroll lg:overflow-x-auto">
          <div className="min-w-full">
            <div className="bg-gray-50 border-b">
              <div className="grid grid-cols-7 gap-4 p-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-b border-gray-100">
                <div className="grid grid-cols-7 gap-4 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="flex space-x-2">
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="w-24 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

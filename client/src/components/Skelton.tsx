import { Skeleton } from "@mui/material";

export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Skeleton variant="rounded" width={80} height={20} />
          <Skeleton variant="rounded" width={60} height={16} />
        </div>
        <Skeleton variant="text" width="80%" height={28} />
        <Skeleton variant="text" width="100%" height={18} />
        <Skeleton variant="text" width="90%" height={18} />
        <div className="flex gap-2 mt-4">
          <Skeleton variant="rounded" width={50} height={20} />
          <Skeleton variant="rounded" width={40} height={20} />
        </div>
        <div className="flex items-center justify-between pt-4 border-t mt-4">
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="text" width={80} height={20} />
        </div>
      </div>
    </div>
  );
}

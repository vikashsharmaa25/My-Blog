import React from "react";
import { Skeleton, Paper, Box, Stack } from "@mui/material";

export function HeroSkeleton() {
  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3 w-full">
          <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden">
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              sx={{ borderRadius: '1rem' }}
            />
            <div className="absolute bottom-0 p-8 w-full space-y-4">
              <div className="flex items-center space-x-3">
                <Skeleton 
                  variant="rounded" 
                  width={100} 
                  height={32}
                  sx={{ borderRadius: '9999px' }}
                />
                <Skeleton variant="text" width={120} height={20} />
              </div>
              <Skeleton variant="text" width="80%" height={48} />
              <Skeleton variant="text" width="90%" height={24} />
              <Skeleton variant="text" width="85%" height={24} />
              <Skeleton variant="text" width={100} height={20} />
            </div>
          </div>
        </div>

        {/* Side Blogs Skeleton */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {[1, 2].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row h-[280px] sm:h-[265px]">
                <div className="relative sm:w-2/5 w-full h-1/2 sm:h-full">
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height="100%" 
                  />
                </div>
                <div className="flex flex-col justify-between p-6 sm:w-3/5">
                  <div className="space-y-3">
                    <Skeleton 
                      variant="rounded" 
                      width={80} 
                      height={24}
                      sx={{ borderRadius: '9999px' }}
                    />
                    <Skeleton variant="text" width="100%" height={28} />
                    <Skeleton variant="text" width="95%" height={28} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="90%" height={20} />
                  </div>
                  <div className="pt-4">
                    <Skeleton variant="text" width={120} height={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AllCategoriesSkeleton() {
  return (
    <div>
      <div className="mb-6 flex justify-between items-end">
        <div>
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={150} height={36} />
          <Skeleton variant="text" width={300} height={20} className="mt-1" />
        </div>
        <Skeleton variant="text" width={80} height={36} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'white',
            }}
          >
            <Skeleton
              variant="rectangular"
              width={84}
              height={84}
              sx={{ 
                borderRadius: 2, 
                flexShrink: 0 
              }}
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Skeleton variant="text" width="80%" height={28} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="90%" height={20} />
              <Box sx={{ mt: 1 }}>
                <Skeleton 
                  variant="rounded" 
                  width={70} 
                  height={24}
                  sx={{ borderRadius: '16px' }}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </div>

      {/* Pagination dots skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
        {[1, 2, 3].map((dot) => (
          <Skeleton
            key={dot}
            variant="circular"
            width={8}
            height={8}
          />
        ))}
      </Box>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="py-10">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={120} height={36} />
          <Skeleton variant="text" width={350} height={20} />
        </div>
        <Skeleton variant="text" width={80} height={36} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              bgcolor: 'white',
            }}
          >
            {/* Image Skeleton */}
            <Box sx={{ position: 'relative', height: 192 }}>
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height="100%" 
              />
              {/* Featured badge position */}
              <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                <Skeleton 
                  variant="rounded" 
                  width={70} 
                  height={24}
                  sx={{ borderRadius: '16px' }}
                />
              </Box>
              {/* Heart icon position */}
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <Skeleton 
                  variant="circular" 
                  width={32} 
                  height={32}
                />
              </Box>
            </Box>

            {/* Content Skeleton */}
            <Box sx={{ p: 2.5 }}>
              {/* Category and Date */}
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
                <Skeleton 
                  variant="rounded" 
                  width={80} 
                  height={24}
                  sx={{ borderRadius: '16px' }}
                />
                <Skeleton variant="text" width={90} height={20} />
              </Box>

              {/* Title */}
              <Skeleton variant="text" width="100%" height={32} />
              <Skeleton variant="text" width="85%" height={32} sx={{ mb: 1 }} />

              {/* Description */}
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="95%" height={20} />
              <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1.5 }} />

              {/* Footer Section */}
              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between" 
                pt={1.5} 
                sx={{ borderTop: '1px solid', borderColor: 'divider' }}
              >
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="text" width={50} height={20} />
                  <Skeleton variant="text" width={60} height={20} />
                </Stack>
                <Skeleton variant="text" width={90} height={32} />
              </Box>
            </Box>
          </Paper>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center items-center mt-5">
        <Skeleton variant="text" width={120} height={36} />
      </div>
    </div>
  );
}

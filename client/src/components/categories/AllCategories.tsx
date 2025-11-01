"use client";
import React from "react";
import CategoryImage from "../../../public/images/post-02.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "@/components/Swiper";
import { Button, Paper, Box, Typography, Chip } from "@mui/material";
import Link from "next/link";

function AllCategories({ categoryData }: any) {
  console.log("categoryData", categoryData)
  const breakpoints = {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-end">
        <div>
          <Typography variant="overline" color="primary" className="font-semibold">Discover</Typography>
          <Typography variant="h5" fontWeight={700} color="text.primary" className="tracking-tight">
            Categories
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-1">
            Explore curated insights, how-to guides, and trendsetting articles tailored to your interests.
          </Typography>
        </div>
        <Button variant="text">
          <Link href="/categories" className="lowercase">View all</Link>
        </Button>
      </div>

      <Swiper
        breakpoints={breakpoints}
        navigation={false}
        pagination={{ type: "bullets", clickable: true }}
        autoplay
      >
        {categoryData?.categories?.map((item: any) => (
          <SwiperSlide key={item?._id}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all .2s ease',
                bgcolor: 'white',
                '&:hover': {
                  borderColor: 'primary.light',
                  boxShadow: '0 6px 18px rgba(33, 150, 243, .12)',
                  // transform: 'translateY(-2px)'
                }
              }}
            >
              <Box sx={{ width: 84, height: 84, borderRadius: 2, overflow: 'hidden', flexShrink: 0, bgcolor: 'grey.100', border: '1px solid', borderColor: 'divider' }}>
                <Image
                  src={item?.categoryImage?.url || CategoryImage}
                  alt={item?.name || 'category'}
                  width={84}
                  height={84}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight={700} color="text.primary" noWrap>
                  {item?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item?.description}
                </Typography>
                <Box>
                  <Chip size="small" label="Explore" color="primary" variant="outlined" sx={{ fontWeight: 300 }} />
                </Box>
              </Box>
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AllCategories;

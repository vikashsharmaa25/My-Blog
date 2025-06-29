"use client";
import React from "react";
import CategoryImage from "../../../public/images/post-02.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "@/components/Swiper";
import { Button } from "@mui/material";
import Link from "next/link";

function AllCategories({ categoryData }: any) {
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
          <h1 className="text-2xl md:text-3xl font-blog text-gray-900 tracking-tight relative inline-block">
            <span className="relative z-20 font-semibold">Categories</span>
            <span className="absolute left-0 bottom-0 w-[70%] h-[2px] bg-red-500 rounded-full z-10"></span>
          </h1>
          <p className="text-gray-500 text-lg mt-1">
            Explore curated insights, how-to guides, and trendsetting articles
            tailored to your interests.
          </p>
        </div>
        <Button variant="text" className="hover-underline">
          <Link href="/blogs">View all</Link>
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
            <div className="flex items-center border border-gray-300 hover:border-red-300 rounded-xl p-2">
              <Image
                src={CategoryImage}
                alt="cat-image"
                width={100}
                height={100}
              />
              <div className="flex flex-col text-start ml-2">
                <h1 className="text-md font-semibold">{item?.name}</h1>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {item?.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AllCategories;

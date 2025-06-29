import { Swiper as SwiperCore, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { ReactNode } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SwiperProps {
  breakpoints: { [key: number]: { slidesPerView: number } };
  children: ReactNode;
  navigation?: boolean; // Optional navigation prop
  pagination?:
    | boolean
    | {
        type: "bullets" | "fraction" | "progressbar" | "custom";
        clickable?: boolean;
      }; // Optional pagination prop
  autoplay?: boolean; // Optional loop prop
}

export const Swiper = ({
  breakpoints,
  children,
  navigation = true,
  pagination = true,
  autoplay = false,
}: SwiperProps) => {
  return (
    <SwiperCore
      navigation={navigation} // Default to false
      pagination={pagination} // Default to false
      autoplay={autoplay}
      spaceBetween={10}
      modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
      breakpoints={breakpoints}
    >
      {children}
    </SwiperCore>
  );
};

export { SwiperSlide };

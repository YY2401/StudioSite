import React, { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface CarouselProps {
  sources: string[];
  controls?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ sources, controls = true }) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <Swiper
      modules={[Pagination, A11y]}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      spaceBetween={30}
      slidesPerView={1}
      // navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      loop
      className="w-full h-200"
    >
      {sources.map((src, idx) => {
        const isVideo = /\.(mp4|webm|ogg)$/i.test(src);

        return (
          <SwiperSlide key={idx} className="flex items-center justify-center">
            {isVideo ? (
              <video
                src={src}
                controls={controls}
                autoPlay
                muted
                playsInline
                className="object-cover w-full h-full"
                onEnded={() => {
                  swiperRef.current?.slideNext();
                }}
              >
                <source src={src} type="video/mp4" />
                您的瀏覽器不支援該影片。
              </video>
            ) : (
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;

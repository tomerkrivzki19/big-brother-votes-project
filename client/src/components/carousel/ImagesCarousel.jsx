import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import "swiper/css/scrollbar";

function ImagesCarousel() {
  return (
    <>
      {" "}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          {" "}
          <a href="https://13tv.co.il/tags/yuval-maatook/" target="_blank">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </a>
        </SwiperSlide>

        <SwiperSlide>
          {" "}
          <a href="https://13tv.co.il/tags/yaakov-goldhaber/" target="_blank">
            <img
              src="https://media.reshet.tv/image/upload/t_main_large/v1685470819/uploads/2023/903543593.jpg"
              alt=""
            />
          </a>
        </SwiperSlide>

        <SwiperSlide>
          {" "}
          <a href="https://13tv.co.il/tags/liel-koutzery/" target="_blank">
            <img
              src="https://media.reshet.tv/image/upload/t_main_large/v1689446264/uploads/2023/903617842.png"
              alt=""
            />
          </a>
        </SwiperSlide>

        <SwiperSlide>
          {" "}
          <a href="https://13tv.co.il/tags/snir-nisim-borgil/" target="_blank">
            <img
              src="https://media.reshet.tv/image/upload/t_main_large/v1685471796/uploads/2023/903543651.jpg"
              alt=""
            />
          </a>
        </SwiperSlide>

        <SwiperSlide>
          {" "}
          <a href="https://13tv.co.il/tags/stav-katzin/" target="_blank">
            <img
              src="https://media.reshet.tv/image/upload/t_main_large/v1685478146/uploads/2023/903544005.jpg"
              alt=""
            />
          </a>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default ImagesCarousel;

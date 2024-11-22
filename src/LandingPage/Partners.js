import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "../Partners.css";

const Partners = () => {
  const partners = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <div className="px-8 bg-gray-900 py-16">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Partnerji
      </h2>
      <Swiper
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          // Define breakpoints for responsive behavior
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className="mySwiper"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index}>
            <div className="w-32 h-32 flex items-center justify-center bg-gray-800 rounded-md shadow-2xl">
              <img
                src={partner}
                alt={`Partner ${index + 1}`}
                className="object-contain w-full h-full p-2"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Partners;

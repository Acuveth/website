import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; // Correct path
import "swiper/css"; // Base Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import story from "../assets/landingpage/story-portrait.png";
import objava from "../assets/landingpage/objave-portrait.png";
import template from "../assets/landingpage/Template.jpg";
import ponedeljek from "../assets/landingpage/Ponedeljek.jpg";
import torek from "../assets/landingpage/Torek.jpg";
import sreda from "../assets/landingpage/Sreda.jpg";
import cetrtek from "../assets/landingpage/Četrtek.jpg";
import petek from "../assets/landingpage/Petek.jpg";
import sobota from "../assets/landingpage/Sobota.jpg";

const Features = ({ id }) => {
  return (
    <div id={id} className="px-6 lg:px-16 space-y-16 bg-gray-900 py-16">
      {/* Feature 1: Objave na profilu */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={objava}
            alt="Objave na profilu"
            className="feature-img w-1/2 h-auto rounded-md shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2 md:px-8 mt-4 md:mt-0 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-4">
            Objave na profilu
          </h3>
          <p className="text-gray-400 text-lg">
            Promocija dogodkov preko naših objav.
          </p>
        </div>
      </div>

      {/* Feature 2: Storyji */}
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={story}
            alt="Storyji"
            className="feature-img w-1/2 h-auto rounded-md shadow-md 2xl:mr-32"
          />
        </div>
        <div className="w-full md:w-1/2 md:px-8 mt-4 md:mt-0 text-center md:text-right">
          <h3 className="text-2xl font-bold text-white mb-4">Storyji</h3>
          <p className="text-gray-400 text-lg">
            Prodaja kart preko naših storijev.
          </p>
        </div>
      </div>

      {/* Feature 3: Week in review objave */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <Swiper
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="w-3/4 max-w-2xl h-auto rounded-md shadow-md"
          >
            <SwiperSlide>
              <img
                src={template}
                alt="Template"
                className=" w-full h-auto rounded-md mb-4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={ponedeljek}
                alt="Ponedeljek"
                className=" w-full h-auto rounded-md mb-4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={torek}
                alt="Torek"
                className=" w-full h-auto rounded-md mb-4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sreda}
                alt="Sreda"
                className="carousel-img w-full h-auto rounded-md mb-4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={cetrtek}
                alt="Četrtek"
                className="carousel-img w-full h-auto rounded-md mb-4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={petek}
                alt="Petek"
                className=" w-full h-auto rounded-md mb-4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sobota}
                alt="Sobota"
                className=" w-full h-auto rounded-md mb-4"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-full md:w-1/2 md:px-8 mt-4 md:mt-0 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-4">
            Week in review objave
          </h3>
          <p className="text-gray-400 text-lg">
            Dodajte vaše dogodke v naš week in review.
          </p>
        </div>
      </div>

      {/* Feature 4: Promotorji */}
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Promotorji"
            className="feature-img w-full h-auto rounded-md shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2 md:px-8 mt-4 md:mt-0 text-center md:text-right">
          <h3 className="text-2xl font-bold text-white mb-4">Promotorji</h3>
          <p className="text-gray-400 text-lg">
            Promocija dogodkov preko promotorjev.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

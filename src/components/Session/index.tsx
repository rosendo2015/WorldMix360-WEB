import React from "react";
import { FiBox } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { v4 as uuidv4 } from "uuid";

interface SessionProps {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export function Session({ title, children }: SessionProps) {
  return (
    <section className="mx-auto w-full md:max-w-[1200px] bg-gradient-to-b from-gray-100 to-gray-50 p-6 shadow-md">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiBox className="text-white text-xl" />
          <h2 className="text-blue text-lg font-bold">{title}</h2>
        </div>
        <a href="##" className="text-sm font-medium text-navy hover:underline">
          Ver todos
        </a>
      </header>

      {/* Carrossel */}
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <SwiperSlide
              key={uuidv4()}
              id={uuidv4()}
              className="!flex !h-auto !items-stretch"
            >
              {child}
            </SwiperSlide>
          ) : (
            child
          ),
        )}
      </Swiper>
    </section>
  );
}

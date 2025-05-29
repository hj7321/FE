import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Keyboard,
  Scrollbar,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import PlaceCard from "../card/PlaceCard";

const Slider = () => {
  return (
    <>
      <div className="custom-prev absolute left-[60px] top-[100px] -translate-y-1/2 z-10 cursor-pointer">
        <img src="/images/prev-arrow.svg" alt="prev" />
      </div>
      <div className="custom-next absolute right-[70px] top-[100px] -translate-y-1/2 z-10 cursor-pointer">
        <img src="/images/next-arrow.svg" alt="next" />
      </div>
      <Swiper
        slidesPerView={5} // 한 번에 5개 보여줌
        slidesPerGroup={5} // 5개 단위로 넘김
        centeredSlides={false} // 가운데 정렬
        loop={true} // 무한 루프
        grabCursor={true}
        speed={1000} // 슬라이드 넘어갈 때 1초 걸림
        keyboard={{
          enabled: true,
        }}
        scrollbar={true}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000, // 5초마다 자동 이동 (ms 단위)
          disableOnInteraction: false, // 사용자 터치/드래그 후에도 계속 자동 전환 유지
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]}
        className="mySwiper !pb-[40px]"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <SwiperSlide key={index}>
            <PlaceCard
              cardImg="/images/cities/서울.webp"
              cardName={`경복궁${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;

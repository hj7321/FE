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
import { useQuery } from "@tanstack/react-query";
import { readPopularPlace } from "../../apis/place.api";
import { Places } from "../../types/place.type";

interface SliderProps {
  countryName: string;
  regionName: string;
}

const Slider = ({ countryName, regionName }: SliderProps) => {
  const { data: places } = useQuery<Places[], Error>({
    queryKey: ["readPopularPlace", countryName, regionName],
    queryFn: () => readPopularPlace({ countryName, regionName }),
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    refetchInterval: 10 * 60 * 1000, // 10분마다 자동 refetch (배경 refetch 포함)
  });

  console.log(places);

  return (
    <>
      <div className="custom-prev absolute left-[60px] top-[100px] -translate-y-1/2 z-10 cursor-pointer">
        <img src="/images/prev-arrow.svg" alt="prev" />
      </div>
      <div className="custom-next absolute right-[70px] top-[100px] -translate-y-1/2 z-10 cursor-pointer">
        <img src="/images/next-arrow.svg" alt="next" />
      </div>
      <Swiper
        key={places?.length || 0} // ← 슬라이드 수가 바뀌면 강제 재렌더링
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
        {places &&
          places.map((place) => (
            <SwiperSlide key={place.placeId}>
              <PlaceCard
                cardImg={place.photoUrl ?? "/images/default.png"}
                cardName={place.placeName}
                placeId={place.placeId}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Slider;

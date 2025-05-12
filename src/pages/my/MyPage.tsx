import { Link } from "react-router";
import RecentPlaceCard from "../../components/card/RecentPlaceCard";
import TravelPlanCard from "../../components/card/TravelPlanCard";

const MyPage = () => {
  return (
    <div className="px-[100px] py-[10px] flex flex-col gap-[40px]">
      <section className="flex flex-col">
        <div className="flex justify-between items-end">
          <h1 className="font-bold text-[22px]">여행 기록 ✈️</h1>
          <Link
            to="/travel-history"
            className="text-[12px] text-[#a6a6a6] mr-[3px]"
          >
            더보기
          </Link>
        </div>
        <div className="mt-[7px] flex flex-wrap gap-x-[20px] gap-y-[15px]">
          <TravelPlanCard
            cardImg="/images/cities/나폴리.jpg"
            travelTitle="황금연휴에 가는 해외여행😊"
            travelStartDate="2025.05.01"
            travelEndDate="2025.05.07"
            travelPeople={8}
            travelPlace="스페인 바르셀로나"
            isEnded={false}
          />
          <TravelPlanCard
            cardImg="/images/cities/바르셀로나.jpg"
            travelTitle="황금연휴에 가는 해외여행😊"
            travelStartDate="2025.05.01"
            travelEndDate="2025.05.07"
            travelPeople={8}
            travelPlace="스페인 바르셀로나"
            isEnded={true}
          />
          <TravelPlanCard
            cardImg="/images/cities/바르셀로나.jpg"
            travelTitle="황금연휴에 가는 해외여행😊"
            travelStartDate="2025.05.01"
            travelEndDate="2025.05.07"
            travelPeople={8}
            travelPlace="스페인 바르셀로나"
            isEnded={false}
          />
          <TravelPlanCard
            cardImg="/images/cities/바르셀로나.jpg"
            travelTitle="황금연휴에 가는 해외여행😊"
            travelStartDate="2025.05.01"
            travelEndDate="2025.05.07"
            travelPeople={8}
            travelPlace="스페인 바르셀로나"
            isEnded={true}
          />
        </div>
      </section>
      <section className="flex flex-col">
        <div className="flex justify-between items-end">
          <h1 className="font-bold text-[22px]">최근에 본 장소📍</h1>
          <Link
            to="/recently-viewed-places"
            className="text-[12px] text-[#a6a6a6] mr-[3px]"
          >
            더보기
          </Link>
        </div>
        <div className="mt-[7px] flex flex-wrap gap-x-[20px] gap-y-[30px]">
          <RecentPlaceCard
            cardImg="/images/default.png"
            countryName="이탈리아 로마"
            placeName="성 베드로 대성당"
          />
          <RecentPlaceCard
            cardImg="/images/default.png"
            countryName="이탈리아 로마"
            placeName="성 베드로 대성당"
          />
          <RecentPlaceCard
            cardImg="/images/default.png"
            countryName="이탈리아 로마"
            placeName="성 베드로 대성당"
          />
          <RecentPlaceCard
            cardImg="/images/default.png"
            countryName="이탈리아 로마"
            placeName="성 베드로 대성당"
          />
          <RecentPlaceCard
            cardImg="/images/default.png"
            countryName="이탈리아 로마"
            placeName="성 베드로 대성당"
          />
        </div>
      </section>
    </div>
  );
};

export default MyPage;

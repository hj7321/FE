import RecentPlaceCard from "../../components/card/RecentPlaceCard";

const RecentlyViewedPlacesPage = () => {
  return (
    <div className="px-[100px] py-[10px] flex flex-col">
      <h1 className="font-bold text-[22px]">최근에 본 장소📍</h1>
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
    </div>
  );
};

export default RecentlyViewedPlacesPage;

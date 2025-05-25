import TypeButton from "../button/TypeButton";
import TravelPlaceCard from "../card/TravelPlaceCard";

const PlaceListScreen = () => {
  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="w-full h-fit px-[20px] py-[12px] flex flex-col gap-[8px]">
        <div className="flex justify-between w-full rounded-[6px] bg-[#f2f2f2] py-[10px] px-[15px]">
          <input
            type="text"
            placeholder="장소를 검색하세요."
            className="placeholder:text-[12px] text-[14px] outline-none w-[280px]"
          />
          <img
            src="/images/search.svg"
            alt="search"
            className="text-[10px] w-[18px]"
          />
        </div>
        <div className="flex gap-[8px]">
          <TypeButton buttonName="전체보기" />
          <TypeButton buttonName="명소" />
          <TypeButton buttonName="맛집" />
          <TypeButton buttonName="호텔" />
        </div>
      </div>
      <div className="pr-[15px]">
        <div className="flex flex-wrap w-[370px] h-[596px] pb-[15px] pl-[20px] pr-[15px] justify-between gap-y-[15px] bg-white overflow-y-auto scrollbar-custom">
          <TravelPlaceCard
            cardName="트레비 분수"
            cardImg="./images/트레비 분수.jpg"
            isFavorite={true}
          />
          <TravelPlaceCard
            cardName="트레비 분수"
            cardImg="./images/트레비 분수.jpg"
            isFavorite={true}
          />
          <TravelPlaceCard
            cardName="트레비 분수"
            cardImg="./images/트레비 분수.jpg"
            isFavorite={true}
          />
          <TravelPlaceCard
            cardName="트레비 분수"
            cardImg="./images/트레비 분수.jpg"
            isFavorite={true}
          />
          <TravelPlaceCard
            cardName="트레비 분수"
            cardImg="./images/트레비 분수.jpg"
            isFavorite={true}
          />
          <TravelPlaceCard
            cardName="트레비 분수"
            cardImg="./images/트레비 분수.jpg"
            isFavorite={false}
          />
          <TravelPlaceCard
            cardName="트레비 분수"
            cardImg="./images/트레비 분수.jpg"
            isFavorite={false}
          />
          <TravelPlaceCard
            cardName="트레비 분수"
            cardImg="./images/트레비 분수.jpg"
            isFavorite={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaceListScreen;

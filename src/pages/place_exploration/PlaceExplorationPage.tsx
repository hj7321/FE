import { useParams } from "react-router";
import FavoritePlaceListButton from "../../components/button/FavoritePlaceListButton";
import PlaceCard from "../../components/card/PlaceCard";
import SearchBar from "../../components/SearchBar";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import { useEffect, useRef } from "react";
import Slider from "../../components/slider/Slider";

const PlaceExplorationPage = () => {
  const { place } = useParams();
  const country = place?.split(" ")[0];
  const { resetFavoriteList } = useFavoriteListStore();
  const currentPathRef = useRef(location.pathname);

  useEffect(() => {
    return () => {
      if (location.pathname !== currentPathRef.current) resetFavoriteList();
    };
  }, [location.pathname, resetFavoriteList]);

  return (
    <div className="px-[100px] py-[10px]">
      <section className="flex gap-[8px] items-center">
        <img
          src={`/images/flags/${country}.svg`}
          alt={country}
          className="text-[10px] rounded-[6px] aspect-[3/2] h-[35px]"
        />
        <h1 className="font-extrabold text-[25px]">{place}</h1>
      </section>
      <section className="my-[12px]">
        <h1 className="text-[22px] font-bold">인기 장소 TOP 20</h1>
        <div>
          <Slider />
        </div>
      </section>
      <section className="flex flex-col gap-[25px]">
        <div className="flex flex-col gap-[8px] items-center">
          <p className="font-bold text-[25px] text-center">장소 찾기</p>
          <SearchBar placeholder={`${country} 내 장소를`} placeExploration />
        </div>
        <div className="py-[20px] flex flex-wrap gap-x-[20px] gap-y-[30px]">
          <PlaceCard cardImg="/images/cities/서울.jpg" cardName="경복궁" />
          <PlaceCard cardImg="/images/cities/서울.jpg" cardName="경복궁" />
          <PlaceCard cardImg="/images/cities/서울.jpg" cardName="경복궁" />
          <PlaceCard cardImg="/images/default.png" cardName="텍스트" />
        </div>
      </section>
      <FavoritePlaceListButton />
    </div>
  );
};

export default PlaceExplorationPage;

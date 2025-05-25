import { useParams } from "react-router";
import FavoritePlaceListButton from "../../components/button/FavoritePlaceListButton";
import PlaceCard from "../../components/card/PlaceCard";
import SearchBar from "../../components/SearchBar";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import { useEffect, useRef, useState } from "react";
import Slider from "../../components/slider/Slider";

const PlaceExplorationPage = () => {
  const { place } = useParams();
  const country = place?.split(" ")[0];
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const { resetFavoriteList } = useFavoriteListStore();
  const currentPathRef = useRef(location.pathname);

  console.log(searchResult);

  useEffect(() => {
    const trimmedInput = inputValue?.trim();
    if (!trimmedInput) {
      setSearchResult([]);
      return;
    }

    const matched: string[] = [];

    ["경복궁, 경복궁, 경복궁, 텍스트"].forEach((name) => {
      if (name.includes(trimmedInput)) matched.push(name);
    });

    // 조합 중일 때 결과가 없으면, 이전 결과 유지 (검색결과 업데이트 안 함)
    if (isComposing && matched.length === 0) return;

    // 조합 중이 아니거나, 결과가 있을 경우 갱신
    setSearchResult(matched);
  }, [inputValue]);

  useEffect(() => {
    return () => {
      if (location.pathname !== currentPathRef.current) resetFavoriteList();
    };
  }, [location.pathname, resetFavoriteList]);

  return (
    <>
      <section className="px-[100px] pt-[15px] flex gap-[8px] items-center">
        <img
          src={`/images/flags/${country}.svg`}
          alt={country}
          className="text-[10px] rounded-[6px] aspect-[3/2] h-[35px]"
        />
        <h1 className="font-extrabold text-[25px]">{place}</h1>
      </section>
      <section className="my-[15px]">
        <h1 className="text-[22px] font-bold px-[100px] mb-[5px]">
          인기 장소 TOP 20
        </h1>
        <div className="relative px-[100px] overflow-visible">
          <Slider />
        </div>
      </section>
      <section className="flex flex-col gap-[25px] px-[100px]">
        <div className="flex flex-col gap-[8px] items-center my-[10px]">
          <p className="font-bold text-[25px] text-center">장소 찾기</p>
          <SearchBar
            placeholder={`${country} 내 장소를`}
            placeExploration
            inputValue={inputValue}
            setInputValue={setInputValue}
            setIsComposing={setIsComposing}
          />
        </div>
        <div className="py-[20px] flex flex-wrap gap-x-[20px] gap-y-[30px]">
          <PlaceCard cardImg="/images/cities/서울.jpg" cardName="경복궁" />
          <PlaceCard cardImg="/images/cities/서울.jpg" cardName="경복궁" />
          <PlaceCard cardImg="/images/cities/서울.jpg" cardName="경복궁" />
          <PlaceCard cardImg="/images/default.png" cardName="텍스트" />
        </div>
      </section>
      <FavoritePlaceListButton />
    </>
  );
};

export default PlaceExplorationPage;

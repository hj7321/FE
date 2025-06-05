import { useParams } from "react-router";
import FavoritePlaceListButton from "../../components/button/FavoritePlaceListButton";
import PlaceCard from "../../components/card/PlaceCard";
import SearchBar from "../../components/SearchBar";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { readPlaceList } from "../../apis/place.api";
import { useInView } from "react-intersection-observer";
import { readBasket } from "../../apis/basket.api";
import {
  InsertBasketDataType,
  Place,
  Places,
  ReadPlaceListResponse,
} from "../../types/place.type";

const PlaceExplorationPage = () => {
  const { place } = useParams();
  const [countryName, regionName] = place!.split(" ");
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  // const currentPathRef = useRef(location.pathname);
  console.log(searchResult);

  const addOldFavoriteList = useFavoriteListStore(
    (state) => state.addOldFavoriteList
  );

  const { data: basketData } = useQuery<
    InsertBasketDataType,
    Error,
    Place[],
    string[]
  >({
    queryKey: ["readBasket", countryName, regionName],
    queryFn: () => readBasket({ countryName, regionName }),
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    enabled: !!countryName && !!regionName,
    retry: 2,
    select: (data) => data.places,
  });

  console.log(basketData);

  const {
    data: places,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    ReadPlaceListResponse,
    Error,
    Places[],
    string[],
    string | null
  >({
    queryKey: ["readPlaceList", countryName, regionName],
    queryFn: ({ pageParam = null }) =>
      readPlaceList({
        countryName,
        regionName,
        pageToken: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.pageToken,
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    refetchInterval: 10 * 60 * 1000, // 10분마다 자동 refetch (배경 refetch 포함)
    enabled: !!countryName && !!regionName,
    retry: 2,
    select: ({ pages }) => pages.flatMap((page) => page.places),
  });
  // 1. queryFn() 함수는 서버에서 데이터를 요청하고 그 데이터를 useInfiniteQuery에 전달함
  // 2. queryFn() 함수의 리턴값은 getNextPageParam의 lastPage로 전달됨
  // 3. getNextPageParam() 함수는 lastPage의 데이터를 기반으로 다음 페이지를 요청할 pageParam을 계산함
  // 4. getNextPageParam() 함수의 리턴값은 fetchNextPage() 함수가 다음 페이지를 요청할 때 pageParam으로 전달됨
  // 5. fetchNextPage() 함수는 이 값을 다시 queryFn에 전달하여 새로운 데이터를 가져옴

  console.log(places);

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  useEffect(() => {
    if (basketData) {
      basketData.forEach((data) => addOldFavoriteList(regionName, data));
    }
  }, [basketData, regionName, addOldFavoriteList]);

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

  // useEffect(() => {
  //   return () => {
  //     if (location.pathname !== currentPathRef.current) resetFavoriteList();
  //   };
  // }, [location.pathname, resetFavoriteList]);

  return (
    <>
      <section className="px-[100px] pt-[15px] flex gap-[8px] items-center">
        <img
          src={`/images/flags/${countryName}.svg`}
          alt={countryName}
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
            placeholder={`${countryName} 내 장소를`}
            placeExploration
            inputValue={inputValue}
            setInputValue={setInputValue}
            setIsComposing={setIsComposing}
          />
        </div>
        <div className="py-[20px] grid grid-cols-[repeat(auto-fit,_minmax(247.8px,_auto))] justify-center gap-x-[20px] gap-y-[30px]">
          {places &&
            places.map((place) => (
              <PlaceCard
                key={place.placeId}
                cardImg={place.photo ?? "/images/default.png"}
                cardName={place.placeName}
                placeId={place.placeId}
                regionName={regionName}
              />
            ))}
          {hasNextPage && <div ref={ref}></div>}
        </div>
      </section>
      <FavoritePlaceListButton regionName={regionName} />
    </>
  );
};

export default PlaceExplorationPage;

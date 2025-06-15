import TypeButton from "../button/TypeButton";
import TravelPlaceCard from "../card/TravelPlaceCard";
import useReadBasket from "../../hooks/useReadBasket";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import { useEffect, useRef, useState } from "react";
import useLatLng from "../../hooks/useLatLng";
import useSearchNearby from "../../hooks/useSearchNearby";
import useSearchText from "../../hooks/useSearchText";
import useSearchType from "../../hooks/useSearchType";
import { TravelPlanButton } from "../../types/button.type";
import { getLatLngByAddress } from "../../apis/geocoding.api";
import { useMapStore } from "../../stores/map.store";
import { debounce } from "lodash";

const travelPlanButtonList: TravelPlanButton[] = [
  "전체보기",
  "관광",
  "맛집",
  "숙소",
];

const PlaceListScreen = () => {
  const [clickedButton, setClickedButton] =
    useState<TravelPlanButton>("전체보기");
  const [isSearchButtonClicked, setIsSearchButtonClicked] =
    useState<boolean>(false);
  const [lastNearbyRequestTime, setLastNearbyRequestTime] = useState<
    number | null
  >(null);
  const [nearbyRequested, setNearbyRequested] = useState<boolean>(false);
  const textSearchInputRef = useRef<HTMLInputElement>(null);
  const [textSearchValue, setTextSearchValue] = useState<string>("");
  // const [latLng, setLatLng] = useState<LatLng>({ latitude: 0, longitude: 0 });
  const countryName = useFavoriteListStore((state) => state.countryName);
  const regionName = useFavoriteListStore((state) => state.regionName);
  const { lat, lng } = useMapStore((state) => state.center);

  const basketPlaces = useReadBasket(countryName!, regionName!);

  const address = basketPlaces?.[0]?.address;
  const { data: location } = useLatLng(address ?? "");
  const {
    data: nearbyPlaces,
    fetchNextPage: nearbyFetchNextPage,
    hasNextPage: nearbyHasNextPage,
    isFetchingNextPage: nearbyIsFetchingNextPage,
  } = useSearchNearby(location?.lat ?? 0, location?.lng ?? 0, {
    enabled: nearbyRequested,
  });

  const {
    data: textPlaces,
    fetchNextPage: textFetchNextPage,
    hasNextPage: textHasNextPage,
    isFetchingNextPage: textIsFetchingNextPage,
  } = useSearchText(textSearchValue, lat, lng, {
    enabled: isSearchButtonClicked && lat !== 0 && lng !== 0,
  });

  const {
    data: typePlaces,
    fetchNextPage: typeFetchNextPage,
    hasNextPage: typeHasNextPage,
    isFetchingNextPage: typeIsFetchingNextPage,
  } = useSearchType(clickedButton, lat, lng, {
    enabled: clickedButton !== "전체보기" && lat !== 0 && lng !== 0,
  });

  const handleSearchText = () => {
    const keyword = textSearchInputRef.current?.value.trim() ?? "";

    // 빈 문자열이면 초기화로 간주
    if (keyword === "") {
      setTextSearchValue("");
      setIsSearchButtonClicked(false);
      return;
    }

    setClickedButton("전체보기");
    setTextSearchValue(keyword);
    setIsSearchButtonClicked(true);
  };

  // debounce 된 함수 useRef로 저장 (리렌더 시 재생성 방지)
  const debouncedHandleSearchText = useRef(
    debounce(handleSearchText, 1000) // 1000ms(1초) 이내에 다시 클릭되면 무시
  ).current;

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setTextSearchValue("");
      setIsSearchButtonClicked(false); // 쿼리 재실행 방지
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchText();
    }
  };

  // 중복 제거된 nearbyPlaces 생성
  const filteredNearbyPlaces = (nearbyPlaces ?? []).filter(
    (np) => !basketPlaces?.some((bp) => bp.placeId === np.placeId)
  );

  // 전체보기일 경우: 장바구니 + nearby + 텍스트 검색 결과 (중복 제거된 nearby)
  const placesToRender =
    clickedButton === "전체보기"
      ? textSearchValue === ""
        ? [...(basketPlaces ?? []), ...filteredNearbyPlaces]
        : textPlaces ?? []
      : typePlaces ?? [];

  // 언마운트 시 debounce 타이머 정리
  useEffect(() => {
    return () => {
      debouncedHandleSearchText.cancel();
    };
  }, []);

  useEffect(() => {
    const fetchAndSetMapCenter = async () => {
      const firstPlace = basketPlaces?.[0];
      if (!firstPlace?.address) return;

      try {
        const geoData = await getLatLngByAddress(firstPlace.address);
        if (geoData.status === "OK" && geoData.results.length > 0) {
          const { lat, lng } = geoData.results[0].geometry.location;
          useMapStore.getState().setCenter(lat, lng, firstPlace.placeName);
        }
      } catch (error) {
        console.error("지도 중심 좌표 설정 실패:", error);
      }
    };

    fetchAndSetMapCenter();
  }, [basketPlaces]);

  useEffect(() => {
    const now = Date.now();

    const canRequestNearby =
      !nearbyRequested ||
      !lastNearbyRequestTime ||
      now - lastNearbyRequestTime >= 2 * 60 * 1000;

    if (location?.lat && location?.lng && canRequestNearby) {
      setNearbyRequested(true);
      setLastNearbyRequestTime(now);
    }
  }, [location]);

  useEffect(() => {
    if (!nearbyIsFetchingNextPage && nearbyHasNextPage) {
      nearbyFetchNextPage();
    }
  }, [nearbyIsFetchingNextPage, nearbyHasNextPage]);

  useEffect(() => {
    if (!textIsFetchingNextPage && textHasNextPage) {
      textFetchNextPage();
    }
  }, [textIsFetchingNextPage, textHasNextPage]);

  useEffect(() => {
    if (!typeIsFetchingNextPage && typeHasNextPage) {
      typeFetchNextPage();
    }
  }, [typeIsFetchingNextPage, typeHasNextPage]);

  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="w-full px-[20px] py-[12px] flex flex-col gap-[8px]">
        <div className="flex justify-between w-full rounded-[6px] bg-[#f2f2f2] py-[10px] px-[15px]">
          <input
            type="text"
            ref={textSearchInputRef}
            onChange={handleChangeValue}
            onKeyDown={handleKeyDown}
            placeholder="장소를 검색하세요."
            className="placeholder:text-[12px] text-[14px] outline-none w-[280px]"
          />
          <img
            src="/images/search.svg"
            alt="search"
            className="text-[10px] w-[18px] hover:cursor-pointer"
            onClick={debouncedHandleSearchText}
          />
        </div>
        <div className="flex gap-[8px]">
          {travelPlanButtonList.map((button) => (
            <TypeButton
              key={button}
              buttonName={button}
              isSelected={clickedButton === button}
              onClicked={() => setClickedButton(button)}
            />
          ))}
        </div>
      </div>
      <div className="pr-[15px]">
        <div className="flex flex-wrap w-[370px] h-[calc(100vh-100px)] pb-[15px] pl-[20px] pr-[15px] justify-between gap-y-[15px] overflow-y-auto scrollbar-custom">
          {placesToRender.map((place) => (
            <TravelPlaceCard
              key={place.placeId}
              cardName={place.placeName}
              cardImg={place.photoUrl ?? "/images/default.png"}
              isFavorite={
                clickedButton === "전체보기" &&
                basketPlaces?.some((bp) => bp.placeId === place.placeId)
              }
              placeId={place.placeId}
              placeType={place.placeType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceListScreen;

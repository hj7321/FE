import TypeButton from "../button/TypeButton";
import TravelPlaceCard from "../card/TravelPlaceCard";
import useReadBasket from "../../hooks/useReadBasket";
import { useFavoriteListStore } from "../../stores/favoriteList.store";

const PlaceListScreen = () => {
  // const [inputValue, setInputValue] = useState<string | null>(null);
  // const [searchValue, setSearchValue] = useState<string>("");
  const countryName = useFavoriteListStore((state) => state.countryName);
  const regionName = useFavoriteListStore((state) => state.regionName);

  const basketData = useReadBasket(countryName!, regionName!);
  console.log("basketData: ", basketData);

  // const {
  //   data: textData,
  //   // refetch: textRefetch,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["searchText", searchValue],
  //   queryFn: ({ pageParam = null }) =>
  //     searchText({
  //       text: searchValue,
  //       latitude,
  //       longitude,
  //       pageToken: pageParam,
  //     }),
  //   initialPageParam: null,
  //   getNextPageParam: (lastPage) => lastPage.pageToken,
  //   staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
  //   gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
  //   refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
  //   refetchInterval: 10 * 60 * 1000, // 10분마다 자동 refetch (배경 refetch 포함)
  //   enabled: false,
  //   retry: 2,
  // });

  // const {
  //   data: typeData,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["searchType", searchValue],
  //   queryFn: ({ pageParam = null }) =>
  //     searchType({
  //       type: searchValue,
  //       latitude,
  //       longitude,
  //       pageToken: pageParam,
  //     }),
  //   initialPageParam: null,
  //   getNextPageParam: (lastPage) => lastPage.pageToken,
  //   staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
  //   gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
  //   refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
  //   refetchInterval: 10 * 60 * 1000, // 10분마다 자동 refetch (배경 refetch 포함)
  //   enabled: false,
  //   retry: 2,
  // });

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
          <TypeButton buttonName="관광" />
          <TypeButton buttonName="맛집" />
          <TypeButton buttonName="숙소" />
        </div>
      </div>
      <div className="pr-[15px]">
        <div className="flex flex-wrap w-[370px] h-[596px] pb-[15px] pl-[20px] pr-[15px] justify-between gap-y-[15px] bg-white overflow-y-auto scrollbar-custom">
          {Array.from({ length: 5 }).map((_, index) => (
            <TravelPlaceCard
              cardName={`트레비 분수 ${index + 1}`}
              cardImg="./images/트레비 분수.webp"
              isFavorite={true}
              placeId={index.toString()}
            />
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <TravelPlaceCard
              cardName={`트레비 분수 ${index + 6}`}
              cardImg="./images/트레비 분수.webp"
              isFavorite={false}
              placeId={(index + 5).toString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceListScreen;

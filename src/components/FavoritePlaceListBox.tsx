import { useNavigate } from "react-router";
import FavoriteCard from "./card/FavoriteCard";
import { Place } from "../types/place.type";
import { useFavoriteListStore } from "../stores/favoriteList.store";
import useBasketMutations from "../hooks/useBasketMutations";
import { useQueryClient } from "@tanstack/react-query";

interface FavoritePlaceListBoxProps {
  oldFavoriteList: Place[];
  newFavoriteList: Place[];
}

const FavoritePlaceListBox = ({
  oldFavoriteList,
  newFavoriteList,
}: FavoritePlaceListBoxProps) => {
  const queryClient = useQueryClient();

  console.log(oldFavoriteList);
  console.log(newFavoriteList);
  const favoriteList = [...oldFavoriteList, ...newFavoriteList];
  const addList = useFavoriteListStore((state) => state.addList);
  const deleteList = useFavoriteListStore((state) => state.deleteList);
  const resetAllList = useFavoriteListStore((state) => state.resetAllList);
  const countryName = useFavoriteListStore((state) => state.countryName);
  const regionName = useFavoriteListStore((state) => state.regionName);
  const { insertBasketDataMutateAsync, deleteBasketDataMutateAsync } =
    useBasketMutations(countryName!, regionName!);

  const navigate = useNavigate();

  const handlePlanTravel = async () => {
    if (favoriteList.length === 0) return alert("장소를 하나 이상 담아주세요.");
    if (addList.length > 0 && countryName && regionName) {
      try {
        await insertBasketDataMutateAsync({
          countryName,
          regionName,
          places: addList,
        });
      } catch (e) {
        console.error("🛑 장바구니 추가 실패", e);
        return;
      }
    }

    if (deleteList.length > 0 && countryName && regionName) {
      try {
        for (const list of deleteList) {
          await deleteBasketDataMutateAsync({
            countryName,
            regionName,
            placeId: [list.placeId],
          });
        }
      } catch (e) {
        console.error("❌ 장바구니 삭제 중 에러 발생:", e);
      }
    }

    // ✅ 캐시 비우기 (새로고침 없이 최신 데이터 받기)

    await queryClient.invalidateQueries({
      queryKey: ["readBasket", countryName!, regionName!],
    });

    resetAllList();
    navigate("/travel-plan");
  };

  return (
    <div className="scrollbar-partial-rounded fixed bottom-[90px] right-[85px] z-[1000]">
      <div className="flex flex-wrap justify-between gap-y-[20px] rounded-t-[10px] bg-white px-[20px] py-[15px] pb-[20px] w-[380px] max-h-[530px] [box-shadow:0px_0px_20px_rgba(0,0,0,0.6)] overflow-y-auto scrollbar-custom">
        {oldFavoriteList.map((item) => (
          <FavoriteCard
            key={`${item.placeName} ${item.placeId}`}
            cardImg={item.photoUrl ?? "/images/default.png"}
            cardName={item.placeName}
            placeId={item.placeId}
            isNew={false}
          />
        ))}
        {newFavoriteList.map((item) => (
          <FavoriteCard
            key={`${item.placeName} ${item.placeId}`}
            cardImg={item.photoUrl ?? "/images/default.png"}
            cardName={item.placeName}
            placeId={item.placeId}
            isNew={true}
          />
        ))}
      </div>
      <div
        style={{
          boxShadow: `4px 0px 20px rgba(0, 0, 0, 0.25),
          0px 5px 20px rgba(0, 0, 0, 0.3)`,
        }}
        className="rounded-b-[10px] h-[60px] w-[380px] bg-white z-50 flex justify-center items-center"
      >
        <button
          onClick={handlePlanTravel}
          className="w-[180px] h-[37px] flex justify-center items-center text-[14px] text-white bg-common rounded-[6px] hover:cursor-pointer hover:bg-selected"
        >
          여행 계획하기
        </button>
      </div>
    </div>
  );
};

export default FavoritePlaceListBox;

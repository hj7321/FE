import { useNavigate } from "react-router";
import FavoriteCard from "./card/FavoriteCard";
import { useFavoriteListStore } from "../stores/favoriteList.store";

const FavoritePlaceListBox = () => {
  const favoriteList = useFavoriteListStore((state) => state.favoriteList);
  const navigate = useNavigate();

  const handlePlanTravel = () => {
    if (favoriteList.length === 0) return alert("장소를 하나 이상 담아주세요.");
    navigate("/travel-plan");
  };

  return (
    <div className="scrollbar-partial-rounded fixed bottom-[90px] right-[85px] z-[1000]">
      <div className="flex flex-wrap justify-between gap-y-[20px] rounded-t-[10px] bg-white px-[20px] py-[15px] pb-[20px] w-[380px] max-h-[530px] [box-shadow:0px_0px_20px_rgba(0,0,0,0.6)] overflow-y-auto scrollbar-custom">
        {favoriteList.map((item) => (
          <FavoriteCard
            key={`${item.placeName} ${item.placeImg}`}
            cardImg={item.placeImg}
            cardName={item.placeName}
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

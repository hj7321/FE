import { useState } from "react";
import FavoritePlaceListBox from "../FavoritePlaceListBox";
import clsx from "clsx";
import { useFavoriteListStore } from "../../stores/favoriteList.store";

const FavoritePlaceListButton = () => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const { favoriteList } = useFavoriteListStore();

  return (
    <div>
      {showBox && <FavoritePlaceListBox />}
      <button
        className="fixed bottom-[80px] right-[10px]"
        onClick={() => setShowBox(!showBox)}
      >
        <div className="relative">
          <div
            className={clsx(
              "h-[20px] w-[20px] rounded-full bg-[#ff444c] text-white flex justify-center items-center absolute top-[1px] right-[2px] font-bold [box-shadow:1.5px_1.5px_1px_rgba(0,0,0,0.8)]",
              favoriteList.length >= 10 ? "text-[13px]" : "text-[15px]"
            )}
          >
            {favoriteList.length}
          </div>
        </div>
        <img
          src="/images/favorite-list-button.svg"
          alt="favorite"
          className="h-[70px] aspect-square hover:cursor-pointer text-[12px]"
        />
      </button>
    </div>
  );
};

export default FavoritePlaceListButton;

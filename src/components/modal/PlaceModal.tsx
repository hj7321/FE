import clsx from "clsx";
import PlaceInfo from "../information/PlaceInfo";
import { useModalStore } from "../../stores/modal.store";
import { useFavoriteListStore } from "../../stores/favoriteList.store";

interface PlaceModalProps {
  cardName: string;
  cardImg: string;
  isNeededButton?: boolean;
}

const PlaceModal = ({ cardName, cardImg, isNeededButton }: PlaceModalProps) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const addFavoriteList = useFavoriteListStore(
    (state) => state.addFavoriteList
  );

  const handleAddFavoriteList = () => {
    addFavoriteList(cardName, cardImg);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex gap-[10px] p-[20px] bg-white rounded-[8px] w-2/3 h-[560px] [box-shadow:4px_4px_20px_rgba(0,0,0,0.25)] relative"
    >
      <button onClick={closeModal} className="absolute right-[12px] top-[12px]">
        <img
          src="/images/close.svg"
          alt="close"
          className="text-[10px] h-[14px] hover:cursor-pointer"
        />
      </button>
      <div className="flex flex-col gap-[15px] w-3/5">
        <div className="flex flex-col">
          <div className="flex gap-[10px] items-center">
            <h1 className="font-bold text-[30px]">{cardName}</h1>
            <div className="flex gap-[3px] rounded-[50px] text-white bg-[#c9c9c9] px-[10px] py-[5px] items-center">
              <img
                src="/images/white-attraction.svg"
                alt="attraction"
                className="text-[10px] h-[12px]"
              />
              <p className="text-[12px]">명소</p>
            </div>
          </div>
          <div className="flex gap-[5px] items-center">
            <img
              src="/images/marker.svg"
              alt="marker"
              className="text-[10px] h-[15px]"
            />
            <p className="text-[#A7A7A7] text-[14px]">
              서울특별시 종로구 사직로 161(세종로)
            </p>
          </div>
        </div>
        <PlaceInfo />
      </div>
      <div className="flex flex-col justify-end w-1/2 gap-[15px]">
        <img
          src={cardImg}
          alt={cardName}
          className={clsx(
            "text-[14px] w-full object-cover",
            isNeededButton ? "h-[380px]" : "h-[435px]"
          )}
        />
        {isNeededButton && (
          <button
            onClick={handleAddFavoriteList}
            className="w-full text-center rounded-[4px] text-white bg-common py-[10px] px-[15px] text-[14px] hover:bg-selected hover:cursor-pointer"
          >
            장바구니에 명소 담기
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaceModal;

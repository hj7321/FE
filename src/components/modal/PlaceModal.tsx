import clsx from "clsx";
import PlaceInfo from "../information/PlaceInfo";
import { useModalStore } from "../../stores/modal.store";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import { ReadPlaceDetailResponse } from "../../types/place.type";

interface PlaceModalProps {
  cardName: string;
  cardImg: string;
  placeData: ReadPlaceDetailResponse;
  regionName: string;
  isNeededButton?: boolean;
}

const PlaceModal = ({
  cardName,
  cardImg,
  placeData,
  regionName,
  isNeededButton,
}: PlaceModalProps) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const addNewFavoriteList = useFavoriteListStore(
    (state) => state.addNewFavoriteList
  );
  const updateAddList = useFavoriteListStore((state) => state.updateAddList);

  console.log(placeData);

  const handleAddFavoriteList = () => {
    if (!placeData) return;

    addNewFavoriteList(regionName, {
      placeId: placeData.placeId,
      placeName: placeData.name,
      placeType: placeData.placeType,
      address: placeData.address,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
    });
    closeModal();
    updateAddList({
      placeId: placeData.placeId,
      placeName: placeData.name,
      placeType: placeData.placeType,
      address: placeData.address,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
    });
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
            <h1 className="font-bold text-[30px]">{placeData.name}</h1>
            {placeData.placeType && placeData.placeType !== "ETC" && (
              <div className="flex gap-[3px] rounded-[50px] text-white bg-[#c9c9c9] px-[10px] py-[5px] items-center">
                {placeData.placeType === "ATTRACTION" && (
                  <>
                    <img
                      src="/images/white-attraction.svg"
                      alt="attraction"
                      className="text-[10px] h-[12px]"
                    />
                    <p className="text-[12px]">명소</p>
                  </>
                )}
                {placeData.placeType === "RESTAURANT" && (
                  <>
                    <img
                      src="/images/white-restaurant.svg"
                      alt="restaurant"
                      className="text-[10px] h-[12px]"
                    />
                    <p className="text-[12px]">식당</p>
                  </>
                )}
                {placeData.placeType === "HOTEL" && (
                  <>
                    <img
                      src="/images/white-accommodation.svg"
                      alt="accommodation"
                      className="text-[10px] h-[12px]"
                    />
                    <p className="text-[12px]">숙소</p>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-[5px] items-center">
            <img
              src="/images/marker.svg"
              alt="marker"
              className="text-[10px] h-[15px]"
            />
            <p className="text-[#A7A7A7] text-[14px]">{placeData.address}</p>
          </div>
        </div>
        <PlaceInfo info={placeData.summary ?? "내용이 없습니다."} />
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
            장바구니에 담기
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaceModal;

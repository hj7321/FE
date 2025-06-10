import clsx from "clsx";
import PlaceInfo from "../information/PlaceInfo";
import { useModalStore } from "../../stores/modal.store";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import { ReadPlaceDetailResponse } from "../../types/place.type";
import { useAuthStore } from "../../stores/auth.store";
import { Report } from "notiflix";

interface PlaceModalProps {
  cardName: string;
  cardImg: string;
  placeData: ReadPlaceDetailResponse;
  isNeededButton?: boolean;
}

const PlaceModal = ({
  cardName,
  cardImg,
  placeData,
  isNeededButton,
}: PlaceModalProps) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const closeModal = useModalStore((state) => state.closeModal);
  const addNewFavoriteList = useFavoriteListStore(
    (state) => state.addNewFavoriteList
  );
  const updateAddList = useFavoriteListStore((state) => state.updateAddList);

  console.log(placeData);

  const handleAddFavoriteList = () => {
    if (!isLogin) {
      // alert("로그인 후에 이용해주세요.");
      Report.failure("Tranner", "로그인 후에 이용해주세요.", "확인", {
        titleFontSize: "20px",
      });
      return;
    }

    if (!placeData) return;

    addNewFavoriteList({
      placeId: placeData.placeId,
      placeName: placeData.name,
      placeType: placeData.placeType,
      address: placeData.address,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
      photoUrl: placeData.photoUrl ?? undefined,
    });
    closeModal();
    updateAddList({
      placeId: placeData.placeId,
      placeName: placeData.name,
      placeType: placeData.placeType,
      address: placeData.address,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
      photoUrl: placeData.photoUrl ?? undefined,
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-[10px] p-[20px] bg-white rounded-[8px] w-2/3 h-fit [box-shadow:4px_4px_20px_rgba(0,0,0,0.25)] relative"
    >
      <button onClick={closeModal} className="absolute right-[12px] top-[12px]">
        <img
          src="/images/close.svg"
          alt="close"
          className="text-[10px] h-[14px] hover:cursor-pointer"
        />
      </button>
      <div className="flex gap-[10px] items-center">
        <h1 className="font-bold text-[30px]">{placeData.name}</h1>
        <div>
          {placeData.placeType && placeData.placeType !== "ETC" && (
            <div className="flex gap-[3px] rounded-[50px] text-white bg-[#c9c9c9] px-[10px] py-[5px] items-center w-[60px]">
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
      </div>
      <div className="flex gap-[10px]">
        <div className="flex flex-col gap-[15px] w-3/5">
          <div className="flex flex-col">
            <div className="flex gap-[5px] items-center">
              <img
                src="/images/marker.svg"
                alt="marker"
                className="text-[10px] h-[15px]"
              />
              <p className="text-[#A7A7A7] text-[14px]">{placeData.address}</p>
            </div>
          </div>
          <PlaceInfo placeData={placeData} />
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
    </div>
  );
};

export default PlaceModal;

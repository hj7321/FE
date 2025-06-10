import { memo } from "react";
import { useModalStore } from "../../stores/modal.store";
import PlaceModal from "../modal/PlaceModal";
import { useAuthStore } from "../../stores/auth.store";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import useReadPlaceDetail from "../../hooks/useReadPlaceDetail";
import { saveRecentPlaceId } from "../../utils/saveRecentPlaceId";

interface PlaceCardProps {
  cardImg: string;
  cardName: string;
  placeId: string;
}

const PlaceCard = memo(({ cardImg, cardName, placeId }: PlaceCardProps) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const openModal = useModalStore((state) => state.openModal);
  const countryName = useFavoriteListStore((state) => state.countryName);
  const regionName = useFavoriteListStore((state) => state.regionName);

  const { refetch } = useReadPlaceDetail(placeId);

  const handleOpenModal = async () => {
    const { data } = await refetch();
    if (!data) return;
    if (isLogin && countryName && regionName)
      saveRecentPlaceId(data.placeId, countryName, regionName);

    openModal(
      <PlaceModal
        cardName={cardName}
        cardImg={cardImg}
        placeData={data}
        isNeededButton
      />
    );
  };

  return (
    <div
      onClick={handleOpenModal}
      className="flex flex-col gap-[3px] p-[10px] bg-white w-[247.8px] h-fit rounded-[8px] [box-shadow:4px_8px_4px_rgba(0,0,0,0.1)] hover:cursor-pointer"
    >
      <img
        src={cardImg}
        alt={cardName}
        loading="lazy"
        className="rounded-[4px] h-[155px] object-cover text-[12px]"
      />

      <p className="truncate w-full">{cardName}</p>
    </div>
  );
});

export default PlaceCard;

import { memo } from "react";
import { useModalStore } from "../../stores/modal.store";
import PlaceModal from "../modal/PlaceModal";
import { useQuery } from "@tanstack/react-query";
import { readPlaceDetail } from "../../apis/place.api";
import { ReadPlaceDetailResponse } from "../../types/place.type";
import { saveRecentPlace } from "../../utils/saveRecentPlace";
import { useAuthStore } from "../../stores/auth.store";
import { useFavoriteListStore } from "../../stores/favoriteList.store";

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

  const { refetch } = useQuery<
    ReadPlaceDetailResponse,
    Error,
    ReadPlaceDetailResponse,
    string[]
  >({
    queryKey: ["readPlaceDetail", placeId],
    queryFn: () => readPlaceDetail({ placeId }),
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    enabled: false,
    retry: 2,
  });

  const handleOpenModal = async () => {
    const { data } = await refetch();
    if (!data) return;
    if (isLogin && countryName && regionName)
      saveRecentPlace({
        countryName,
        regionName,
        placeId: data.placeId,
        placeName: data.name,
        photoUrl: data.photoUrl,
      });

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

import { memo } from "react";
import { useModalStore } from "../../stores/modal.store";
import PlaceModal from "../modal/PlaceModal";
import { useQuery } from "@tanstack/react-query";
import { readPlaceDetail } from "../../apis/place.api";
import { ReadPlaceDetailResponse } from "../../types/place.type";

interface PlaceCardProps {
  cardImg: string;
  cardName: string;
  placeId: string;
  regionName: string;
}

const PlaceCard = memo(
  ({ cardImg, cardName, placeId, regionName }: PlaceCardProps) => {
    const openModal = useModalStore((state) => state.openModal);

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

      openModal(
        <PlaceModal
          cardName={cardName}
          cardImg={cardImg}
          placeData={data}
          regionName={regionName}
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

        <p>{cardName}</p>
      </div>
    );
  }
);

export default PlaceCard;

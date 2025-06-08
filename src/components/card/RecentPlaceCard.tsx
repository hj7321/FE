import { memo } from "react";
import { useModalStore } from "../../stores/modal.store";
import PlaceModal from "../modal/PlaceModal";
import { useQuery } from "@tanstack/react-query";
import { ReadPlaceDetailResponse } from "../../types/place.type";
import { readPlaceDetail } from "../../apis/place.api";

interface RecentPlaceCardProps {
  cardImg: string;
  countryName: string;
  placeName: string;
  placeId: string;
}

const RecentPlaceCard = memo(
  ({ cardImg, countryName, placeName, placeId }: RecentPlaceCardProps) => {
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
        <PlaceModal cardName={placeName} cardImg={cardImg} placeData={data} />
      );
    };

    return (
      <div
        onClick={handleOpenModal}
        className="flex flex-col p-[10px] bg-white w-[247.8px] h-fit rounded-[8px] [box-shadow:4px_8px_4px_rgba(0,0,0,0.1)] hover:cursor-pointer"
      >
        <img
          src={cardImg}
          alt={placeName}
          loading="lazy"
          className="rounded-[4px] h-[160px] object-cover mb-[5px] text-[12px]"
        />
        <p className="text-[13px] text-[#8b8b8b] mb-[-1px]">{countryName}</p>
        <p className="font-bold">{placeName}</p>
      </div>
    );
  }
);

export default RecentPlaceCard;

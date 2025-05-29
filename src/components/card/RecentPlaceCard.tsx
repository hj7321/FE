import { memo } from "react";
import { useModalStore } from "../../stores/modal.store";
import PlaceModal from "../modal/PlaceModal";

interface RecentPlaceCardProps {
  cardImg: string;
  countryName: string;
  placeName: string;
}

const RecentPlaceCard = memo(
  ({ cardImg, countryName, placeName }: RecentPlaceCardProps) => {
    const openModal = useModalStore((state) => state.openModal);

    const handleOpenModal = () => {
      openModal(<PlaceModal cardName={placeName} cardImg={cardImg} />);
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

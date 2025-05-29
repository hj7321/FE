import { memo } from "react";
import { useModalStore } from "../../stores/modal.store";
import CityModal from "../modal/CityModal";

interface CityCardProps {
  cardImg: string;
  cardName: string;
}

const CityCard = memo(({ cardImg, cardName }: CityCardProps) => {
  const openModal = useModalStore((state) => state.openModal);

  const handleOpenModal = () => {
    openModal(<CityModal cardName={cardName} cardImg={cardImg} />);
  };

  return (
    <div
      onClick={handleOpenModal}
      className="flex flex-col gap-[3px] p-[10px] bg-white w-[303.5px] h-fit rounded-[8px] [box-shadow:4px_8px_4px_rgba(0,0,0,0.1)] hover:cursor-pointer duration-300 hover:scale-108 overflow-hidden"
    >
      <img
        src={cardImg}
        alt={cardName}
        loading="lazy"
        className="rounded-[4px] h-[200px] object-cover text-[12px]"
      />

      <p>{cardName}</p>
    </div>
  );
});

export default CityCard;

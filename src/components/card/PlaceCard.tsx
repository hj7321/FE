import { useModalStore } from "../../stores/modal.store";
import PlaceModal from "../modal/PlaceModal";

interface PlaceCardProps {
  cardImg: string;
  cardName: string;
}

const PlaceCard = ({ cardImg, cardName }: PlaceCardProps) => {
  const { openModal } = useModalStore();

  const handleOpenModal = () => {
    openModal(
      <PlaceModal cardName={cardName} cardImg={cardImg} isNeededButton />
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
        className="rounded-[4px] h-[155px] object-cover text-[12px]"
      />

      <p>{cardName}</p>
    </div>
  );
};

export default PlaceCard;

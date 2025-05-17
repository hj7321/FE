import { useFavoriteListStore } from "../../stores/favoriteList.store";

interface FavoriteCardProps {
  cardImg: string;
  cardName: string;
}

const FavoriteCard = ({ cardImg, cardName }: FavoriteCardProps) => {
  const { deleteFavoriteList } = useFavoriteListStore();

  const handleDeleteFavoriteList = () => {
    deleteFavoriteList(cardName, cardImg);
  };

  return (
    <div
      style={{
        boxShadow: `
      inset 1px 1px 0 rgba(0, 0, 0, 0.2),
      4px 4px 10px rgba(0, 0, 0, 0.2)
    `,
      }}
      className="flex flex-col gap-[3px] p-[10px] pb-[5px] bg-white w-[157px] h-fit rounded-[4px] relative"
    >
      <button
        onClick={handleDeleteFavoriteList}
        className="absolute right-[-6px] top-[-5px]"
      >
        <img
          src="/images/close-rounded.svg"
          alt="close"
          className="text-[10px]  h-[18px] hover:cursor-pointer"
        />
      </button>
      <img
        src={cardImg}
        alt={cardName}
        className="text-[12px] rounded-[4px] h-[107px] w-[137px] object-cover"
      />
      <p className="text-[14px]">{cardName}</p>
    </div>
  );
};

export default FavoriteCard;

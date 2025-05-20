interface TravelPlaceCardProps {
  cardName: string;
  cardImg: string;
  isFavorite?: boolean;
}

const TravelPlaceCard = ({
  cardName,
  cardImg,
  isFavorite,
}: TravelPlaceCardProps) => {
  return (
    <div
      style={{
        boxShadow: `
      inset 1px 1px 0 rgba(0, 0, 0, 0.05),
      4px 4px 10px rgba(0, 0, 0, 0.25)
    `,
      }}
      className="flex flex-col gap-[3px] p-[10px] pb-[5px] bg-white w-[157px] h-fit rounded-[10px] relative"
    >
      <img
        src={cardImg}
        alt={cardName}
        className="text-[12px] rounded-[4px] h-[107px] w-[137px] object-cover"
      />
      <div className="flex justify-between">
        <div>
          <p className="text-[14px]">{cardName}</p>
          <p className="text-[12px]">장소</p>
        </div>
        {isFavorite && (
          <img
            src="/images/heart.svg"
            alt="heart"
            className="text-[10px] w-[18px]"
          />
        )}
      </div>
    </div>
  );
};

export default TravelPlaceCard;

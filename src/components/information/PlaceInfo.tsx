interface PlaceInfoProps {
  info: string;
}

const PlaceInfo = ({ info }: PlaceInfoProps) => {
  return (
    <p className="text-[14.5px] overflow-y-auto scrollbar-custom pr-[10px]">
      {info}
    </p>
  );
};

export default PlaceInfo;

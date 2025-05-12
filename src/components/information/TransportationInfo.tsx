interface TransportationInfoProps {
  period: number;
}

const TransportationInfo = ({ period }: TransportationInfoProps) => {
  return (
    <div className="flex gap-[3px]">
      <img src="" alt="icon" />
      <p>10분</p>
    </div>
  );
};

export default TransportationInfo;

import FlightInfo from "./FlightInfo";
import PassportInfo from "./PassportInfo";
import TimeDifferenceInfo from "./TimeDifferenceInfo";
import VisaInfo from "./VisaInfo";
import VoltageInfo from "./VoltageInfo";

interface CityBasicInfoProps {
  cardName: string;
}

const CityBasicInfo = ({ cardName }: CityBasicInfoProps) => {
  const country = cardName.split(" ")[0];

  return (
    <div className="flex flex-col gap-[8px]">
      <FlightInfo cardName={cardName} />
      <TimeDifferenceInfo cardName={cardName} />
      <VisaInfo cardName={cardName} />
      <PassportInfo cardName={cardName} />
      <VoltageInfo isKorea={country === "대한민국"} cardName={cardName} />
    </div>
  );
};

export default CityBasicInfo;

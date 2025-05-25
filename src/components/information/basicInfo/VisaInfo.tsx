import { getCityInfo } from "../../../utils/getCityInfo";
import { COUNTRY_BASIC_INFO } from "../../../constants/countryBasicInfo";

interface VisaInfoProps {
  cardName: string;
}

const VisaInfo = ({ cardName }: VisaInfoProps) => {
  const [country, city] = cardName.split(" ");
  const information = COUNTRY_BASIC_INFO[country];

  return (
    <div className="flex gap-[15px] items-center">
      <div className="flex w-[47px] justify-between items-center">
        <img
          src="/images/visa.svg"
          alt="visa"
          className="w-[14px] h-[14px] text-[10px]"
        />
        <p className="text-[#aaaaaa] text-[15px]">비자</p>
      </div>
      <p className="text-[15px]">{getCityInfo(city, information, "비자")}</p>
    </div>
  );
};

export default VisaInfo;

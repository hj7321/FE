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
      <div className="flex w-[53px] justify-between items-center">
        <img
          src="/images/visa.svg"
          alt="visa"
          className="w-[20px] h-[20px] text-[10px]"
        />
        <p className="text-[#8A8A8A] text-[15px]">비자</p>
      </div>
      <p className="text-[15px]">{getCityInfo(city, information, "비자")}</p>
    </div>
  );
};

export default VisaInfo;

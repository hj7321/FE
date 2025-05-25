import { COUNTRY_BASIC_INFO } from "../../../constants/countryBasicInfo";
import { getCityInfo } from "../../../utils/getCityInfo";

interface PassportInfoProps {
  cardName: string;
}

const PassportInfo = ({ cardName }: PassportInfoProps) => {
  const [country, city] = cardName.split(" ");
  const information = COUNTRY_BASIC_INFO[country];

  return (
    <div className="flex gap-[15px] items-center">
      <div className="flex w-[107px] justify-between items-center">
        <img
          src="/images/passport-expiration.svg"
          alt="passport-expiration"
          className="w-[13px] h-[15px] text-[10px] ml-[2px]"
        />
        <p className="text-[#aaaaaa] text-[15px]">여권 만료 조건</p>
      </div>
      <p className="text-[15px]">
        {getCityInfo(city, information, "여권만료조건")}
      </p>
    </div>
  );
};

export default PassportInfo;

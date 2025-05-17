import { useState } from "react";
import { getCityInfo } from "../../../utils/getCityInfo";
import clsx from "clsx";
import { COUNTRY_BASIC_INFO } from "../../../constants/countryBasicInfo";

interface VoltageInfoProps {
  isKorea: boolean;
  cardName: string;
}

const VoltageInfo = ({ isKorea, cardName }: VoltageInfoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [country, city] = cardName.split(" ");
  const information = COUNTRY_BASIC_INFO[country];
  const conversionStatus = getCityInfo(city, information, "변환");

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[15px] items-center">
        <div className="flex w-[53px] justify-between items-center">
          <img
            src="/images/voltage.svg"
            alt="voltage"
            className="w-[20px] h-[20px] text-[10px]"
          />
          <p className="text-[#8A8A8A] text-[15px]">전압</p>
        </div>
        <p className="text-[15px]">{getCityInfo(city, information, "전압")}</p>
        <div
          className={clsx(
            "text-[12px] text-white border rounded-[4px] px-[5px] py-[1px] ml-[-8px]",
            conversionStatus === "필수"
              ? "bg-red-400"
              : conversionStatus === "선택"
              ? "bg-green-400"
              : "bg-blue-400"
          )}
        >
          변환 {conversionStatus}
        </div>
      </div>
      {!isKorea && (
        <div className="relative">
          <p
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-[11px] text-[#9a9a9a] mr-[12px] hover:cursor-pointer"
          >
            [참고] 대한민국 전압
          </p>
          {isHovered && (
            <div className="absolute left-[-20px] text-[11px] rounded-[4px] bg-[#efeeee] p-[5px] text-center w-[130px]">
              <p>220V 60Hz / Type C, F</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoltageInfo;

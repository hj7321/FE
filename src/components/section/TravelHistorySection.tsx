import { useState } from "react";
import { Schedule } from "../../types/travelPlan.type";
import { Link } from "react-router";
import clsx from "clsx";
import TravelPlanCard from "../card/TravelPlanCard";
import NoData from "../NoData";

interface TravelHistorySectionProps {
  allPlans: Schedule[];
  scheduledPlans: Schedule[];
  pastPlans: Schedule[];
  maxCount?: number; // MyPage에선 4개, HistoryPage에선 전체
  showMyPageLink?: boolean; // 마이페이지 이동 링크 여부
  linkToMyPage?: string; // 마이페이지 링크 주소
  showHeaderLink?: boolean; // "더보기" 링크 여부
  linkToHeader?: string; // "더보기"로 이동한 페이지 링크 주소
}

const TravelHistorySection = ({
  allPlans,
  scheduledPlans,
  pastPlans,
  maxCount,
  showMyPageLink = false,
  linkToMyPage,
  showHeaderLink = false,
  linkToHeader,
}: TravelHistorySectionProps) => {
  const [clickedContent, setClickedContent] = useState<string>("전체 보기");

  const selectedPlans =
    clickedContent === "전체 보기"
      ? allPlans
      : clickedContent === "예정된 여행"
      ? scheduledPlans
      : pastPlans;

  const displayedPlans = maxCount
    ? selectedPlans.slice(0, maxCount)
    : selectedPlans;

  return (
    <section className="flex flex-col gap-[5px] mb-[30px] min-h-[300px]">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-[7px]">
          {showMyPageLink && (
            <>
              <Link to={linkToMyPage!} className="text-[18px] hover:font-bold">
                내 정보
              </Link>
              <h1>{">"}</h1>
            </>
          )}
          <h1 className="font-bold text-[22px]">여행 기록 ✈️</h1>
        </div>
        {showHeaderLink && (
          <Link
            to={linkToHeader!}
            className="text-[12px] text-[#a6a6a6] mr-[3px]"
          >
            더보기
          </Link>
        )}
      </div>
      <div className="flex gap-[40px] py-[15px] px-[20px] w-full bg-[#e2e2e2] rounded-[4px]">
        {["전체 보기", "예정된 여행", "지난 여행"].map((label) => (
          <button
            key={label}
            onClick={() => setClickedContent(label)}
            className={clsx(
              "hover:cursor-pointer hover:font-bold",
              clickedContent === label &&
                "underline underline-offset-[5px] font-bold"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-[7px] flex flex-wrap gap-x-[20px] gap-y-[15px]">
        {displayedPlans.length === 0 && <NoData />}
        {displayedPlans.map((plan) => (
          <TravelPlanCard
            key={plan.scheduleId}
            cardId={plan.scheduleId}
            cardImg={`/images/cities/${plan.regionName}.webp`}
            travelTitle={plan.scheduleName}
            travelStartDate={plan.startDate}
            travelEndDate={plan.endDate}
            travelPeople={plan.howManyPeople}
            travelPlace={`${plan.countryName} ${plan.regionName}`}
            isEnded={clickedContent === "지난 여행"}
          />
        ))}
      </div>
    </section>
  );
};

export default TravelHistorySection;

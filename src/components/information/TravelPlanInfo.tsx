import ScheduleCard from "../card/ScheduleCard";
import Timeline from "../Timeline";
import TimeInfo from "./TimeInfo";

interface TravelPlanInfoProps {
  dayNum: number;
  date: string;
}

const TravelPlanInfo = ({ dayNum, date }: TravelPlanInfoProps) => {
  return (
    <div className="flex flex-col gap-[10px] w-[260px]">
      <div className="flex gap-[7px]">
        <div
          style={{ backgroundColor: `var(--color-day${dayNum})` }}
          className="rounded-[4px] text-white text-[14px] py-[2px] px-[8px] w-fit h-fit"
        >
          DAY {dayNum}
        </div>
        <div className="font-bold">{date}</div>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <TimeInfo dayNum={dayNum} time="09 : 00" />
          <div className="flex gap-[10px]">
            <Timeline dayNum={dayNum} numOfCard={2} />
            <div className="flex flex-col gap-[5px] mb-[10px]">
              <ScheduleCard
                isFirstSchedule
                placeName="트레비 분수"
                placePurpose="관광"
                period="09:00 ~ 09:30"
              />
              <ScheduleCard
                isNeededDeleteButton
                placeName="콜로세움"
                placePurpose="관광"
                period="09:35 ~ 09:45"
              />
            </div>
          </div>
          <TimeInfo dayNum={dayNum} time="10 : 00" />
          <div className="flex gap-[10px]">
            <Timeline dayNum={dayNum} numOfCard={1} />
            <ScheduleCard
              isFirstSchedule
              placeName="트레비 분수"
              placePurpose="관광"
              period="09:00 ~ 09:45"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanInfo;

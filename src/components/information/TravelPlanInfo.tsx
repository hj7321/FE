import { MiniSchedule, ScheduleByDay } from "../../types/travelPlan.type";
import ScheduleUnit from "../schedule/ScheduleUnit";
import { useMemo, useState } from "react";
import { TIMELINE } from "../../constants/timeline";

interface TravelPlanInfoProps {
  dayNum: number;
  date: string;
  schedule: ScheduleByDay[];
}

const TravelPlanInfo = ({ dayNum, date, schedule }: TravelPlanInfoProps) => {
  const [highlightedTime, setHighlightedTime] = useState<string | null>(null);

  console.log(schedule);

  const miniSchedule = useMemo(() => {
    const map: MiniSchedule = {};

    TIMELINE.forEach((time) => {
      const hourKey = time.slice(0, 2); // "08"
      const matchedItems = schedule.filter((item) => {
        return item.startTime.slice(0, 2) === hourKey;
      });

      if (matchedItems.length > 0) {
        map[time] = matchedItems.map((item) => ({
          placeName: item.placeName,
          placeType: item.placeType || "ETC",
          period: `${item.startTime.slice(0, 5)} ~ ${item.endTime.slice(0, 5)}`, // "08:00 ~ 09:00"
        }));
      }
    });

    return map;
  }, [schedule]);

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
      <div className="flex flex-col">
        {TIMELINE.map((time) => (
          <ScheduleUnit
            key={time}
            dayNum={dayNum}
            time={time}
            numOfCard={miniSchedule[time]?.length || 1}
            isHighlighted={highlightedTime === time}
            highlightedTime={highlightedTime}
            setHighlightedTime={setHighlightedTime}
            schedule={miniSchedule}
          />
        ))}
      </div>
    </div>
  );
};

export default TravelPlanInfo;

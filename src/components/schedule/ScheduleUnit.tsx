import { useDrop } from "react-dnd";
import { useCallback, useEffect } from "react";
import TimeInfo from "./TimeInfo";
import Timeline from "./Timeline";
import ScheduleCard from "../card/ScheduleCard";
import { MiniSchedule } from "../../types/travelPlan.type";
import { Notify } from "notiflix";

interface ScheduleUnitProps {
  dayNum: number;
  time: string;
  numOfCard: number;
  onDropPlace?: (time: string, placeName: string, purpose: string) => void;
  isHighlighted: boolean;
  highlightedTime: string | null;
  setHighlightedTime: (time: string | null) => void;
  schedule: MiniSchedule;
}

const ScheduleUnit = ({
  dayNum,
  time,
  numOfCard,
  onDropPlace,
  isHighlighted,
  highlightedTime,
  setHighlightedTime,
  schedule,
}: ScheduleUnitProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PLACE_CARD",
    drop: (item: { placeName: string; placeType: string }) => {
      onDropPlace?.(time, item.placeName, item.placeType);
      // alert(`${item.placeName}를 ${time}에 추가했습니다!`);
      Notify.success(`${item.placeName}를 ${time}에 추가했습니다!`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  useEffect(() => {
    if (isOver) {
      setHighlightedTime(time);
    } else if (highlightedTime === time) {
      setHighlightedTime(null);
    }
  }, [isOver, time, setHighlightedTime, highlightedTime]);

  const setDropRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) drop(node);
    },
    [drop]
  );

  return (
    <div ref={setDropRef}>
      <TimeInfo dayNum={dayNum} time={time} isHighlighted={isHighlighted} />
      <div className="flex gap-[10px]">
        <Timeline dayNum={dayNum} numOfCard={numOfCard} />
        {schedule[time] &&
          schedule[time].map((item, idx) => (
            <ScheduleCard
              key={idx}
              isFirstSchedule
              placeName={item.placeName}
              placeType={item.placeType}
              period={item.period}
              isNeededDeleteButton
            />
          ))}
      </div>
    </div>
  );
};

export default ScheduleUnit;

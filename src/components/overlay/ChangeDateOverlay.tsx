import { forwardRef } from "react";
import DayCard from "../card/DayCard";

interface ChangeDateOverlayProps {
  travelPeriod: Record<number, string>;
  handleChangeSelectedDate: (dayNum: number) => void;
}

const ChangeDateOverlay = forwardRef<HTMLDivElement, ChangeDateOverlayProps>(
  ({ travelPeriod, handleChangeSelectedDate }, ref) => {
    return (
      <div
        ref={ref}
        className="rounded-[4px] bg-white absolute top-[25px] left-[220px] flex flex-col w-[120px] z-[1000] py-[10px] [box-shadow:6px_6px_10px_rgba(0,0,0,0.5)]"
      >
        {Object.entries(travelPeriod).map(([dayNum, date]) => (
          <div
            key={date}
            className="w-[100%] px-[12px] py-[7px] hover:cursor-pointer hover:font-bold"
          >
            <DayCard
              dayNum={Number(dayNum)}
              date={date}
              isDark={true}
              isClickable={true}
              handleChangeSelectedDate={() =>
                handleChangeSelectedDate(Number(dayNum))
              }
            />
          </div>
        ))}
      </div>
    );
  }
);

export default ChangeDateOverlay;

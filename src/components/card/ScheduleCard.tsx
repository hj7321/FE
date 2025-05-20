import clsx from "clsx";

interface ScheduleCardProps {
  isNeededDeleteButton?: boolean;
  isFirstSchedule?: boolean;
  placeName: string;
  placePurpose: string;
  period: string;
}

const ScheduleCard = ({
  isNeededDeleteButton,
  isFirstSchedule,
  placeName,
  placePurpose,
  period,
}: ScheduleCardProps) => {
  return (
    <div
      className={clsx(
        "rounded-[6px] border py-[5px] px-[8px] h-fit",
        isNeededDeleteButton
          ? "border-[#FF7FF5] bg-[#ffe4fe] w-[228px]"
          : "border-[#7FFFF2] bg-[#e5fffc] w-fit max-w-[2280px]",
        isFirstSchedule && "mt-[5px]"
      )}
    >
      <div className="flex gap-[8px] items-center">
        <p className="text-[14px] font-bold">{placeName}</p>
        <div
          className={clsx(
            "flex items-center px-[7px] py-[2px] rounded-[50px] gap-[3px] h-fit",
            isNeededDeleteButton ? "bg-[#C2A0C1]" : "bg-[#A0C2BE]"
          )}
        >
          <img
            src="/images/white-attraction.svg"
            alt="icon"
            className="text-[7px] h-[7px]"
          />
          <p className="text-[9px] text-white">{placePurpose}</p>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-[11px]">{period}</p>
        {isNeededDeleteButton && (
          <button className="text-[10px] text-[#AAAAAA]">삭제</button>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;

import clsx from "clsx";

interface DayCardProps {
  dayNum: number;
  isSelected?: boolean;
}

const DayCard = ({ dayNum, isSelected }: DayCardProps) => {
  return (
    <div className="flex gap-[3px] items-center">
      <div
        style={{ backgroundColor: `var(--color-day${dayNum})` }}
        className={clsx(
          "rounded-[4px] text-white py-[2px] text-center ",
          isSelected
            ? "w-[54px] text-[13px]"
            : "w-[38px] text-[9px] opacity-40 hover:cursor-pointer hover:opacity-100"
        )}
      >
        DAY {dayNum}
      </div>
      {isSelected && <p className="text-[14.5px]">05/01 (목)</p>}
    </div>
  );
};

export default DayCard;

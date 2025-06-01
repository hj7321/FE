import clsx from "clsx";

interface DayCardProps {
  dayNum: number;
  isDark?: boolean;
  isBig?: boolean;
  isClickable?: boolean;
  date: string;
  handleChangeSelectedDate?: (dayNum: number) => void;
}

const DayCard = ({
  dayNum,
  isDark,
  isBig,
  isClickable,
  date,
  handleChangeSelectedDate,
}: DayCardProps) => {
  return (
    <div
      onClick={() => {
        if (isClickable && handleChangeSelectedDate) {
          handleChangeSelectedDate(dayNum);
        }
      }}
      className="flex gap-[3px] items-center"
    >
      <div
        style={{ backgroundColor: `var(--color-day${dayNum})` }}
        className={clsx(
          "rounded-[4px] text-white py-[2px] text-center ",
          isBig ? "w-[54px] text-[13px]" : "w-[38px] text-[9px]",
          !isDark && "opacity-40 hover:cursor-pointer hover:opacity-100"
        )}
      >
        DAY {dayNum}
      </div>
      {isDark && (
        <p className={clsx(isBig ? "text-[14.5px]" : "text-[11px]")}>{date}</p>
      )}
    </div>
  );
};

export default DayCard;

interface TimeInfoProps {
  dayNum: number;
  time: string;
}

const TimeInfo = ({ dayNum, time }: TimeInfoProps) => {
  return (
    <div className="flex gap-[5px] items-center">
      <div
        style={{ border: `2.5px solid var(--color-day${dayNum})` }}
        className="rounded-[50px] w-[12px] h-[12px] bg-white"
      ></div>
      <div className="text-[11px]">{time}</div>
    </div>
  );
};

export default TimeInfo;

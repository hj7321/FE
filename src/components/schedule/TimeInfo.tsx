import clsx from "clsx";

interface TimeInfoProps {
  dayNum: number; // 오늘이 여행 며칠째인지
  time: string; // 표시할 시간 문자열
  isHighlighted?: boolean;
}

// 시간 표시 + 드롭 영역 역할을 하는 TimeInfo 컴포넌트
const TimeInfo = ({ dayNum, time, isHighlighted = false }: TimeInfoProps) => {
  return (
    <div className="flex gap-[5px] items-center">
      {/* 시간 앞에 있는 원형 타임라인 포인트 */}
      <div
        style={{ border: `2.5px solid var(--color-day${dayNum})` }}
        className="rounded-[50px] w-[12px] h-[12px] bg-white"
      ></div>
      {/* 시간 텍스트 */}
      <div
        className={clsx(
          "transition-all duration-200",
          isHighlighted ? "text-[18px] font-bold" : "text-[11px]"
        )}
      >
        {time}
      </div>
    </div>
  );
};

export default TimeInfo;

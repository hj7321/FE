interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  customHeaderCount?: number;
  monthDate?: Date;
  changeMonth?: (month: number) => void;
  changeYear?: (year: number) => void;
  decreaseYear?: () => void;
  increaseYear?: () => void;
  index: number;
}

const CalendarHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  index,
}: CustomHeaderProps) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      {index === 0 ? ( // 왼쪽 달력
        <>
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="w-[30px]"
          >
            <img src="/images/prev-arrow.svg" alt="이전" />
          </button>
          <span className="text-lg font-bold">{`${year}년 ${month}월`}</span>
          <div className="w-[30px]" />
        </>
      ) : (
        // 오른쪽 달력
        <>
          <div className="w-[30px]" />
          <span className="text-lg font-bold">{`${year}년 ${month}월`}</span>
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="w-[30px]"
          >
            <img src="/images/next-arrow.svg" alt="다음" />
          </button>
        </>
      )}
    </div>
  );
};

export default CalendarHeader;

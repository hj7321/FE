import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/calendar.css";
import { useDateStore } from "../../stores/date.store";
import { useModalStore } from "../../stores/modal.store";
import { isSameDay, startOfDay } from "date-fns";
import { ko } from "date-fns/locale";

const CalendarModal = () => {
  const [calendarFocusDate, setCalendarFocusDate] = useState(new Date()); // 달력 기준 날짜
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const lastSelectedRef = useRef<Date | null>(null); // 마지막 클릭 날짜 기억
  const today: Date = new Date();
  const maxDate: Date | undefined = startDate
    ? new Date(startDate.getTime() + 13 * 24 * 60 * 60 * 1000)
    : undefined;

  const setDates = useDateStore((state) => state.setDates);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    // 같은 날짜 다시 클릭 → 선택 해제
    if (
      start &&
      !end &&
      lastSelectedRef.current &&
      start.getTime() === lastSelectedRef.current.getTime()
    ) {
      lastSelectedRef.current = null;
      setStartDate(null);
      setEndDate(null);
      return;
    }

    // 새로운 날짜 선택
    lastSelectedRef.current = start;
    setStartDate(start);
    setEndDate(end);
  };

  const handleCompleteTravelPeriod = () => {
    if (!startDate || !endDate) return alert("여행 기간을 선택해주세요.");
    setDates(startDate, endDate);
    closeModal();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-[9999] w-[1000px] h-[600px] rounded-[6px] bg-white flex flex-col items-center justify-between py-[25px] px-[10px]"
    >
      <h2 className="font-bold text-[26px]">여행 기간을 선택해주세요.</h2>
      <div className="text-center text-[14px] mt-[-5px] text-[#959595]">
        <p>
          여행 기간은 <b>최대 14일</b>까지 선택 가능합니다.
        </p>
        <p>
          현지 여행 기간(<b>여행지 도착 날짜, 여행지 출발 날짜</b>)으로
          입력해주세요.
        </p>
      </div>
      {/* <div className="border w-[900px]"> */}
      <DatePicker
        locale={ko}
        monthsShown={2} // 달력 두 달 치 렌더링
        selected={startDate ?? undefined} //  선택된 날짜는 표시되게
        key={(startDate?.toString() ?? "") + (endDate?.toString() ?? "")}
        highlightDates={[]} // 강조된 날짜 비움
        startDate={startDate} // 범위 선택 시 시작 날짜 지정
        endDate={endDate} // 범위 선택 시 종료 날짜 지정
        openToDate={calendarFocusDate} // 달력 포커스 수동 유지
        onChange={handleDateChange}
        selectsRange // 범위(시작~종료) 선택을 활성화
        minDate={today} // 오늘 이전 날짜는 비활성화(선택 불가)
        maxDate={maxDate} // 14일 제한
        isClearable // 입력된 날짜를 X 버튼으로 지울 수 있도록 설정
        inline // 달력을 팝업이 아닌 고정형(인라인)으로 표시
        onMonthChange={(date) => setCalendarFocusDate(date)}
        // renderCustomHeader={(props) => <CalendarHeader {...props} />}
        dayClassName={(date) => {
          const isSunday = date.getDay() === 0;
          const isPast = date < startOfDay(new Date()); // 오늘 이전인지
          const isOutOfRange = maxDate && date > maxDate;

          if (isSunday && (isPast || isOutOfRange))
            return "custom-sunday-disabled"; // 회색
          if (isSunday) return "custom-sunday"; // 빨간색

          return "";
        }}
        renderDayContents={(day, date) => {
          const isToday = isSameDay(date!, new Date());
          const isTodaySelected =
            (startDate && isSameDay(date!, startDate)) ||
            (endDate && isSameDay(date!, endDate));

          return (
            <div className="relative text-center">
              <div>{day}</div>
              {isToday && !isTodaySelected && (
                <div className="text-[11px] mt-[-18px] text-gray-600">오늘</div>
              )}
            </div>
          );
        }}
      />
      {/* </div> */}
      <button
        onClick={handleCompleteTravelPeriod}
        className="w-[130px] h-[40px] bg-common hover:bg-selected hover:cursor-pointer text-white text-[14px] rounded-[4px]"
      >
        날짜 선택 완료
      </button>
    </div>
  );
};

export default CalendarModal;

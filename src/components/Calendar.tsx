import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/calendar.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const today: Date = new Date();
  const maxDate: Date = startDate
    ? new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000)
    : new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-[9999] w-[1000px] h-[600px] rounded-[6px] bg-white flex flex-col gap-[5px] items-center justify-between py-[25px] px-[10px]"
    >
      <h2 className="font-bold text-[26px]">여행 기간을 선택해주세요.</h2>
      <div className="text-center text-[14px] text-[#959595] mt-[5px]">
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
        locale={ko} // 한국어 적용
        monthsShown={2} // 달력 두 달 치 렌더링
        selected={today} // 현재 선택된 시작 날짜를 지정
        onChange={handleChange} // 날짜가 선택될 때 실행되는 콜백 함수 (start, end)
        startDate={startDate} // 범위 선택 시 시작 날짜 지정
        endDate={endDate} // 범위 선택 시 종료 날짜 지정
        selectsRange // 범위(시작~종료) 선택을 활성화
        minDate={today} // 오늘 이전 날짜는 비활성화(선택 불가)
        maxDate={maxDate} // 14일 제한
        isClearable // 입력된 날짜를 X 버튼으로 지울 수 있도록 설정
        inline // 달력을 팝업이 아닌 고정형(인라인)으로 표시
      />
      {/* </div> */}
      <button className="w-[130px] h-[40px] bg-common hover:bg-selected hover:cursor-pointer text-white text-[14px] rounded-[4px]">
        날짜 선택 완료
      </button>
    </div>
  );
};

export default Calendar;

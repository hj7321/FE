import { useRef, useState } from "react";
import { formatNumber } from "../../utils/fotmatNumber";
import { useEssentialSurveyStore } from "../../stores/essentialSurvey.store";

const EssentialQuestions = () => {
  const [numOfPeople, setNumOfPeople] = useState<string>("");
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [travelPeriod, setTravelPeriod] = useState({
    startDate: "",
    endDate: "",
  });
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd 형식
  const [travelBudget, setTravelBudget] = useState<string>("");

  const {
    people,
    startDate,
    endDate,
    budget,
    setPeople,
    setStartDate,
    setEndDate,
    setBudget,
  } = useEssentialSurveyStore();

  // 인원수에 대한 이벤트 핸들러 (제한: 1부터 999까지의 정수)
  const handleChangeNumOfPeople = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");

    if (onlyNumbers === "") {
      setNumOfPeople("");
      setPeople(null);
      return;
    }

    // 숫자로 변환 후 범위 검사
    const numericValue = Number(onlyNumbers);

    if (numericValue >= 1 && numericValue <= 999) {
      setNumOfPeople(onlyNumbers);
      setPeople(numericValue);
    }
  };

  // 여행 기간(여행 시작일, 종료일)에 대한 이벤트 핸들러
  const handleDateChange =
    (key: "startDate" | "endDate") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTravelPeriod((prev) => ({ ...prev, [key]: e.target.value }));
      if (key === "startDate") {
        setStartDate(e.target.value);
        if (travelPeriod.endDate < e.target.value) {
          setEndDate(e.target.value);
          setTravelPeriod((prev) => ({ ...prev, endDate: e.target.value }));
        }
      }
      if (key === "endDate") setEndDate(e.target.value);
    };

  // 커스텀 달력 아이콘 클릭 시 input의 달력 팝업을 강제로 여는 함수
  const handleIconClick = (inputElement: HTMLInputElement | null) => {
    inputElement?.showPicker?.(); // 일부 브라우저 지원
    inputElement?.focus(); // 브라우저 호환성을 위해 fallback
  };

  // 여행 예산에 대한 이벤트 핸들러 (제한: 1부터 9999999999까지의 정수)
  const handleChangeTravelBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");

    if (onlyNumbers === "") {
      setTravelBudget("");
      setBudget(null);
      return;
    }

    // 숫자로 변환 후 범위 검사
    const numericValue = Number(onlyNumbers);

    if (numericValue >= 1 && numericValue <= 9999999999) {
      const formatted = formatNumber(onlyNumbers);
      setTravelBudget(formatted);
      setBudget(numericValue);
    }
  };

  return (
    <div className="text-[14px] flex flex-col gap-[30px]">
      <div>
        <h1 className="mb-[5px]">1. 인원수를 입력해주세요.</h1>
        <div className="flex items-center gap-[5px]">
          <div className="flex justify-between items-center px-[7px] ml-[12px] w-[65px] h-[30px] rounded-[4px] border border-[#D2CCCC]">
            <img
              src="/images/people.svg"
              alt="people"
              className="aspect-square h-[14px]"
            />
            <input
              type="text"
              inputMode="numeric"
              value={people ? String(people) : numOfPeople}
              onChange={handleChangeNumOfPeople}
              className="w-[30px] outline-none text-right"
            />
          </div>
          <span>명</span>
        </div>
      </div>
      <div>
        <h1 className="mb-[5px]">2. 여행 기간을 입력해주세요.</h1>
        <div className="flex items-center gap-[5px]">
          <div className="flex justify-between items-center px-[7px] ml-[12px] w-[130px] h-[30px] rounded-[4px] border border-[#D2CCCC]">
            <img
              src="/images/calendar.svg"
              alt="calendar"
              onClick={() => handleIconClick(startDateRef.current)}
              className="hover:cursor-pointer"
            />
            <input
              type="date"
              value={startDate ?? travelPeriod.startDate}
              onChange={handleDateChange("startDate")}
              ref={startDateRef}
              min={today}
              className="outline-none w-[90px]"
            />
          </div>
          <span>-</span>
          <div className="flex justify-between items-center px-[7px] w-[130px] h-[30px] rounded-[4px] border border-[#D2CCCC]">
            <img
              src="/images/calendar.svg"
              alt="calendar"
              onClick={() => handleIconClick(endDateRef.current)}
              className="hover:cursor-pointer"
            />
            <input
              type="date"
              value={endDate ?? travelPeriod.endDate}
              onChange={handleDateChange("endDate")}
              ref={endDateRef}
              min={travelPeriod.startDate || today}
              className="outline-none w-[90px]"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="mb-[5px]">3. 여행 예산을 입력해주세요.</h1>
        <div className="flex items-center gap-[5px]">
          <div className="flex justify-between items-center px-[7px] ml-[12px] w-[140px] h-[30px] rounded-[4px] border border-[#D2CCCC]">
            <img src="/images/budget.svg" alt="budget" />
            <input
              type="text"
              inputMode="numeric"
              value={budget ? formatNumber(String(budget)) : travelBudget}
              onChange={handleChangeTravelBudget}
              className="w-[100px] outline-none text-right"
            />
          </div>
          <span>원</span>
        </div>
      </div>
    </div>
  );
};

export default EssentialQuestions;

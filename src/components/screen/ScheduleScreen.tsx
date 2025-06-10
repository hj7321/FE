import { useEffect, useRef, useState } from "react";
import { useDateStore } from "../../stores/date.store";
import { getDateMap } from "../../utils/formatDateRange";
import DayCard from "../card/DayCard";
import ChangeDateOverlay from "../overlay/ChangeDateOverlay";
import ScheduleUnit from "../schedule/ScheduleUnit";
import { useDragDropManager } from "react-dnd";
import { MiniSchedule } from "../../types/travelPlan.type";

const timeline = [
  "07 : 00",
  "08 : 00",
  "09 : 00",
  "10 : 00",
  "11 : 00",
  "12 : 00",
  "13 : 00",
  "14 : 00",
  "15 : 00",
  "16 : 00",
  "17 : 00",
  "18 : 00",
  "19 : 00",
  "20 : 00",
  "21 : 00",
  "22 : 00",
];

const ScheduleScreen = () => {
  const [titleInput, setTitleInput] = useState<string>("여행 1");
  const [peopleInput, setPeopleInput] = useState<string>("1");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dayNum, setDayNum] = useState<number>(1);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [highlightedTime, setHighlightedTime] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<MiniSchedule>({});
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const travelStartDate = useDateStore((state) => state.travelStartDate);
  const travelEndDate = useDateStore((state) => state.travelEndDate);
  const travelPeriod = getDateMap(
    new Date(travelStartDate!),
    new Date(travelEndDate!)
  );

  console.log(selectedDate);

  const handleChangeSelectedDate = (newDayNum: number) => {
    setDayNum(newDayNum);
    setSelectedDate(travelPeriod[newDayNum]);
    setIsClicked(false); // 날짜 클릭 시 오버레이 닫기
  };

  // 외부 클릭 감지
  useEffect(() => {
    // 바깥 클릭을 감지할 함수 정의
    const handleClickOutside = (event: MouseEvent) => {
      // overlayRef가 존재하고, 클릭한 대상이 오버레이 내부가 아니라면
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      )
        setIsClicked(false); // 오버레이를 닫음
    };

    // 오버레이가 열려 있을 때만 외부 클릭 이벤트 리스너를 등록함
    if (isClicked) document.addEventListener("mousedown", handleClickOutside);
    // 오버레이가 닫혀 있으면 기존 리스너 제거
    else document.removeEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 unmount 되거나 isClicked 값이 바뀔 때 리스너 제거 (클린업)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);

  const handleChangePeopleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");

    if (onlyNumbers === "") {
      setPeopleInput("");
      return;
    }

    // 숫자로 변환 후 범위 검사
    const numericValue = Number(onlyNumbers);

    if (numericValue >= 1 && numericValue <= 999) {
      setPeopleInput(onlyNumbers);
    }
  };

  // 드롭될 때 실행되는 함수
  const handleDropPlace = (
    time: string,
    placeName: string,
    placeType: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [time]: [
        ...(prev[time] || []),
        { placeName, placeType, period: "09:00 ~ 09:45" }, // period는 예시
      ],
    }));
  };

  useEffect(() => {
    try {
      const dragDropManager = useDragDropManager();
      const monitor = dragDropManager.getMonitor();

      const unsubscribe = monitor.subscribeToStateChange(() => {
        if (!monitor.isDragging()) {
          setHighlightedTime(null); // 드래그 종료 시 초기화
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.warn("DndContext가 아직 초기화되지 않음:", error);
    }
  }, []);

  return (
    <div className="bg-white h-screen flex flex-col border-r border-[#EDEDED] w-[290px]">
      <div className="px-[15px] py-[12px]">
        <div className="text-[24px] font-bold">
          <input
            className="outline-none w-[260px]"
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </div>
        <div className="text-[14px] text-[#939393] mt-[-3px] mb-[2px]">
          여행 인원수:
          <input
            className="w-[60px] ml-[3px] outline-none"
            type="text"
            value={peopleInput}
            onChange={handleChangePeopleInput}
          />
        </div>
        <div className="flex justify-between items-center relative">
          <div className="flex gap-[8px]">
            {/* 현재 선택된 날짜 (크게 표시) */}
            <DayCard
              dayNum={dayNum}
              date={travelPeriod[dayNum]}
              isDark={true}
              isBig={true}
            />

            {/* 그 다음 두 날짜 (작게 표시, 클릭 가능) */}
            <div className="flex gap-[5px]">
              {travelPeriod[dayNum + 1] && (
                <DayCard
                  dayNum={dayNum + 1}
                  isClickable={true}
                  date={travelPeriod[dayNum + 1]}
                  handleChangeSelectedDate={() =>
                    handleChangeSelectedDate(dayNum + 1)
                  }
                />
              )}
              {travelPeriod[dayNum + 2] && (
                <DayCard
                  dayNum={dayNum + 2}
                  isClickable={true}
                  date={travelPeriod[dayNum + 2]}
                  handleChangeSelectedDate={() =>
                    handleChangeSelectedDate(dayNum + 2)
                  }
                />
              )}
            </div>
          </div>

          <button
            onClick={() => setIsClicked((prev) => !prev)}
            className="text-[10px] hover:cursor-pointer text-[#989898]"
          >
            날짜 변경
          </button>
          {isClicked && (
            <ChangeDateOverlay
              ref={overlayRef} // ref 전달
              travelPeriod={travelPeriod}
              handleChangeSelectedDate={handleChangeSelectedDate}
            />
          )}
        </div>
      </div>
      <div className="px-[15px] pt-[5px] py-[15px] overflow-y-auto scrollbar-custom w-[278px]">
        {timeline.map((timeElement) => (
          <ScheduleUnit
            key={timeElement}
            dayNum={1}
            time={timeElement}
            numOfCard={1}
            isHighlighted={highlightedTime === timeElement}
            highlightedTime={highlightedTime}
            setHighlightedTime={setHighlightedTime}
            onDropPlace={handleDropPlace}
            schedule={schedule}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleScreen;

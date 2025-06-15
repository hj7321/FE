import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDateStore } from "../../stores/date.store";
import { getDateMap } from "../../utils/formatDateRange";
import DayCard from "../card/DayCard";
import ChangeDateOverlay from "../overlay/ChangeDateOverlay";
import ScheduleUnit from "../schedule/ScheduleUnit";
import { useDragDropManager } from "react-dnd";
import { useScheduleStore } from "../../stores/schedule.store";
import { useMutation } from "@tanstack/react-query";
import { createTravelPlan } from "../../apis/travelPlan.api";
import { Confirm, Notify, Report } from "notiflix";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import { TIMELINE } from "../../constants/timeline";
import { useNavigate } from "react-router";

const ScheduleScreen = () => {
  const uniqueId = uuidv4();
  const [titleInput, setTitleInput] = useState<string>("여행 1");
  const [peopleInput, setPeopleInput] = useState<string>("1");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  console.log(selectedDate);
  const [dayNum, setDayNum] = useState<number>(1);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [highlightedTime, setHighlightedTime] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const countryName = useFavoriteListStore((state) => state.countryName);
  const regionName = useFavoriteListStore((state) => state.regionName);

  const travelStartDate = useDateStore((state) => state.travelStartDate);
  const travelEndDate = useDateStore((state) => state.travelEndDate);
  const travelPeriod = getDateMap(
    new Date(travelStartDate!),
    new Date(travelEndDate!)
  );

  const rawSchedule = useScheduleStore((state) => state.schedule[dayNum]);
  const schedule = useMemo(() => rawSchedule ?? {}, [rawSchedule]);
  const addPlaceToSchedule = useScheduleStore(
    (state) => state.addPlaceToSchedule
  );

  const navigate = useNavigate();

  const { mutate: createTravelPlanMutate } = useMutation({
    mutationKey: ["createTravelPlan", uniqueId],
    mutationFn: createTravelPlan,
    onSuccess: (response) => {
      console.log("✅ 여행 생성 성공", response);
      Confirm.show(
        "Tranner",
        `<b>${countryName} ${regionName}</b>으로 떠나는 <b>${titleInput}</b>이 생성되었습니다.`,
        "홈으로 이동",
        "마이페이지로 이동",
        () => {
          navigate("/");
        },
        () => {
          navigate("/my");
        },
        {
          width: "400px",
          borderRadius: "10px",
          fontFamily: "SUIT-Regular",
          plainText: false,
        }
      );
    },
    onError: (err) => {
      console.error("❌ 여행 생성 실패", err);
    },
    retry: 1,
  });

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
    placeType: string,
    placeId: string,
    address: string,
    latitude: number,
    longitude: number
  ) => {
    // time이 "10:00"이라면, period를 "10:00 ~ 11:00"으로 설정
    const [startHour] = time.split(" : ");
    const start = `${startHour.padStart(2, "0")}:00`;
    const end = `${(parseInt(startHour, 10) + 1)
      .toString()
      .padStart(2, "0")}:00`;

    // dayNum(현재 날짜 인덱스)와 시간, 장소 정보로 추가
    addPlaceToSchedule(dayNum, time, {
      placeName,
      placeType,
      period: `${start} ~ ${end}`,
      placeId,
      address,
      latitude,
      longitude,
    });
  };

  const handleCreateTravelPlan = () => {
    const schedule = useScheduleStore.getState().schedule;
    const travelPeriod = getDateMap(
      new Date(travelStartDate!),
      new Date(travelEndDate!)
    );
    const dayCount = Object.keys(travelPeriod).length;

    // 1. 일정 없는 날짜 검사
    for (let dayNum = 1; dayNum <= dayCount; dayNum++) {
      const daySchedule = schedule[dayNum];
      if (!daySchedule || Object.keys(daySchedule).length === 0) {
        Notify.failure("모든 여행 기간에 일정을 하나 이상 넣어주세요.", {
          position: "left-top",
          fontFamily: "SUIT-Regular",
          width: "310px",
        });
        return;
      }
    }

    // 2. 날짜 변환
    const startDateStr = travelStartDate
      ? new Date(travelStartDate).toISOString().slice(0, 10)
      : "";
    const endDateStr = travelEndDate
      ? new Date(travelEndDate).toISOString().slice(0, 10)
      : "";

    // 3. requestBody 생성 (countryName, regionName 등 실제 값 사용)
    const requestBody = {
      scheduleName: titleInput,
      startDate: startDateStr,
      endDate: endDateStr,
      howManyPeople: Number(peopleInput),
      countryName: countryName!,
      regionName: regionName!,
      detailSchedule: Object.entries(travelPeriod).map(([dayNumStr, _]) => {
        const dayNum = Number(dayNumStr);
        const daySchedule = schedule[dayNum];
        const scheduleByDay = Object.entries(daySchedule)
          .flatMap(([_, places]) =>
            places.map((place) => ({
              locationSeq: places.indexOf(place) + 1,
              startTime: place.period.split(" ~ ")[0],
              endTime: place.period.split(" ~ ")[1],
              placeName: place.placeName,
              placeType: place.placeType,
              placeId: place.placeId ?? "임시값",
              address: place.address ?? "주소 미정",
              latitude: place.latitude ?? 0,
              longitude: place.longitude ?? 0,
            }))
          )
          .filter(Boolean);
        return { daySeq: dayNum, scheduleByDay };
      }),
    };

    // 4. 여행 생성 요청
    createTravelPlanMutate(requestBody, {
      onSuccess: () => {
        Report.success(
          "Tranner",
          `${requestBody.regionName}으로 떠나는 ${requestBody.scheduleName}이 생성되었습니다.`,
          "홈으로 이동",
          {
            fontFamily: "SUIT-Regular",
          }
        );
      },
      onError: () => {
        Notify.failure("여행 생성 실패", {
          position: "left-top",
          fontFamily: "SUIT-Regular",
        });
      },
    });
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
        <div className="flex justify-between items-center">
          <input
            className="outline-none w-[160px] text-[24px] font-bold"
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <button
            onClick={handleCreateTravelPlan}
            className="text-white bg-common rounded-[4px] text-[12px] hover:cursor-pointer hover:bg-selected px-[9px] py-[6.5px]"
          >
            여행 생성하기
          </button>
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
        {TIMELINE.map((time) => (
          <ScheduleUnit
            key={time}
            dayNum={dayNum}
            time={time}
            numOfCard={schedule[time]?.length || 1}
            isHighlighted={highlightedTime === time}
            highlightedTime={highlightedTime}
            setHighlightedTime={setHighlightedTime}
            onDropPlace={handleDropPlace}
            schedule={schedule || {}}
            isNeededDeleteButton
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleScreen;

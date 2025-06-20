import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDateStore } from "../../stores/date.store";
import { getDateMap } from "../../utils/formatDateRange";
import DayCard from "../card/DayCard";
import ChangeDateOverlay from "../overlay/ChangeDateOverlay";
import ScheduleUnit from "../schedule/ScheduleUnit";
import { useDragDropManager } from "react-dnd";
import { useScheduleStore } from "../../stores/schedule.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTravelPlan, modifyTravelPlan } from "../../apis/travelPlan.api";
import { Confirm, Notify } from "notiflix";
import { useFavoriteListStore } from "../../stores/favoriteList.store";
import { TIMELINE } from "../../constants/timeline";
import { useNavigate } from "react-router";
import { getRoEuro } from "../../utils/getRoEuro";
import { getEiGa } from "../../utils/getEiGa";
import { buildDropPlaceHandler } from "../../utils/dropPlace";
import { useDaySelectionStore } from "../../stores/day.store";

const ScheduleScreen = () => {
  const queryClient = useQueryClient();

  const [titleInput, setTitleInput] = useState<string>("여행");
  const [peopleInput, setPeopleInput] = useState<string>("1");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  console.log(selectedDate);
  const [dayNum, setDayNum] = useState<number>(1);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [highlightedTime, setHighlightedTime] = useState<string | null>(null);
  const uniqueIdRef = useRef<string>(uuidv4());
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const storeCountryName = useFavoriteListStore((state) => state.countryName);
  const storeRegionName = useFavoriteListStore((state) => state.regionName);

  const travelStartDate = useDateStore((state) => state.travelStartDate);
  const travelEndDate = useDateStore((state) => state.travelEndDate);
  const travelPeriod = getDateMap(
    new Date(travelStartDate!),
    new Date(travelEndDate!)
  );
  const resetDates = useDateStore((state) => state.resetDates);

  const rawSchedule = useScheduleStore((state) => state.schedule[dayNum]);
  const schedule = useMemo(() => rawSchedule ?? {}, [rawSchedule]);
  const addPlaceToSchedule = useScheduleStore(
    (state) => state.addPlaceToSchedule
  );
  console.log("ScheduleScreen 렌더링 시 rawSchedule 상태 확인:", rawSchedule);
  console.log("ScheduleScreen 렌더링 시 schedule 상태 확인:", schedule);

  const isEditMode = useScheduleStore((state) => state.isEditMode);
  const setEditModeOff = useScheduleStore((state) => state.setEditModeOff);
  const editSchedule = useScheduleStore((state) => state.schedule);

  const scheduleId = useScheduleStore.getState().meta?.scheduleId;

  const navigate = useNavigate();
  console.log(isEditMode);

  const handleDropPlace = useMemo(
    () => buildDropPlaceHandler(dayNum, addPlaceToSchedule),
    [dayNum, addPlaceToSchedule]
  );

  const { mutate: createTravelPlanMutate } = useMutation({
    mutationKey: ["createTravelPlan", uniqueIdRef.current],
    mutationFn: createTravelPlan,
    onSuccess: (response) => {
      resetDates();
      console.log("✅ 여행 계획 생성 성공", response);

      // 여행 제목 길이에 비례해 픽셀 수 계산
      const baseWidth = 370; // 최소 너비(px)
      const charUnit = 6; // 글자당 픽셀(대략) - 폰트·패딩 맞춰 조절
      const calcWidth =
        baseWidth +
        storeCountryName!.length * charUnit +
        storeRegionName!.length * charUnit +
        titleInput.length * charUnit;
      Confirm.show(
        "<b>Tranner</b>",
        `<b>${storeCountryName} ${storeRegionName}</b>${getRoEuro(
          storeRegionName!
        )} 떠나는 <b>${titleInput}</b>${getEiGa(titleInput)} 생성되었습니다.`,
        "홈으로 이동",
        "마이페이지로 이동",
        () => {
          queryClient.invalidateQueries({ queryKey: ["readTravelPlanList"] });
          navigate("/");
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["readTravelPlanList"] });
          navigate("/my");
        },
        {
          width: `${calcWidth}px`,
          borderRadius: "8px",
          fontFamily: "SUIT-Regular",
          plainText: false,
          messageFontSize: "16px",
          titleFontSize: "20px",
          zindex: 9999,
        }
      );
    },
    onError: (err) => {
      console.error("❌ 여행 계획 생성 실패", err);
      Notify.failure(
        "여행 계획 생성에 실패했습니다.<br />잠시 후에 다시 이용해주세요.",
        {
          position: "left-top",
          fontFamily: "SUIT-Regular",
          plainText: false,
          fontSize: "15px",
          width: "270px",
          zindex: 9999,
        }
      );
    },
    retry: 1,
  });

  const { mutate: modifyTravelPlanMutate } = useMutation({
    mutationKey: ["modifyTravelPlan", scheduleId],
    mutationFn: modifyTravelPlan,
    onSuccess: (response) => {
      resetDates();
      setEditModeOff();
      console.log("✅ 여행 계획 수정 성공", response);

      // 여행 제목 길이에 비례해 픽셀 수 계산
      const baseWidth = 370; // 최소 너비(px)
      const charUnit = 6; // 글자당 픽셀(대략) - 폰트·패딩 맞춰 조절
      const calcWidth =
        baseWidth +
        storeCountryName!.length * charUnit +
        storeRegionName!.length * charUnit +
        titleInput.length * charUnit;
      Confirm.show(
        "<b>Tranner</b>",
        `<b>${storeCountryName} ${storeRegionName}</b>${getRoEuro(
          storeRegionName!
        )} 떠나는 <b>${titleInput}</b>${getEiGa(titleInput)} 수정되었습니다.`,
        "홈으로 이동",
        "마이페이지로 이동",
        () => {
          queryClient.invalidateQueries({ queryKey: ["readTravelPlanList"] });
          navigate("/");
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["readTravelPlanList"] });
          navigate("/my");
        },
        {
          width: `${calcWidth}px`,
          borderRadius: "8px",
          fontFamily: "SUIT-Regular",
          plainText: false,
          messageFontSize: "16px",
          titleFontSize: "20px",
        }
      );
    },
    onError: (err) => {
      console.error("❌ 여행 계획 수정 실패", err);
      Notify.failure(
        "여행 계획 수정에 실패했습니다.<br />잠시 후에 다시 이용해주세요.",
        {
          position: "left-top",
          fontFamily: "SUIT-Regular",
          plainText: false,
          fontSize: "15px",
          width: "270px",
          zindex: 9999,
        }
      );
    },
    retry: 1,
  });

  const handleChangeSelectedDate = (newDayNum: number) => {
    setDayNum(newDayNum);
    setSelectedDate(travelPeriod[newDayNum]);
    useDaySelectionStore.getState().setSelectedDay(newDayNum);
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
          fontSize: "15px",
          width: "350px",
          zindex: 9999,
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
      countryName: storeCountryName!,
      regionName: storeRegionName!,
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
    createTravelPlanMutate(requestBody);
  };

  const handleEditTravelPlan = () => {
    /* 0) 항상 ‘가장 최신’ 상태 스냅샷을 가져온다 */
    const { meta, schedule: scheduleMap } = useScheduleStore.getState();

    const { travelStartDate, travelEndDate } = useDateStore.getState();

    /* guard */
    if (!meta || !travelStartDate || !travelEndDate) {
      return;
    }

    /* 1) 메타 구조분해 ― 클릭 시점의 최신 값 */
    const {
      scheduleId,
      countryName: editCountryName,
      regionName: editRegionName,
    } = meta;
    const travelPeriod = getDateMap(
      new Date(travelStartDate!),
      new Date(travelEndDate!)
    );
    const dayCount = Object.keys(travelPeriod).length;

    /* 2) “비어 있는 날짜” 검증 */
    for (let d = 1; d <= dayCount; d++) {
      const daySched = scheduleMap[d];
      if (!daySched || Object.keys(daySched).length === 0) {
        Notify.failure("모든 여행 기간에 일정을 하나 이상 넣어주세요.", {
          position: "left-top",
          fontFamily: "SUIT-Regular",
          fontSize: "15px",
          width: "350px",
          zindex: 9999,
        });
        return;
      }
    }

    /* 3) 날짜 ISO-string 변환 */
    const startDateStr = new Date(travelStartDate!).toISOString().slice(0, 10);
    const endDateStr = new Date(travelEndDate!).toISOString().slice(0, 10);

    if (scheduleId !== undefined) {
      /* 4) 백엔드 요청 바디 생성 */
      const requestBody = {
        scheduleId, // ✅ 수정 시엔 반드시 포함
        scheduleName: titleInput,
        startDate: startDateStr,
        endDate: endDateStr,
        howManyPeople: Number(peopleInput),
        countryName: editCountryName, // meta 에서 가져온 값
        regionName: editRegionName,
        detailSchedule: Object.entries(travelPeriod).map(([daySeqStr]) => {
          const daySeq = Number(daySeqStr); // 1, 2, 3 …
          const daySchedule = scheduleMap[daySeq];

          /** 하루치 → scheduleByDay[] 변환 */
          const scheduleByDay = Object.entries(daySchedule)
            .flatMap(([_, places]) =>
              places.map((p, idx) => ({
                locationSeq: idx + 1, // 순서
                startTime: p.period.split(" ~ ")[0], // "08 : 00"
                endTime: p.period.split(" ~ ")[1], // "09 : 00"
                placeName: p.placeName,
                placeType: p.placeType,
                placeId: p.placeId ?? "임시값",
                address: p.address ?? "주소 미정",
                latitude: p.latitude ?? 0,
                longitude: p.longitude ?? 0,
              }))
            )
            .filter(Boolean);

          return { daySeq, scheduleByDay };
        }),
      };

      /* 5) 수정 API 호출 */
      modifyTravelPlanMutate(requestBody);
    }
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

  useEffect(() => {
    if (storeRegionName) setTitleInput(`${storeRegionName} 여행`);
  }, [storeRegionName]);

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
          {isEditMode ? (
            <button
              onClick={handleEditTravelPlan}
              className="text-white bg-common rounded-[4px] text-[12px] hover:cursor-pointer hover:bg-selected px-[9px] py-[6.5px]"
            >
              여행 수정하기
            </button>
          ) : (
            <button
              onClick={handleCreateTravelPlan}
              className="text-white bg-common rounded-[4px] text-[12px] hover:cursor-pointer hover:bg-selected px-[9px] py-[6.5px]"
            >
              여행 생성하기
            </button>
          )}
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
        {TIMELINE.map((time) => {
          const daySchedule = isEditMode
            ? editSchedule[dayNum] ?? {} // editSchedule은 {[day]: DailySchedule}
            : schedule; // 이미 DailySchedule
          return (
            <ScheduleUnit
              key={time}
              dayNum={dayNum}
              time={time}
              numOfCard={schedule[time]?.length || 1}
              isHighlighted={highlightedTime === time}
              highlightedTime={highlightedTime}
              setHighlightedTime={setHighlightedTime}
              onDropPlace={handleDropPlace}
              schedule={daySchedule}
              isNeededDeleteButton
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleScreen;

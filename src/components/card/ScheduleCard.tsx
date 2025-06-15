import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import { useScheduleStore } from "../../stores/schedule.store";
import { Notify } from "notiflix";
import TimeEditor from "../schedule/TimeEditor";
import { useDrag } from "react-dnd";
import { getPeriodParts } from "../../utils/getPeriodParts";
import { getEmptyImage } from "react-dnd-html5-backend";

interface ScheduleCardProps {
  isNeededDeleteButton?: boolean;
  isFirstSchedule?: boolean;
  placeName: string;
  placeType: string;
  period: string;
  daySeq: number;
  time: string;
  index: number;
  isDragPreview?: boolean;
}

const ScheduleCard = memo(
  ({
    isNeededDeleteButton = false,
    isFirstSchedule,
    placeName,
    placeType,
    period,
    daySeq,
    time,
    index,
  }: ScheduleCardProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const { startHour, startMin, endHour, endMin } = getPeriodParts(period);

    const [startHourState, setStartHour] = useState<string>(startHour);
    const [startMinState, setStartMin] = useState<string>(startMin);
    const [endHourState, setEndHour] = useState<string>(endHour);
    const [endMinState, setEndMin] = useState<string>(endMin);

    // TimeEditor에서 모든 인풋의 blur 상태를 관리
    const [inputFocusCount, setInputFocusCount] = useState(0);

    const handleInputFocus = () => setInputFocusCount((c) => c + 1);
    const handleInputBlur = () => setInputFocusCount((c) => c - 1);

    const updatePlacePeriod = useScheduleStore(
      (state) => state.updatePlacePeriod
    );
    const removePlaceFromSchedule = useScheduleStore(
      (state) => state.removePlaceFromSchedule
    );

    // 1. DOM 요소에 접근하기 위해 useRef를 사용해 HTMLDivElement에 대한 참조 생성
    const ref = useRef<HTMLDivElement>(null);

    // 2. useDrag 훅을 사용해 드래그 가능한 항목 정의
    // - type: 드롭 대상과 일치시킬 고유 문자열 (Drop 영역에서도 이걸 기준으로 매칭됨)
    // - item: 드래그될 때 전달할 데이터 (드롭 시 이 정보가 drop 함수로 전달됨)
    // - collect: 현재 드래그 상태를 수집해서 반환하는 함수
    const [{ isDragging }, drag, preview] = useDrag({
      type: "SCHEDULE_CARD", // 이 드래그 아이템의 타입. Drop 쪽에서도 같은 타입을 사용해야 드롭 가능
      item: {
        type: "SCHEDULE_CARD",
        fromTime: time,
        fromIndex: index,
        placeName,
        placeType,
        period,
        daySeq,
        time,
        index,
      }, // 드래그 시 전달될 데이터. Drop 함수에서 이 데이터를 사용할 수 있음
      canDrag: inputFocusCount === 0 && !isEditing, // input에 포커스되고, 편집 중이면 드래그 비활성화!
      collect: (monitor) => ({
        isDragging: monitor.isDragging(), // 현재 드래그 중인지 여부를 수집 (스타일 변경 등에 사용)
      }),
    });

    // 3. 생성한 drag 함수를 DOM 참조(ref)에 연결
    // 이걸 해야 해당 DOM 요소가 드래그 가능해짐
    useEffect(() => {
      // 기본 preview 제거
      preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);
    drag(ref); // 연결

    // 시간 인풋 값 변경
    const handleTimeChange = (
      sh: string,
      sm: string,
      eh: string,
      em: string
    ) => {
      setStartHour(sh);
      setStartMin(sm);
      setEndHour(eh);
      setEndMin(em);
      setError(false);
    };

    // 시간 수정 완료 (엔터/blur)
    const handleValidSubmit = () => {
      const sh = startHour.padStart(2, "0");
      const sm = startMin.padStart(2, "0");
      const eh = endHour.padStart(2, "0");
      const em = endMin.padStart(2, "0");
      const start = Number(sh) * 60 + Number(sm);
      const end = Number(eh) * 60 + Number(em);

      const newPeriod = `${sh}:${sm} ~ ${eh}:${em}`;
      if (start >= end) {
        setError(true);
        Notify.failure("여행 시간을 정확히 입력해주세요.", {
          position: "left-top",
          fontFamily: "SUIT-Regular",
        });
        return;
      }
      // **여기가 중요!**
      if (newPeriod === period) {
        setIsEditing(false);
        setError(false);
        return; // 기존 값과 같으면 아무것도 하지 않음
      }
      setIsEditing(false);
      setError(false);
      updatePlacePeriod(daySeq, time, newPeriod, index);
    };

    const handleEdit = () => {
      const { startHour, startMin, endHour, endMin } = getPeriodParts(period);
      setStartHour(startHour);
      setStartMin(startMin);
      setEndHour(endHour);
      setEndMin(endMin);
      setIsEditing(true);
      setError(false);
    };

    const handleDelete = () => {
      if (window.confirm("정말 일정을 삭제하시겠습니까?")) {
        removePlaceFromSchedule(daySeq, time, index);
      }
    };

    const validateAndSubmit = () => {
      const sh = startHourState.padStart(2, "0");
      const sm = startMinState.padStart(2, "0");
      const eh = endHourState.padStart(2, "0");
      const em = endMinState.padStart(2, "0");
      const start = Number(sh) * 60 + Number(sm);
      const end = Number(eh) * 60 + Number(em);

      const newPeriod = `${sh}:${sm} ~ ${eh}:${em}`;
      if (start >= end) {
        setError(true);
        Notify.failure("여행 시간을 정확히 입력해주세요.", {
          position: "left-top",
          fontFamily: "SUIT-Regular",
        });
        // 에디터 닫지 않음!
        return;
      }
      // 정상 입력이면
      setError(false);
      setIsEditing(false);
      updatePlacePeriod(daySeq, time, newPeriod, index);
    };

    // 카드 스타일
    const cardClass = clsx(
      "rounded-[6px] border py-[5px] px-[8px] h-fit",
      isNeededDeleteButton
        ? "border-[#FF7FF5] bg-[#ffe4fe] w-[228px]"
        : "border-[#7FFFF2] bg-[#e5fffc] w-fit max-w-[2280px]",
      isFirstSchedule && "mt-[5px]",
      error && "!border-[#FF7F81] !bg-[#ffe4e3]"
    );

    // 모든 인풋에서 포커스가 빠졌을 때만 유효성 검사
    useEffect(() => {
      if (isEditing && inputFocusCount === 0) {
        validateAndSubmit();
      }
      // eslint-disable-next-line
    }, [inputFocusCount]);

    return (
      <div
        ref={ref}
        className={cardClass}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <div className="flex gap-[8px] items-center">
          <p className="text-[14px] font-bold truncate">{placeName}</p>
          {placeType !== "ETC" && (
            <div
              className={clsx(
                "flex items-center px-[7px] py-[2px] rounded-[50px] gap-[3px] h-fit w-fit shrink-0",
                isNeededDeleteButton ? "bg-[#C2A0C1]" : "bg-[#A0C2BE]",
                error && "!bg-[#dfc7c8]"
              )}
            >
              <img
                src={
                  placeType === "ATTRACTION"
                    ? "/images/white-attraction.svg"
                    : placeType === "RESTAURANT"
                    ? "/images/white-restaurant.svg"
                    : placeType === "HOTEL"
                    ? "/images/white-accommodation.svg"
                    : ""
                }
                alt="icon"
                className="text-[7px] h-[7px]"
              />
              <p className="text-[9px] text-white">
                {placeType === "ATTRACTION"
                  ? "명소"
                  : placeType === "RESTAURANT"
                  ? "식당"
                  : placeType === "HOTEL"
                  ? "숙소"
                  : ""}
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-end min-h-[16px]">
          {isEditing ? (
            <TimeEditor
              startHour={startHourState}
              startMin={startMinState}
              endHour={endHourState}
              endMin={endMinState}
              onChange={handleTimeChange}
              onSubmit={handleValidSubmit}
              onInputFocus={handleInputFocus}
              onInputBlur={handleInputBlur}
            />
          ) : (
            <div
              className="text-[11px] leading-[16px] h-[16px] flex items-center gap-[2px] min-h-[16px] cursor-pointer"
              style={{ minHeight: 16 }}
              onClick={handleEdit}
            >
              {`${startHour.padStart(2, "0")}:${startMin.padStart(
                2,
                "0"
              )} ~ ${endHour.padStart(2, "0")}:${endMin.padStart(2, "0")}`}
            </div>
          )}
          {isNeededDeleteButton && (
            <button
              className="text-[10px] text-[#AAAAAA] hover:cursor-pointer"
              onClick={handleDelete}
            >
              삭제
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default ScheduleCard;

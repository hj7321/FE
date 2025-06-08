import { useRef } from "react";
import { useDrop } from "react-dnd";

const TimeSlot = ({ time }: { time: string }) => {
  // 1. 드롭 영역으로 사용할 DOM 요소에 접근하기 위한 useRef 생성
  // HTMLDivElement에 연결할 수 있도록 타입 지정
  const ref = useRef<HTMLDivElement>(null);

  // 2. useDrop 훅을 사용해 드롭 가능한 영역 정의
  // - accept: 어떤 타입의 드래그 아이템을 받을 수 있는지 지정
  // - drop: 드래그된 아이템이 이 영역에 놓였을 때 실행될 함수
  // - collect: 드롭 상태(예: 현재 드롭 중인지 여부)를 수집
  const [{ isOver }, drop] = useDrop({
    // 2-1. 이 Drop Zone이 받을 수 있는 드래그 아이템의 type 설정
    // Drag 쪽에서 지정한 type과 일치해야 drop 가능
    accept: "PLACE_CARD",
    // 2-2. 아이템이 drop 되었을 때 호출되는 콜백 함수
    // drag 쪽에서 정의한 item 속성을 여기서 받아 사용 가능
    drop: (item: { cardName: string }) => {
      alert(`${item.cardName}를 ${time}에 추가했습니다!`);
      // TODO: Zustand 상태로 일정 추가 로직 구현
    },
    // 2-3. 현재 드롭 영역 위에 드래그 요소가 올라와 있는지 여부를 감지
    // 스타일을 다르게 줄 때 유용함 (예: 배경색 변경 등)
    collect: (monitor) => ({
      isOver: monitor.isOver(), // 현재 드래그 요소가 위에 올라와 있으면 true
    }),
  });

  // 3. 위에서 정의한 drop 함수를 실제 DOM ref에 연결
  // 이렇게 해야 이 영역이 실제로 드롭을 받을 수 있게 됨
  drop(ref);

  return (
    <div
      ref={ref}
      className={`h-[50px] p-2 border rounded mb-2 ${
        isOver ? "bg-purple-100" : "bg-white"
      }`}
    >
      <div>{time}</div>
    </div>
  );
};

export default TimeSlot;

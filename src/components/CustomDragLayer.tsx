import { useDragLayer } from "react-dnd";
import TravelPlaceCard from "./card/TravelPlaceCard";
import ScheduleCard from "./card/ScheduleCard";

// 공통 레이어 스타일
const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  transform: "translate3d(0,0,0)",
};

const getItemStyles = (initialOffset: any, currentOffset: any) => {
  if (!initialOffset || !currentOffset) return { display: "none" };
  const { x, y } = currentOffset;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

const CustomDragLayer = () => {
  const { isDragging, item, itemType, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  if (!isDragging || !item) return null;

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {/* 장소 카드 프리뷰 */}
        {itemType === "PLACE_CARD" && (
          <TravelPlaceCard
            cardName={item.cardName}
            cardImg={item.cardImg}
            placeId={item.placeId}
            placeType={item.placeType}
            isFavorite={item.isFavorite}
            isDragPreview // 드래그 프리뷰임을 표시하는 prop
          />
        )}
        {/* 일정 카드 프리뷰 */}
        {itemType === "SCHEDULE_CARD" && (
          <ScheduleCard
            placeName={item.placeName}
            placeType={item.placeType}
            period={item.period}
            isNeededDeleteButton={true}
            isFirstSchedule={false}
            daySeq={item.daySeq}
            time={item.time}
            index={item.index}
            isDragPreview // 드래그 프리뷰임을 표시하는 prop
          />
        )}
      </div>
    </div>
  );
};

export default CustomDragLayer;

import { useDragLayer } from "react-dnd";

const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
};

const getItemStyles = (initialOffset: any, currentOffset: any) => {
  if (!initialOffset || !currentOffset) return { display: "none" };
  const { x, y } = currentOffset;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

const CustomDragLayer = () => {
  const { isDragging, item, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  if (!isDragging) return null;

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <div className="flex flex-col gap-[3px] p-[10px] pb-[5px] bg-white w-[157px] h-fit rounded-[10px] relative shadow-md">
          <img
            src={item.cardImg}
            alt={item.cardName}
            className="text-[12px] rounded-[4px] h-[107px] w-[137px] object-cover"
          />
          <div className="flex justify-between">
            <div>
              <p className="text-[14px]">{item.cardName}</p>
              <p className="text-[12px]">장소</p>
            </div>
            <img
              src="/images/heart.svg"
              alt="heart"
              className="text-[10px] w-[18px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDragLayer;

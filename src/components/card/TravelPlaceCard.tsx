import { memo, useEffect, useRef } from "react";
import { useModalStore } from "../../stores/modal.store";
import PlaceModal from "../modal/PlaceModal";
import { DragPreviewImage, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import useReadPlaceDetail from "../../hooks/useReadPlaceDetail";
import clsx from "clsx";
import { useMapStore } from "../../stores/map.store";

interface TravelPlaceCardProps {
  cardName: string;
  cardImg: string;
  placeId: string;
  placeType: string | undefined;
  isFavorite?: boolean;
}

const TravelPlaceCard = memo(
  ({
    cardName,
    cardImg,
    placeId,
    placeType,
    isFavorite = false,
  }: TravelPlaceCardProps) => {
    const openModal = useModalStore((state) => state.openModal);

    const { refetch } = useReadPlaceDetail(placeId);

    // 1. DOM 요소에 접근하기 위해 useRef를 사용해 HTMLDivElement에 대한 참조 생성
    const ref = useRef<HTMLDivElement>(null);

    // 2. useDrag 훅을 사용해 드래그 가능한 항목 정의
    // - type: 드롭 대상과 일치시킬 고유 문자열 (Drop 영역에서도 이걸 기준으로 매칭됨)
    // - item: 드래그될 때 전달할 데이터 (드롭 시 이 정보가 drop 함수로 전달됨)
    // - collect: 현재 드래그 상태를 수집해서 반환하는 함수
    const [{ isDragging }, drag, preview] = useDrag({
      type: "PLACE_CARD", // 이 드래그 아이템의 타입. Drop 쪽에서도 같은 타입을 사용해야 드롭 가능
      item: { cardName, cardImg, isFavorite }, // 드래그 시 전달될 데이터. Drop 함수에서 이 데이터를 사용할 수 있음
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

    const handleOpenModal = async () => {
      const { data } = await refetch();
      if (!data) return;

      // 지도 중심 위치 업데이트
      useMapStore
        .getState()
        .setCenter(data.latitude, data.longitude, data.name);

      // 모달 열기
      openModal(
        <PlaceModal cardName={cardName} cardImg={cardImg} placeData={data} />
      );
    };

    return (
      <>
        <DragPreviewImage connect={preview} src={cardImg} />
        <div
          ref={ref}
          onClick={handleOpenModal}
          style={{
            boxShadow: `inset 1px 1px 0 rgba(0, 0, 0, 0.05), 4px 4px 10px rgba(0, 0, 0, 0.25)`,
            opacity: isDragging ? 0.5 : 1,
          }}
          className="flex flex-col gap-[3px] p-[10px] pb-[5px] bg-white w-[157px] h-fit rounded-[10px] relative hover:cursor-pointer"
        >
          <img
            src={cardImg}
            alt={cardName}
            loading="lazy"
            className="text-[11px] rounded-[4px] h-[107px] w-[137px] object-cover"
          />
          <div className="flex justify-between">
            <div>
              <p
                className={clsx(
                  "text-[14px] overflow-hidden whitespace-nowrap text-ellipsis",
                  isFavorite ? "w-[117px]" : "w-[137px]"
                )}
              >
                {cardName}
              </p>
              {placeType && (
                <p className="text-[11px]">
                  {placeType === "ATTRACTION"
                    ? "명소"
                    : placeType === "RESTAURANT"
                    ? "식당"
                    : placeType === "HOTEL"
                    ? "숙소"
                    : "-"}
                </p>
              )}
            </div>
            {isFavorite && (
              <img
                src="/images/heart.svg"
                alt="heart"
                className="text-[10px] w-[18px]"
              />
            )}
          </div>
        </div>
      </>
    );
  }
);

export default TravelPlaceCard;

import clsx from "clsx";
import TravelPlanModal from "../modal/TravelPlanModal";
import { useModalStore } from "../../stores/modal.store";

interface TravelPlanCardProps {
  cardImg: string;
  travelTitle: string;
  travelStartDate: string;
  travelEndDate: string;
  travelPeople: number;
  travelPlace: string;
  isEnded: boolean;
}

const TravelPlanCard = ({
  cardImg,
  travelTitle,
  travelStartDate,
  travelEndDate,
  travelPeople,
  travelPlace,
  isEnded,
}: TravelPlanCardProps) => {
  const { openModal } = useModalStore();

  const handleOpenModal = () => {
    openModal(
      <TravelPlanModal
        cardImg="/images/cities/바르셀로나.jpg"
        travelTitle="황금연휴에 가는 해외여행😊"
        travelStartDate="2025.05.01"
        travelEndDate="2025.05.07"
        travelPeople={8}
        travelPlace="스페인 바르셀로나"
        isEnded={true}
      />
    );
  };

  return (
    <div
      onClick={handleOpenModal}
      className="flex bg-white p-[10px] rounded-[8px] h-fit gap-[10px] w-[650.4px] [box-shadow:4px_8px_4px_rgba(0,0,0,0.1)] hover:cursor-pointer"
    >
      <img
        src={cardImg}
        alt={travelPlace}
        className="rounded-[4px] w-[280px] h-[170px] object-cover text-[12px]"
      />
      <div className="w-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <p className="text-[20px] font-bold">{travelTitle}</p>

            <div
              className={clsx(
                "mt-[2px] text-white text-[13px] rounded-[4px] px-[7px] py-[2px] h-fit w-fit",
                isEnded ? "bg-[#72D862]" : "bg-[#F68363]"
              )}
            >
              {isEnded ? "완료" : "예정"}
            </div>
          </div>
          <p className="text-[#8e8e8e] mb-[15px]">
            {travelStartDate} ~ {travelEndDate}
          </p>
          <p>인원: {travelPeople}명</p>
          <p>여행 지역: {travelPlace}</p>
        </div>
        <div className="flex gap-[15px] justify-end">
          <button className="text-[13px] text-[#a6a6a6] hover:cursor-pointer">
            상세보기
          </button>
          <button className="text-[13px] text-[#a6a6a6] hover:cursor-pointer">
            수정
          </button>
          <button className="text-[13px] text-[#a6a6a6] hover:cursor-pointer">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanCard;

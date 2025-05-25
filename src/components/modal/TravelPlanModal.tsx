import clsx from "clsx";
import TravelPlanInfo from "../information/TravelPlanInfo";
import { useModalStore } from "../../stores/modal.store";

interface TravelPlanModalProps {
  cardImg: string;
  travelPlace: string;
  travelTitle: string;
  travelStartDate: string;
  travelEndDate: string;
  travelPeople: number;
  isEnded: boolean;
}

const TravelPlanModal = ({
  cardImg,
  travelPlace,
  travelTitle,
  travelStartDate,
  travelEndDate,
  travelPeople,
  isEnded,
}: TravelPlanModalProps) => {
  const { closeModal } = useModalStore();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-[10px] p-[20px] pr-[10px] bg-white rounded-[8px] w-3/4 h-[570px] [box-shadow:4px_4px_20px_rgba(0,0,0,0.25)] relative"
    >
      <button onClick={closeModal} className="absolute right-[12px] top-[12px]">
        <img
          src="/images/close.svg"
          alt="close"
          className="text-[10px] h-[14px] hover:cursor-pointer"
        />
      </button>
      <div className="flex gap-[10px]">
        <img
          src={cardImg}
          alt={travelPlace}
          className="rounded-[4px] w-[280px] h-[170px] object-cover text-[12px]"
        />
        <div className="flex-grow">
          <div className="flex gap-[20px] items-center">
            <p className="text-[25px] font-bold">{travelTitle}</p>
            <div
              className={clsx(
                "mt-[2px] text-white text-[13px] rounded-[4px] px-[7px] py-[2px] h-fit w-fit mb-[3px]",
                isEnded ? "bg-[#72D862]" : "bg-[#F68363]"
              )}
            >
              {isEnded ? "완료" : "예정"}
            </div>
          </div>
          <p className="text-[#8e8e8e] mb-[15px] text-[17px]">
            {travelStartDate} ~ {travelEndDate}
          </p>
          <p className="text-[18px]">인원: {travelPeople}명</p>
          <p className="text-[18px]">여행 지역: {travelPlace}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-[18px] overflow-y-auto scrollbar-custom pr-[10px] gap-y-[30px]">
        <TravelPlanInfo dayNum={1} date="05/01 (목)" />
        <TravelPlanInfo dayNum={2} date="05/02 (금)" />
        <TravelPlanInfo dayNum={3} date="05/03 (토)" />
        <TravelPlanInfo dayNum={4} date="05/04 (일)" />
        <TravelPlanInfo dayNum={5} date="05/05 (월)" />
        <TravelPlanInfo dayNum={6} date="05/06 (화)" />
        <TravelPlanInfo dayNum={7} date="05/07 (수)" />
        <TravelPlanInfo dayNum={8} date="05/08 (목)" />
        <TravelPlanInfo dayNum={9} date="05/09 (목)" />
        <TravelPlanInfo dayNum={10} date="05/10 (금)" />
        <TravelPlanInfo dayNum={11} date="05/11 (토)" />
        <TravelPlanInfo dayNum={12} date="05/12 (일)" />
        <TravelPlanInfo dayNum={13} date="05/13 (월)" />
        <TravelPlanInfo dayNum={14} date="05/14 (화)" />
      </div>
    </div>
  );
};

export default TravelPlanModal;

import clsx from "clsx";
import { useModalStore } from "../../stores/modal.store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CreateTravelSchedule } from "../../types/travelPlan.type";
import { getDateMap } from "../../utils/formatDateRange";
import TravelPlanInfo from "../information/TravelPlanInfo";

interface TravelPlanModalProps {
  schedule: CreateTravelSchedule;
  cardImg: string;
  isEnded: boolean;
}

const TravelPlanModal = ({
  schedule,
  cardImg,
  isEnded,
}: TravelPlanModalProps) => {
  const {
    startDate,
    endDate,
    countryName,
    regionName,
    scheduleName,
    howManyPeople,
    detailSchedule,
  } = schedule;

  const travelPeriod = getDateMap(new Date(startDate), new Date(endDate));
  console.log(schedule);
  console.log(travelPeriod);

  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-[10px] p-[20px] pr-[10px] bg-white rounded-[8px] w-3/4 h-[570px] [box-shadow:4px_4px_20px_rgba(0,0,0,0.25)] relative"
      >
        <button
          onClick={closeModal}
          className="absolute right-[12px] top-[12px]"
        >
          <img
            src="/images/close.svg"
            alt="close"
            className="text-[10px] h-[14px] hover:cursor-pointer"
          />
        </button>
        <div className="flex gap-[10px]">
          <img
            src={cardImg}
            alt={`${countryName} ${regionName}`}
            className="rounded-[4px] w-[280px] h-[170px] object-cover text-[12px]"
          />
          <div className="flex-grow">
            <div className="flex gap-[20px] items-center">
              <p className="text-[25px] font-bold">{scheduleName}</p>
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
              {startDate} ~ {endDate}
            </p>
            <p className="text-[18px]">인원: {howManyPeople}명</p>
            <p className="text-[18px]">
              여행 지역: {countryName} {regionName}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-[18px] overflow-y-auto scrollbar-custom pr-[10px] gap-y-[30px]">
          {detailSchedule.map((schedule, idx) => (
            <TravelPlanInfo
              key={`${scheduleName}_${travelPeriod[schedule.daySeq]}_${
                schedule.daySeq
              }_${idx}`}
              dayNum={schedule.daySeq}
              date={travelPeriod[schedule.daySeq]}
              schedule={schedule.scheduleByDay}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TravelPlanModal;

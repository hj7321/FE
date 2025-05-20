import DayCard from "../card/DayCard";
import ScheduleCard from "../card/ScheduleCard";
import TimeInfo from "../information/TimeInfo";
import Timeline from "../Timeline";

const ScheduleScreen = () => {
  return (
    <div className="bg-white h-screen flex flex-col border-r border-[#EDEDED] w-[290px]">
      <div className="px-[15px] py-[12px]">
        <div className="text-[24px] font-bold">여행 1</div>
        <div className="text-[14px] text-[#939393] mt-[-3px] mb-[2px]">
          인원 1명
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[8px]">
            <DayCard dayNum={1} isSelected={true} />
            <div className="flex gap-[5px]">
              <DayCard dayNum={2} />
              <DayCard dayNum={3} />
            </div>
          </div>
          <p className="text-[10px] hover:cursor-pointer text-[#989898]">
            날짜 변경
          </p>
        </div>
      </div>
      <div className="px-[15px] pt-[5px] py-[15px] overflow-y-auto scrollbar-custom w-[278px]">
        <TimeInfo dayNum={1} time="07 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
          <ScheduleCard
            isFirstSchedule
            placeName="트레비 분수"
            placePurpose="관광"
            period="09:00 ~ 09:45"
            isNeededDeleteButton
          />
        </div>
        <TimeInfo dayNum={1} time="08 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="09 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="10 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="11 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="12 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="13 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="14 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="15 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="16 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="17 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="18 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="19 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="20 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
        <TimeInfo dayNum={1} time="21 : 00" />
        <div className="flex gap-[10px]">
          <Timeline dayNum={1} numOfCard={1} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleScreen;

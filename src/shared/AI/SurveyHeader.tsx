import clsx from "clsx";
import { useEssentialSurveyStore } from "../../stores/essentialSurvey.store";

interface SurveyHeaderProps {
  isClickedEssential: boolean;
  setIsClickedEssential: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyHeader = ({
  isClickedEssential,
  setIsClickedEssential,
}: SurveyHeaderProps) => {
  const { people, startDate, endDate, budget } = useEssentialSurveyStore();
  // const {
  //   transportation,
  //   preferTravelPurpose,
  //   nonPreferTravelPurpose,
  //   preferAccommodation,
  //   nonPreferAccommodation,
  //   preferRestaurant,
  //   nonPreferRestaurant,
  // } = useOptionalSurveyStore();

  const handleSubmit = () => {
    if (
      people === null ||
      startDate === null ||
      endDate === null ||
      budget === null
    ) {
      alert("모든 필수 응답을 입력해주세요.");
      return;
    }

    // 제출 로직 추가

    console.log("제출 완료");
  };

  return (
    <aside className="pl-[8px] flex justify-between items-center w-[310px]">
      <div className="flex gap-[20px]">
        <button
          className={clsx(
            isClickedEssential
              ? "text-black font-bold border-b-2"
              : "text-[#A4A4A4]",
            "hover:cursor-pointer text-[15px]"
          )}
          onClick={() => setIsClickedEssential(true)}
        >
          필수 응답
        </button>
        <button
          className={clsx(
            isClickedEssential
              ? "text-[#A4A4A4]"
              : "text-black font-bold border-b-2",
            "hover:cursor-pointer text-[15px]"
          )}
          onClick={() => setIsClickedEssential(false)}
        >
          선택 응답
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-common py-[5px] px-[12px] text-white rounded-[4px] text-[12px] hover:cursor-pointer hover:bg-selected"
      >
        제출하기
      </button>
    </aside>
  );
};

export default SurveyHeader;

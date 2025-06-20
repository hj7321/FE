import clsx from "clsx";
import { useEssentialSurveyStore } from "../../stores/essentialSurvey.store";
import { Notify } from "notiflix";
import { useOptionalSurveyStore } from "../../stores/optionalSurvey.store";
import { useMutation } from "@tanstack/react-query";
import { sendSurveyRequest } from "../../apis/survey.api";
import { TravelPlanPreferences } from "../../types/survey.type";

interface SurveyHeaderProps {
  isClickedEssential: boolean;
  setIsClickedEssential: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyHeader = ({
  isClickedEssential,
  setIsClickedEssential,
}: SurveyHeaderProps) => {
  const {
    people,
    startDate,
    endDate,
    budget,
    region,
    reset: resetEssential,
  } = useEssentialSurveyStore();
  const {
    transportation,
    preferTravelPurpose,
    nonPreferTravelPurpose,
    preferAccommodation,
    nonPreferAccommodation,
    preferRestaurant,
    nonPreferRestaurant,
    reset: resetOptional,
  } = useOptionalSurveyStore();

  const { mutate: sendSurveyRequestMutate } = useMutation({
    mutationKey: ["sendSurveyRequest"],
    mutationFn: sendSurveyRequest,
    onSuccess: (response) => {
      console.log("✅ 설문 제출 완료", response);
      Notify.success("설문이 제출되었습니다!", {
        width: "260px",
        fontSize: "15px",
        fontFamily: "SUIT-Regular",
        zindex: 9999,
      });
      resetEssential();
      resetOptional();
    },
    onError: (err) => {
      console.error("❌ 설문 제출 실패", err);
      Notify.failure(
        "설문이 제출되지 않았습니다.<br />잠시 후에 다시 이용해주세요.",
        {
          fontSize: "15px",
          fontFamily: "SUIT-Regular",
          plainText: false,
          width: "260px",
          position: "center-top",
          zindex: 9999,
          timeout: 5000,
        }
      );
    },
  });

  const handleSubmit = () => {
    if (!people || !startDate || !endDate || !budget) {
      Notify.failure("모든 필수 응답을 입력해주세요.", {
        width: "260px",
        fontSize: "15px",
        fontFamily: "SUIT-Regular",
        zindex: 9999,
      });
      return;
    }

    const requestBody: TravelPlanPreferences = {
      travel_period: {
        start_date: startDate,
        end_date: endDate,
      },
      group: {
        num_people: people,
      },
      budget: {
        min: 5000,
        max: budget,
      },
      region: region!, // "대한민국 서울특별시"
      transportation_preferences: transportation,
      travel_style_preferences: {
        // 여러 카테고리의 선호도를 하나로 합쳐 전달
        prefer: [
          ...preferTravelPurpose,
          ...preferAccommodation,
          ...preferRestaurant,
        ],
        nonPrefer: [
          ...nonPreferTravelPurpose,
          ...nonPreferAccommodation,
          ...nonPreferRestaurant,
        ],
      },
    };

    sendSurveyRequestMutate(requestBody);

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

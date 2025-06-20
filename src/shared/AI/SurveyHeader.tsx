import clsx from "clsx";
import { useEssentialSurveyStore } from "../../stores/essentialSurvey.store";
import { Notify } from "notiflix";
import { useOptionalSurveyStore } from "../../stores/optionalSurvey.store";
import { useMutation } from "@tanstack/react-query";
import { sendSurveyRequest } from "../../apis/survey.api";
import { TravelPlanPreferences } from "../../types/survey.type";
import { parseDetailSchedule } from "../../utils/parseDetailSchedult";
import { useDateStore } from "../../stores/date.store";
import { useScheduleStore } from "../../stores/schedule.store";
import { useNavigate } from "react-router";

interface SurveyHeaderProps {
  isClickedEssential: boolean;
  setIsClickedEssential: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyHeader = ({
  isClickedEssential,
  setIsClickedEssential,
  setIsLoading,
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
  const setDates = useDateStore((state) => state.setDates);
  const setMeta = useScheduleStore((state) => state.setMeta);
  const setSchedule = useScheduleStore((state) => state.setSchedule);
  const navigate = useNavigate();

  const { mutate: sendSurveyRequestMutate } = useMutation({
    mutationKey: ["sendSurveyRequest"],
    mutationFn: sendSurveyRequest,
    onMutate: () => setIsLoading(true),
    onSuccess: (response) => {
      const data =
        typeof response === "string" ? JSON.parse(response) : response; // ⭐️ 필수 수정

      console.log("✅ 설문 제출 완료", data);
      console.log("detailSchedule: ", data.detailSchedule); // 정상 출력

      const schedule = parseDetailSchedule(data.detailSchedule);

      setDates(new Date(data.startDate), new Date(data.endDate));
      setMeta({
        startDate: data.startDate,
        endDate: data.endDate,
        howManyPeople: Number(data.numOfPeople),
        countryName: data.countryName,
        regionName: data.regionName,
      });

      setSchedule(schedule);
      console.log("스케줄 확인:", schedule);
      navigate("/travel-plan");
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
          zindex: 9999,
          timeout: 5000,
        }
      );
    },
    onSettled: () => setIsLoading(false),
  });

  const handleSubmit = () => {
    if (!people || !startDate || !endDate || !budget || !region) {
      Notify.failure("모든 필수 응답을 입력해주세요.", {
        width: "260px",
        fontSize: "15px",
        fontFamily: "SUIT-Regular",
        zindex: 9999,
      });
      return;
    }

    const requestBody: TravelPlanPreferences = {
      numOfPeople: people, // 동행 인원
      travelPeriod: { startDate, endDate }, // 여행 기간
      travelBudget: budget, // 총예산
      transportation, // ["버스", "도보", …]
      region,
      preference: {
        travelPurpose: {
          prefer: preferTravelPurpose,
          nonPrefer: nonPreferTravelPurpose,
        },
        accommodation: {
          prefer: preferAccommodation,
          nonPrefer: nonPreferAccommodation,
        },
        restaurant: {
          prefer: preferRestaurant,
          nonPrefer: nonPreferRestaurant,
        },
      },
    };

    sendSurveyRequestMutate(requestBody);
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

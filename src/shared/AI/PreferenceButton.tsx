import clsx from "clsx";
import { useOptionalSurveyStore } from "../../stores/optionalSurvey.store";

interface PreferenceButtonProps {
  buttonName: string;
  questionType: "여행 목적" | "숙소 유형" | "식당 유형";
}

const PreferenceButton = ({
  buttonName,
  questionType,
}: PreferenceButtonProps) => {
  // Zustand 스토어 전체를 받아옴 (성능 최적화는 아니지만 편의성으로 사용)
  const store = useOptionalSurveyStore();

  // 질문 유형에 따라 해당 상태 배열/setter 함수를 선택
  // 선호 항목
  const preferMap = {
    "여행 목적": store.preferTravelPurpose,
    "숙소 유형": store.preferAccommodation,
    "식당 유형": store.preferRestaurant,
  };
  // 비선호 항목
  const nonPreferMap = {
    "여행 목적": store.nonPreferTravelPurpose,
    "숙소 유형": store.nonPreferAccommodation,
    "식당 유형": store.nonPreferRestaurant,
  };
  // 선호 항목 설정용
  const setPreferMap = {
    "여행 목적": store.setPreferTravelPurpose,
    "숙소 유형": store.setPreferAccommodation,
    "식당 유형": store.setPreferRestaurant,
  };
  // 비선호 항목 설정용
  const setNonPreferMap = {
    "여행 목적": store.setNonPreferTravelPurpose,
    "숙소 유형": store.setNonPreferAccommodation,
    "식당 유형": store.setNonPreferRestaurant,
  };

  // 현재 버튼이 선호 목록에 포함되어 있는지 확인
  const isClickedPreference = preferMap[questionType].includes(buttonName);
  // 현재 버튼이 비선호 목록에 포함되어 있는지 확인
  const isClickedNonPreference =
    nonPreferMap[questionType].includes(buttonName);

  // 선호 버튼 클릭 핸들러 - [선호] 버튼 클릭 시 호출되는 함수
  const handleClickPreference = () => {
    const currentPrefer = preferMap[questionType];
    const currentNonPrefer = nonPreferMap[questionType];

    if (isClickedPreference) {
      // 이미 선택된 상태면 -> 선택 해제
      setPreferMap[questionType](
        currentPrefer.filter((item) => item != buttonName)
      );
    } else {
      // 선택되지 않았던 상태면 -> 추가
      setPreferMap[questionType]([...currentPrefer, buttonName]);
      if (isClickedNonPreference) {
        // 비선호에도 동시에 들어가 있으면 -> 비선호에서 제거
        setNonPreferMap[questionType](
          currentNonPrefer.filter((item) => item !== buttonName)
        );
      }
    }
  };

  // 비선호 버튼 클릭 핸들러 - [비선호] 버튼 클릭 시 호출되는 함수
  const handleClickNonPreference = () => {
    const currentPrefer = preferMap[questionType];
    const currentNonPrefer = nonPreferMap[questionType];

    if (isClickedNonPreference) {
      // 이미 선택된 상태면 -> 선택 해제
      setNonPreferMap[questionType](
        currentNonPrefer.filter((item) => item != buttonName)
      );
    } else {
      // 선택되지 않았던 상태면 -> 추가
      setNonPreferMap[questionType]([...currentNonPrefer, buttonName]);
      if (isClickedPreference) {
        // 선호에도 동시에 들어가 있으면 -> 선호에서 제거
        setPreferMap[questionType](
          currentPrefer.filter((item) => item != buttonName)
        );
      }
    }
  };

  return (
    <div className="flex text-[12px] h-[25px] text-black/70">
      <div className="bg-[#F1F1F1] w-[100px] place-content-center text-left pl-[10px] rounded-l-[4px] text-black">
        {buttonName}
      </div>
      <button
        onClick={handleClickPreference}
        className={clsx(
          "bg-[#DFDFDF] w-[100px] place-content-center border-r border-[#C8C8C8] hover:cursor-pointer hover:bg-[#A3DDB8] hover:text-black",
          isClickedPreference && "!bg-[#A3DDB8] text-black"
        )}
      >
        선호
      </button>
      <button
        onClick={handleClickNonPreference}
        className={clsx(
          "bg-[#DFDFDF] w-[100px] rounded-r-[4px] place-content-center hover:cursor-pointer hover:bg-[#DEA3A3] hover:text-black",
          isClickedNonPreference && "!bg-[#DEA3A3] text-black"
        )}
      >
        비선호
      </button>
    </div>
  );
};

export default PreferenceButton;

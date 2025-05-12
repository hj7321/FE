import PreferenceButton from "./PreferenceButton";
import TransportationButton from "./TransportationButton";

const OptionalQuestions = () => {
  return (
    <div className="text-[14px] flex flex-col gap-[25px]">
      <div>
        <h1 className="mb-[5px]">1. 어떤 교통수단을 이용하실 예정인가요?</h1>
        <div className="ml-[12px] flex gap-[10px]">
          <TransportationButton buttonName="버스" />
          <TransportationButton buttonName="택시" />
          <TransportationButton buttonName="지하철" />
          <TransportationButton buttonName="렌트카" />
          <TransportationButton buttonName="도보" />
        </div>
      </div>
      <div>
        <h1>2. 선호하거나 비선호하는 여행 목적을 선택해주세요.</h1>
        <h6 className="ml-[15px] mb-[5px]">
          (중복 선택 가능, 선택하지 않아도 됨)
        </h6>
        <div className="ml-[15px] flex flex-col gap-[10px]">
          <PreferenceButton buttonName="힐링" questionType="여행 목적" />
          <PreferenceButton buttonName="관광" questionType="여행 목적" />
          <PreferenceButton buttonName="액티비티" questionType="여행 목적" />
          <PreferenceButton buttonName="핫 플레이스" questionType="여행 목적" />
          <PreferenceButton buttonName="맛집 탐방" questionType="여행 목적" />
          <PreferenceButton buttonName="가족 여행" questionType="여행 목적" />
          <PreferenceButton buttonName="커플 여행" questionType="여행 목적" />
          <PreferenceButton buttonName="호캉스" questionType="여행 목적" />
          <PreferenceButton buttonName="쇼핑" questionType="여행 목적" />
          <PreferenceButton buttonName="역사/교육" questionType="여행 목적" />
        </div>
      </div>
      <div>
        <h1>3. 선호하거나 비선호하는 숙소 유형을 선택해주세요.</h1>
        <h6 className="ml-[15px] mb-[5px]">
          (중복 선택 가능, 선택하지 않아도 됨)
        </h6>
        <div className="ml-[15px] flex flex-col gap-[10px]">
          <PreferenceButton buttonName="호텔" questionType="숙소 유형" />
          <PreferenceButton buttonName="펜션" questionType="숙소 유형" />
          <PreferenceButton buttonName="에어비앤비" questionType="숙소 유형" />
          <PreferenceButton
            buttonName="게스트하우스"
            questionType="숙소 유형"
          />
        </div>
      </div>
      <div>
        <h1>4. 선호하거나 비선호하는 식당 유형을 선택해주세요.</h1>
        <h6 className="ml-[15px] mb-[5px]">
          (중복 선택 가능, 선택하지 않아도 됨)
        </h6>
        <div className="ml-[15px] flex flex-col gap-[10px]">
          <PreferenceButton buttonName="현지 맛집" questionType="식당 유형" />
          <PreferenceButton
            buttonName="분위기 좋은 카페"
            questionType="식당 유형"
          />
          <PreferenceButton buttonName="특산물" questionType="식당 유형" />
          <PreferenceButton
            buttonName="고급 레스토랑"
            questionType="식당 유형"
          />
        </div>
      </div>
    </div>
  );
};

export default OptionalQuestions;

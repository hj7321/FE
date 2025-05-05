import PreferenceButton from "./PreferenceButton";
import TransferButton from "./TransferButton";

const OptionalQuestions = () => {
  return (
    <div className="text-[14px] flex flex-col gap-[25px]">
      <div>
        <h1 className="mb-[5px]">1. 어떤 교통수단을 이용하실 예정인가요?</h1>
        <div className="ml-[12px] flex gap-[10px]">
          <TransferButton>버스</TransferButton>
          <TransferButton>택시</TransferButton>
          <TransferButton>지하철</TransferButton>
          <TransferButton>렌트카</TransferButton>
          <TransferButton>도보</TransferButton>
        </div>
      </div>
      <div>
        <h1>2. 선호하거나 비선호하는 여행 목적을 선택해주세요.</h1>
        <h6 className="ml-[15px] mb-[5px]">
          (중복 선택 가능, 선택하지 않아도 됨)
        </h6>
        <div className="ml-[15px] flex flex-col gap-[10px]">
          <PreferenceButton>힐링</PreferenceButton>
          <PreferenceButton>관광</PreferenceButton>
          <PreferenceButton>액티비티</PreferenceButton>
          <PreferenceButton>핫 플레이스</PreferenceButton>
          <PreferenceButton>맛집 탐방</PreferenceButton>
          <PreferenceButton>가족 여행</PreferenceButton>
          <PreferenceButton>커플 여행</PreferenceButton>
          <PreferenceButton>호캉스</PreferenceButton>
          <PreferenceButton>쇼핑</PreferenceButton>
          <PreferenceButton>역사/교육</PreferenceButton>
        </div>
      </div>
      <div>
        <h1>3. 선호하거나 비선호하는 숙소 유형을 선택해주세요.</h1>
        <h6 className="ml-[15px] mb-[5px]">
          (중복 선택 가능, 선택하지 않아도 됨)
        </h6>
        <div className="ml-[15px] flex flex-col gap-[10px]">
          <PreferenceButton>호텔</PreferenceButton>
          <PreferenceButton>펜션</PreferenceButton>
          <PreferenceButton>에어비앤비</PreferenceButton>
          <PreferenceButton>게스트하우스</PreferenceButton>
        </div>
      </div>
      <div>
        <h1>4. 선호하거나 비선호하는 식당 유형을 선택해주세요.</h1>
        <h6 className="ml-[15px] mb-[5px]">
          (중복 선택 가능, 선택하지 않아도 됨)
        </h6>
        <div className="ml-[15px] flex flex-col gap-[10px]">
          <PreferenceButton>현지 맛집</PreferenceButton>
          <PreferenceButton>분위기 좋은 카페</PreferenceButton>
          <PreferenceButton>특산물</PreferenceButton>
          <PreferenceButton>고급 레스토랑</PreferenceButton>
        </div>
      </div>
    </div>
  );
};

export default OptionalQuestions;

import TravelPlanCard from "../../components/card/TravelPlanCard";

const TravelHistoryPage = () => {
  return (
    <div className="px-[100px] py-[10px] flex flex-col">
      <h1 className="font-bold text-[22px]">여행 기록 ✈️</h1>
      <div className="mt-[7px] flex flex-wrap gap-x-[20px] gap-y-[15px]">
        <TravelPlanCard
          cardImg="/images/cities/나폴리.webp"
          travelTitle="황금연휴에 가는 해외여행😊"
          travelStartDate="2025.05.01"
          travelEndDate="2025.05.07"
          travelPeople={8}
          travelPlace="스페인 바르셀로나"
          isEnded={false}
        />
        <TravelPlanCard
          cardImg="/images/cities/바르셀로나.webp"
          travelTitle="황금연휴에 가는 해외여행😊"
          travelStartDate="2025.05.01"
          travelEndDate="2025.05.07"
          travelPeople={8}
          travelPlace="스페인 바르셀로나"
          isEnded={true}
        />
        <TravelPlanCard
          cardImg="/images/cities/뉴욕.webp"
          travelTitle="황금연휴에 가는 해외여행😊"
          travelStartDate="2025.05.01"
          travelEndDate="2025.05.07"
          travelPeople={8}
          travelPlace="스페인 바르셀로나"
          isEnded={false}
        />
        <TravelPlanCard
          cardImg="/images/cities/도쿄.webp"
          travelTitle="황금연휴에 가는 해외여행😊"
          travelStartDate="2025.05.01"
          travelEndDate="2025.05.07"
          travelPeople={8}
          travelPlace="스페인 바르셀로나"
          isEnded={true}
        />
        <TravelPlanCard
          cardImg="/images/cities/로마.webp"
          travelTitle="황금연휴에 가는 해외여행😊"
          travelStartDate="2025.05.01"
          travelEndDate="2025.05.07"
          travelPeople={8}
          travelPlace="스페인 바르셀로나"
          isEnded={true}
        />
        <TravelPlanCard
          cardImg="/images/cities/로스앤젤레스.webp"
          travelTitle="황금연휴에 가는 해외여행😊"
          travelStartDate="2025.05.01"
          travelEndDate="2025.05.07"
          travelPeople={8}
          travelPlace="스페인 바르셀로나"
          isEnded={false}
        />
      </div>
    </div>
  );
};

export default TravelHistoryPage;

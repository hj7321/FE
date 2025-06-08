import useReadTravelPlans from "../../hooks/useReadTravelPlans";
import TravelHistorySection from "../../components/section/TravelHistorySection";

const TravelHistoryPage = () => {
  const { data: { allPlans, scheduledPlans, pastPlans } = {} } =
    useReadTravelPlans();
  console.log(allPlans);

  return (
    <div className="px-[100px] py-[10px] flex flex-col gap-[5px]">
      <TravelHistorySection
        allPlans={allPlans ?? []}
        scheduledPlans={scheduledPlans ?? []}
        pastPlans={pastPlans ?? []}
        showMyPageLink
        linkToMyPage="/my"
      />
    </div>
  );
};

export default TravelHistoryPage;

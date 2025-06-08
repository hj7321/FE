import useReadTravelPlans from "../../hooks/useReadTravelPlans";
import TravelHistorySection from "../../components/section/TravelHistorySection";
import RecentlyViewSection from "../../components/section/RecentlyViewSection";
import { getRecentPlaces } from "../../utils/getRecentPlace";

const MyPage = () => {
  const { data: { allPlans, scheduledPlans, pastPlans } = {} } =
    useReadTravelPlans();
  console.log(allPlans);

  const recentPlaces = getRecentPlaces();

  return (
    <div className="px-[100px] py-[10px] flex flex-col">
      <TravelHistorySection
        allPlans={allPlans ?? []}
        scheduledPlans={scheduledPlans ?? []}
        pastPlans={pastPlans ?? []}
        maxCount={4}
        showHeaderLink={true}
        linkToHeader="/travel-history"
      />
      <RecentlyViewSection
        recentPlaces={recentPlaces}
        maxCount={5}
        showHeaderLink={true}
        linkToHeader="/recently-viewed-places"
      />
    </div>
  );
};

export default MyPage;

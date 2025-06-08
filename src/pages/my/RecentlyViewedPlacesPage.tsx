import RecentlyViewSection from "../../components/section/RecentlyViewSection";
import { getRecentPlaces } from "../../utils/getRecentPlace";

const RecentlyViewedPlacesPage = () => {
  const recentPlaces = getRecentPlaces();

  return (
    <div className="px-[100px] py-[10px] flex flex-col gap-[5px]">
      <RecentlyViewSection
        recentPlaces={recentPlaces}
        showMyPageLink
        linkToMyPage="/my"
      />
    </div>
  );
};

export default RecentlyViewedPlacesPage;

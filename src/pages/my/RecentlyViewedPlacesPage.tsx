import RecentlyViewSection from "../../components/section/RecentlyViewSection";
import useReadRecentPlace from "../../hooks/useReadRecentPlace";

const RecentlyViewedPlacesPage = () => {
  const { data: recentPlaces } = useReadRecentPlace();

  return (
    <div className="px-[100px] py-[10px] flex flex-col gap-[5px]">
      <RecentlyViewSection
        recentPlaces={recentPlaces ?? []}
        showMyPageLink
        linkToMyPage="/my"
      />
    </div>
  );
};

export default RecentlyViewedPlacesPage;

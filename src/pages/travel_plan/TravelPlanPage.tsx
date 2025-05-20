import PlaceListScreen from "../../components/screen/PlaceListScreen";
import ScheduleScreen from "../../components/screen/ScheduleScreen";

const TravelPlanPage = () => {
  return (
    <div className="flex">
      <ScheduleScreen />
      <PlaceListScreen />
      <div>지도</div>
    </div>
  );
};

export default TravelPlanPage;

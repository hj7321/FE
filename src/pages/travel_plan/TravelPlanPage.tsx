import { useEffect } from "react";
import PlaceListScreen from "../../components/screen/PlaceListScreen";
import ScheduleScreen from "../../components/screen/ScheduleScreen";
import { useModalStore } from "../../stores/modal.store";
import CalendarModal from "../../components/modal/CalendarModal";

const TravelPlanPage = () => {
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    openModal(<CalendarModal />);
  }, [openModal]);

  return (
    <div className="flex">
      <ScheduleScreen />
      <PlaceListScreen />
      <div>지도</div>
    </div>
  );
};

export default TravelPlanPage;

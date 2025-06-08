import { useQuery } from "@tanstack/react-query";
import { Plan, Schedule } from "../types/travelPlan.type";
import { readTravelPlanList } from "../apis/travelPlan.api";

const useReadTravelPlans = () => {
  const today = new Date();
  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return useQuery<
    Plan,
    Error,
    { allPlans: Schedule[]; scheduledPlans: Schedule[]; pastPlans: Schedule[] }
  >({
    queryKey: ["readTravelPlanList"],
    queryFn: () => readTravelPlanList(),
    staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    retry: 2,
    select: (data) => {
      const allPlans = data.plans;
      const scheduledPlans = allPlans.filter((plan) => {
        const start = new Date(plan.startDate);
        return todayDateOnly <= start;
      });
      const pastPlans = allPlans.filter((plan) => {
        const start = new Date(plan.startDate);
        return todayDateOnly > start;
      });
      return { allPlans, scheduledPlans, pastPlans };
    },
  });
};

export default useReadTravelPlans;

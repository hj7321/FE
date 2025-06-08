import axios from "axios";
import { api } from "./api";
import {
  CreateTravelSchedule,
  Plan,
  TravelPlanId,
  UpdateTravelSchedule,
} from "../types/travelPlan.type";

// 여행 계획 리스트 출력
export const readTravelPlanList = async (): Promise<Plan> => {
  const path = "/account/planList";

  try {
    const response = await api.get(path);
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[readTravelPlanList] Axios 에러: ", error);
    } else {
      console.error("[readTravelPlanList] 일반 에러: ", error);
    }
    throw error;
  }
};

// 여행 계획 상세 정보 출력
export const readDetailTravelPlan = async ({
  id,
}: TravelPlanId): Promise<CreateTravelSchedule> => {
  const path = "/account/planDetail";

  try {
    const response = await api.get(path, {
      params: {
        id,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[readDetailTravelPlan] Axios 에러: ", error);
    } else {
      console.error("[readDetailTravelPlan] 일반 에러: ", error);
    }
    throw error;
  }
};

// 여행 계획 생성
export const createTravelPlan = async (schedule: CreateTravelSchedule) => {
  const path = "/account/plan/save";

  try {
    const response = await api.post(path, { schedule });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[createTravelPlan] Axios 에러: ", error);
    } else {
      console.error("[createTravelPlan] 일반 에러: ", error);
    }
    throw error;
  }
};

// 여행 계획 수정
export const modifyTravelPlan = async (schedule: UpdateTravelSchedule) => {
  const path = "/account/plan/modify";

  try {
    const response = await api.post(path, { schedule });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[modifyTravelPlan] Axios 에러: ", error);
    } else {
      console.error("[modifyTravelPlan] 일반 에러: ", error);
    }
    throw error;
  }
};

// 여행 계획 수정 페이지로 이동
export const navigateModificaitonPage = async ({
  id,
}: TravelPlanId): Promise<CreateTravelSchedule> => {
  const path = "/account/planDetail/modify";

  try {
    const response = await api.get(path, {
      params: {
        id,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[navigateModificaitonPage] Axios 에러: ", error);
    } else {
      console.error("[navigateModificaitonPage] 일반 에러: ", error);
    }
    throw error;
  }
};

// 여행 계획 삭제
export const deleteTravelPlan = async ({ id }: TravelPlanId) => {
  const path = "/account/plan/delete";

  try {
    const response = await api.delete(path, {
      data: { id },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[deleteTravelPlan] Axios 에러: ", error);
    } else {
      console.error("[deleteTravelPlan] 일반 에러: ", error);
    }
    throw error;
  }
};

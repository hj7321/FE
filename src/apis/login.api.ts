import axios from "axios";
import { LoginType } from "../types/auth.type";
import { api } from "./api";

// 자체 로그인
export const login = async ({ id, pw }: LoginType) => {
  const path = "/account/login";

  try {
    const response = await api.post(path, {
      memberId: id,
      password: pw,
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[login] Axios 에러: ", error.message);
    } else {
      console.error("[login] 일반 에러: ", error);
    }
    throw error;
  }
};

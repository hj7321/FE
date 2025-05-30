import axios from "axios";
import { LoginType } from "../types/auth.type";
import { api } from "./api";

// 자체 로그인
export const selfLogin = async ({ id, pw }: LoginType) => {
  const path = "/account/login";

  try {
    const response = await api.post(path, {
      memberId: id,
      password: pw,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.code === "CLT010") {
        console.error("[login] 회원정보 불일치");
        throw new Error("회원정보가 일치하지 않습니다.");
      } else {
        console.error("[login] Axios 에러: ", error);
      }
    } else {
      console.error("[login] 일반 에러: ", error);
    }
    throw error;
  }
};

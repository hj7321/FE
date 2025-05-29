import axios, { AxiosResponse } from "axios";
import { CheckCodeType, CheckEmailType, SignupType } from "../types/auth.type";
import { api } from "./api";

// 이메일 인증코드 전송
export const checkEmail = async ({
  email,
}: CheckEmailType): Promise<AxiosResponse> => {
  const path = "/account/email/verification";

  try {
    const response = await api.post(path, {
      email,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // if (error.response?.status === 401) {
      //     console.error("[signup] 이메일 형식이 올바르지 않음");
      //     throw new Error("이메일 형식이 올바르지 않습니다.");
      //   } else if (error.response?.status === 409) {
      //     console.error("[signup] 이미 존재하는 이메일");
      //     throw new Error("이미 존재하는 이메일입니다.");
      //   } else if (error.response?.status === 500) {
      //     console.error("[signup] 서버 에러");
      //     throw new Error("서버 에러입니다. 잠시 후에 다시 이용해주세요.");
      //   } else {
      console.error("[signup] Axios 에러: ", error.message);
      // }
    } else {
      console.error("[checkEmail] 일반 에러: ", error);
    }
    throw error;
  }
};

// 인증코드 검증
export const checkCode = async ({ email, code }: CheckCodeType) => {
  const path = "/account/email/verification/check";

  try {
    const response = await api.post(path, {
      email,
      verificationCode: code,
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // if (error.response?.status === 400) {
      //   console.error("[checkCode] 인증번호가 올바르지 않음");
      // } else {
      console.error("[checkCode] Axios 에러: ", error.message);
      // }
    } else {
      console.error("[checkCode] 일반 에러: ", error);
    }
    throw error;
  }
};

// 자체 회원가입
export const signup = async ({ id, pw, email }: SignupType) => {
  const path = "/account/signup";

  try {
    const response = await api.post(path, {
      memberId: id,
      password: pw,
      memberEmail: email,
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        console.error("[signup] 이미 존재하는 이메일");
      } else {
        console.error("[signup] Axios 에러: ", error.message);
      }
    } else {
      console.error("[signup] 일반 에러: ", error);
    }
    throw error;
  }
};

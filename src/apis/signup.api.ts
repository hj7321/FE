import axios from "axios";
import {
  CheckCodeType,
  CheckEmailType,
  CheckIdType,
  SignupType,
} from "../types/auth.type";
import { api } from "./api";

// 이메일 인증코드 전송
export const checkEmail = async ({ email }: CheckEmailType) => {
  const path = "/account/email/verification";

  try {
    const response = await api.post(path, {
      email,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.code === "CLT001") {
        console.error("[checkEmail] 이미 존재하는 이메일", error);
        throw new Error("이미 존재하는 이메일입니다.");
      } else if (error.response?.data.code === "SYS001") {
        console.error("[checkEmail] 이메일 전송 실패", error);
        throw new Error("이메일 전송에 실패했습니다.");
      } else {
        console.error("[checkEmail] Axios 에러: ", error);
      }
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
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.data.code === "CLT007" ||
        error.response?.data.code === "CLT008"
      ) {
        console.error("[checkCode] 인증번호가 올바르지 않음", error);
        throw new Error("인증번호가 올바르지 않습니다.");
      } else if (error.response?.data.code === "CLT009") {
        console.error("[checkCode] 인증번호 만료", error);
        throw new Error("인증번호가 만료되었습니다.");
      } else {
        console.error("[checkCode] Axios 에러: ", error);
      }
    } else {
      console.error("[checkCode] 일반 에러: ", error);
    }
    throw error;
  }
};

// 아이디 중복체크
export const checkId = async ({ id }: CheckIdType): Promise<boolean> => {
  const path = "/account/idDuplicatedCheck";

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
      console.error("[checkId] Axios 에러: ", error);
    } else {
      console.error("[checkId] 일반 에러: ", error);
    }
    throw error;
  }
};

// 자체 회원가입
export const selfSignup = async ({ id, pw, email }: SignupType) => {
  const path = "/account/signup";

  try {
    const response = await api.post(path, {
      memberId: id,
      password: pw,
      memberEmail: email,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.code === "CLT001") {
        console.error("[signup] 이미 존재하는 이메일", error);
        throw new Error("이미 존재하는 이메일입니다.");
      } else if (error.response?.data.code === "CLT005") {
        console.error("[checkId] 이미 존재하는 아이디");
        throw new Error("이미 존재하는 아이디입니다.");
      } else {
        console.error("[signup] Axios 에러: ", error);
      }
    } else {
      console.error("[signup] 일반 에러: ", error);
    }
    throw error;
  }
};

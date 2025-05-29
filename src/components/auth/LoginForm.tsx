import { Link } from "react-router";
import AuthInput from "./AuthInput";
import { useState } from "react";

const popupWidth = 550;
const popupHeight = 650;
const left = window.screenX + (window.outerWidth - popupWidth) / 2;

const LoginForm = () => {
  const [form, setForm] = useState({
    id: "",
    pw: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleKakaoLogin = () => {
    window.open(
      "http://3.35.102.134:8080/oauth2/authorization/kakao",
      "kakaoLogin",
      `width=${popupWidth},height=${popupHeight},left=${left},top=50,toolbar=no,noopener,noreferrer`
    );
  };

  const handleGoogleLogin = () => {
    window.open(
      "http://3.35.102.134:8080/oauth2/authorization/google",
      "googleLogin",
      `width=${popupWidth},height=${popupHeight},left=${left},top=50,toolbar=no,noopener,noreferrer`
    );
  };

  return (
    <div className="flex flex-col gap-[15px]">
      <AuthInput
        label="아이디"
        name="id"
        type="text"
        inputValue={form.id}
        onChange={handleChange}
      />
      <AuthInput
        label="비밀번호"
        name="pw"
        type="password"
        inputValue={form.id}
        onChange={handleChange}
      />
      <button className="mt-[10px] w-[250px] h-[45px] text-[14px] text-white bg-common rounded-[4px] hover:cursor-pointer hover:bg-selected">
        로그인
      </button>
      <div className="mt-[-5px] flex gap-[10px] text-[13px] justify-center">
        <Link to="/" className="hover:font-bold">
          아이디 찾기
        </Link>
        <p>│</p>
        <Link to="/" className="hover:font-bold">
          비밀번호 재설정하기
        </Link>
      </div>
      <div className="mt-[5px] flex flex-col gap-[10px] justify-center items-center">
        <div className="flex gap-[7px] items-center justify-center">
          <hr className="flex-grow border-t w-[90px] border-[#9c9c9c]" />
          <p className="text-[12px] text-[#9c9c9c]">간편 로그인</p>
          <hr className="flex-grow border-t w-[90px] border-[#9c9c9c]" />
        </div>
        <button
          onClick={handleKakaoLogin}
          className="flex gap-[10px] justify-center items-center w-[250px] h-[45px] text-[14px] text-black bg-[#FEE500] rounded-[4px] hover:cursor-pointer hover:bg-[#EED600]"
        >
          <img
            src="/images/kakao.svg"
            alt="kakao"
            className="text-[10px] h-[25px]"
          />
          <p>Kakao로 로그인하기</p>
        </button>
        <button
          onClick={handleGoogleLogin}
          className="flex gap-[10px] justify-center items-center w-[250px] h-[45px] text-[14px] text-black bg-[#F8F9FD] rounded-[4px] hover:cursor-pointer hover:bg-[#E2E5F3]"
        >
          <img
            src="/images/google.svg"
            alt="google"
            className="text-[10px] h-[25px]"
          />
          <p>Google로 로그인하기</p>
        </button>
      </div>
      <div className="flex justify-center items-center gap-[10px]">
        <p className="text-[11.5px] mt-[1px] text-[#919191]">
          아직 회원이 아니신가요?
        </p>
        <Link
          to="/sign-up"
          className="text-[14px] hover:font-bold hover:cursor-pointer"
        >
          회원가입하기 {">"}
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

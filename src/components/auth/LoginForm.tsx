import { Link } from "react-router";
import AuthInput from "./AuthInput";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-[15px]">
      <AuthInput label="아이디" type="text" />
      <AuthInput label="비밀번호" type="password" />
      <button className="mt-[10px] w-[250px] h-[45px] text-[14px] text-white bg-common rounded-[4px] hover:cursor-pointer hover:bg-selected">
        로그인
      </button>
      <div className="mt-[-5px] flex gap-[10px] text-[13px] justify-center">
        <Link to="/">아이디 찾기</Link>
        <p>│</p>
        <Link to="/">비밀번호 재설정하기</Link>
      </div>
      <div className="mt-[5px] flex flex-col gap-[10px] justify-center items-center">
        <div className="flex gap-[7px] items-center justify-center">
          <hr className="flex-grow border-t w-[90px] border-[#9c9c9c]" />
          <p className="text-[12px] text-[#9c9c9c]">간편 로그인</p>
          <hr className="flex-grow border-t w-[90px] border-[#9c9c9c]" />
        </div>
        <button className="flex gap-[10px] justify-center items-center w-[250px] h-[45px] text-[14px] text-black bg-[#FEE500] rounded-[4px] hover:cursor-pointer hover:bg-[#EED600]">
          <img
            src="/images/kakao.svg"
            alt="kakao"
            className="text-[10px] h-[25px]"
          />
          <p>Kakao로 로그인하기</p>
        </button>
        <button className="flex gap-[10px] justify-center items-center w-[250px] h-[45px] text-[14px] text-black bg-[#F8F9FD] rounded-[4px] hover:cursor-pointer hover:bg-[#E2E5F3]">
          <img
            src="/images/google.svg"
            alt="google"
            className="text-[10px] h-[25px]"
          />
          <p>Google로 로그인하기</p>
        </button>
      </div>
      <div className="flex justify-center items-center gap-[10px]">
        <p className="text-[12px] text-[#919191]">아직 회원이 아니신가요?</p>
        <Link
          to="/sign-up"
          className="text-[14px] font-bold hover:cursor-pointer"
        >
          회원가입하기 {">"}
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

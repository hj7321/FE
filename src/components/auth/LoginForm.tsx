import { Link, useNavigate } from "react-router";
import AuthInput from "./AuthInput";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LoginType } from "../../types/auth.type";
import { selfLogin } from "../../apis/login.api";
import clsx from "clsx";

const popupWidth = 550;
const popupHeight = 650;
const left = window.screenX + (window.outerWidth - popupWidth) / 2;

const style_active = "bg-common hover:cursor-pointer hover:bg-selected";
const style_inactive = "bg-[#C895E6] opacity-25";

const LoginForm = () => {
  const [form, setForm] = useState({
    id: "",
    pw: "",
  });
  const [isSending, setIsSending] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const { mutate: loginMutate } = useMutation<AxiosResponse, Error, LoginType>({
    mutationKey: ["login", form.id],
    mutationFn: selfLogin,
    onMutate: () => {
      setIsSending(true);
    },
    onSuccess: (response) => {
      login(response.headers.authorization);
      console.log("✅ 로그인 완료", response);
      navigate("/");
    },
    onError: (err) => {
      console.error("❌ 로그인 실패", err);
      alert(err.message);
    },
    onSettled: () => {
      setIsSending(false);
    },
    retry: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 방지
    if (form.id === "" || form.pw === "" || isSending) return;
    loginMutate({ id: form.id, pw: form.pw });
  };

  const handleKakaoLogin = () => {
    window.open(
      "https://api.tranner.com/oauth2/authorization/kakao",
      "kakaoLogin",
      `width=${popupWidth},height=${popupHeight},left=${left},top=50,toolbar=no`
    );
  };

  const handleGoogleLogin = () => {
    window.open(
      "https://api.tranner.com/oauth2/authorization/google",
      "googleLogin",
      `width=${popupWidth},height=${popupHeight},left=${left},top=50,toolbar=no`
    );
  };

  useEffect(() => {
    // 토큰을 전달받는 이벤트 핸들러 함수 정의
    const receiveToken = (event: MessageEvent) => {
      // 보안을 위해 특정 origin에서만 메시지를 받도록 제한할 수 있음
      // if (event.origin !== "http://localhost:8081") return; // 보안 체크
      const { accessToken } = event.data || {};
      if (accessToken) {
        console.log("🔐 토큰 수신:", accessToken);
        login(accessToken);
        navigate("/");
      }
    };

    // window 객체에 message 이벤트 리스너 추가 (다른 창이나 iframe에서 postMessage로 보낸 메시지를 수신함)
    window.addEventListener("message", receiveToken);

    return () => window.removeEventListener("message", receiveToken);
  }, []);

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-[15px]">
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
        inputValue={form.pw}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={clsx(
          "mt-[10px] w-[250px] h-[45px] text-[14px] text-white rounded-[4px]",
          form.id === "" || form.pw === ""
            ? style_inactive
            : isSending
            ? style_inactive
            : style_active
        )}
      >
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
    </form>
  );
};

export default LoginForm;

import clsx from "clsx";
import AuthInput from "./AuthInput";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkCode, checkEmail, signup } from "../../apis/signup.api";
import { AxiosResponse } from "axios";
import {
  CheckCodeType,
  CheckEmailType,
  SignupType,
} from "../../types/auth.type";
import { formatTime } from "../../utils/formatTime";
import { useNavigate } from "react-router";

const style_active = "bg-common hover:cursor-pointer hover:bg-selected";
const style_inactive = "bg-[#C895E6] opacity-25";

const SignupForm = () => {
  const [form, setForm] = useState<Record<string, string>>({
    email: "",
    emailCode: "",
    id: "",
    pw: "",
    pwConfirm: "",
  });
  const [isValidForm, setIsValidForm] = useState<Record<string, boolean>>({
    email: false,
    emailCode: false,
    id: true,
    pw: true,
    pwConfirm: true,
  });

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isAllInputFull, setIsAllInputFull] = useState<boolean>(false);

  const navigate = useNavigate();

  const { mutate: checkEmailMutate } = useMutation<
    AxiosResponse,
    Error,
    CheckEmailType
  >({
    mutationKey: ["checkEmail", form.email],
    mutationFn: checkEmail,
    onSuccess: (response) => {
      console.log("✅ 인증번호 발송 성공", response);
      alert("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
      setIsValidForm((prev) => ({ ...prev, email: true }));
      setTimeLeft(300); // 5분 (300초)
      setIsTimerRunning(true);
    },
    onError: (err) => {
      console.error("❌ 인증번호 발송 실패", err.message);
      alert(`인증번호 발송 실패: ${err.message}`);
    },
    retry: 1,
  });

  const { mutate: checkCodeMutate } = useMutation<
    AxiosResponse,
    Error,
    CheckCodeType
  >({
    mutationKey: ["checkCode", form.emailCode],
    mutationFn: checkCode,
    onSuccess: (response) => {
      console.log("✅ 인증번호 일치", response);
      alert("인증 완료!");
      setTimeLeft(0);
      setIsTimerRunning(false);
      setIsValidForm((prev) => ({ ...prev, emailCode: true }));
    },
    onError: (err) => {
      console.error("❌ 인증번호 불일치", err.message);
      alert(`인증번호 불일치: ${err.message}`);
    },
    retry: 1,
  });

  const { mutate: signupMutate } = useMutation<
    AxiosResponse,
    Error,
    SignupType
  >({
    mutationKey: ["signup", form.id],
    mutationFn: signup,
    onSuccess: (response) => {
      console.log("✅ 회원가입 완료", response);
      alert("회원가입 완료!");
      navigate("/");
    },
    onError: (err) => {
      console.error("❌ 회원가입 실패", err.message);
      alert(`회원가입 실패: ${err.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailCheck = () => {
    if (form.email === "" || isTimerRunning || isValidForm.emailCode) return;
    checkEmailMutate({ email: form.email });
  };

  const handleCodeCheck = () => {
    if (!isValidForm.email || isValidForm.emailCode) return;
    checkCodeMutate({ email: form.email, code: Number(form.emailCode) });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 방지
    if (!isAllInputFull) return;
    signupMutate({ id: form.id, pw: form.pw, email: form.email });
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleEmailCheck(); // "인증번호 발송" 버튼 함수 실행
    }
  };

  const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleCodeCheck(); // "인증 확인" 버튼 함수 실행
    }
  };

  useEffect(() => {
    if (!isTimerRunning || isValidForm.emailCode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // 언마운트 시 클리어
  }, [isTimerRunning]);

  useEffect(() => {
    const isAllValid = Object.values(isValidForm).every(
      (value) => value === true
    );
    setIsAllInputFull(isAllValid);
  }, [isValidForm]);

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-[15px]">
      <div className="flex flex-col gap-[10px]">
        <AuthInput
          label="이메일"
          name="email"
          type="text"
          inputValue={form.email}
          onChange={handleChange}
          onKeyDown={handleEmailKeyDown}
        />
        <button
          type="button"
          onClick={handleEmailCheck}
          className={clsx(
            "w-[250px] h-[30px] text-[11.5px] text-white rounded-[4px]",
            form.email === ""
              ? style_inactive
              : !isValidForm.email
              ? style_active
              : isTimerRunning
              ? style_inactive
              : isValidForm.emailCode
              ? style_inactive
              : style_active
          )}
        >
          인증번호 발송
        </button>
      </div>
      <div className="flex items-end justify-between">
        <AuthInput
          label="이메일 인증번호"
          name="emailCode"
          type="text"
          inputValue={form.emailCode}
          onChange={handleChange}
          onKeyDown={handleCodeKeyDown}
          short
        />
        <div className="flex gap-[5px] items-center">
          <button
            type="button"
            onClick={handleCodeCheck}
            className={clsx(
              "w-[50px] h-[47px] text-[11.5px] text-white rounded-[4px] px-[10px]",
              !isValidForm.email
                ? style_inactive
                : isValidForm.emailCode
                ? style_inactive
                : style_active
            )}
          >
            인증 확인
          </button>
          <p className="font-bold w-[53px] text-right">
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>
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
      <AuthInput
        label="비밀번호 확인"
        name="pwConfirm"
        type="password"
        inputValue={form.pwConfirm}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={clsx(
          "mt-[10px] w-[250px] h-[45px] text-[14px] text-white  rounded-[4px]",
          isAllInputFull
            ? "bg-common hover:cursor-pointer hover:bg-selected"
            : "bg-[#C895E6] opacity-25"
        )}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;

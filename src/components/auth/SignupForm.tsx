import clsx from "clsx";
import AuthInput from "./AuthInput";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkCode,
  checkEmail,
  checkId,
  selfSignup,
} from "../../apis/signup.api";
import { AxiosResponse } from "axios";
import {
  CheckCodeType,
  CheckEmailType,
  SignupType,
} from "../../types/auth.type";
import { formatTime } from "../../utils/formatTime";
import { useNavigate } from "react-router";
import { Notify, Report } from "notiflix";

const style_active = "bg-common hover:cursor-pointer hover:bg-selected";
const style_inactive = "bg-[#C895E6] opacity-25";

const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const idRegexp = /^[a-zA-Z0-9]{5,20}$/;
const pwRegexp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+=])[A-Za-z\d~!@#$%^&*()+=]{8,20}$/;

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
    id: false,
    pw: false,
    pwConfirm: false,
  });
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [isSending, setIsSending] = useState<Record<string, boolean>>({
    email: false,
    emailCode: false,
    id: false,
    signup: false,
  });
  const [errorMsg, setErrorMsg] = useState<Record<string, boolean>>({
    id: false,
    pw: false,
    pwConfirm: false,
  });

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isAllValid, setIsAllValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const focusInput = (key: string) => {
    inputRefs.current[key]?.focus();
  };

  const { mutate: checkEmailMutate } = useMutation<
    AxiosResponse,
    Error,
    CheckEmailType
  >({
    mutationKey: ["checkEmail", form.email],
    mutationFn: checkEmail,
    onMutate: () => {
      setIsSending((prev) => ({ ...prev, email: true }));
    },
    onSuccess: (response) => {
      console.log("✅ 인증번호 발송 성공", response);
      // alert("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
      Report.success(
        "Tranner",
        "인증번호가 발송되었습니다. 이메일을 확인해주세요.",
        "확인",
        {
          fontFamily: "SUIT-Regular",
        }
      );
      setIsValidForm((prev) => ({ ...prev, email: true }));
      setTimeLeft(300); // 5분 (300초)
      setIsTimerRunning(true);
      focusInput("emailCode");
    },
    onError: (err) => {
      console.error("❌ 인증번호 발송 실패", err);
      alert(err.message);
      if (err.message.includes("이미 존재")) form.email = "";
      focusInput("email");
    },
    onSettled: () => {
      setIsSending((prev) => ({ ...prev, email: false }));
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
    onMutate: () => {
      setIsSending((prev) => ({ ...prev, emailCode: true }));
    },
    onSuccess: (response) => {
      console.log("✅ 인증번호 일치", response);
      // alert("인증 완료!");
      Notify.success("인증 완료!", { fontFamily: "SUIT-Regular" });
      setTimeLeft(0);
      setIsTimerRunning(false);
      setIsValidForm((prev) => ({ ...prev, emailCode: true }));
      focusInput("id");
    },
    onError: (err) => {
      console.error("❌ 인증번호 불일치", err);
      alert(err.message);
      if (err.message.includes("만료")) form.emailCode = "";
      focusInput("emailCode");
    },
    onSettled: () => {
      setIsSending((prev) => ({ ...prev, emailCode: false }));
    },
    retry: 1,
  });

  const { refetch: checkIdRefetch } = useQuery({
    queryKey: ["checkId", form.id],
    queryFn: () => checkId({ id: form.id }),
    retry: 1,
    enabled: false,
  });

  const { mutate: signupMutate } = useMutation<
    AxiosResponse,
    Error,
    SignupType
  >({
    mutationKey: ["signup", form.id],
    mutationFn: selfSignup,
    onMutate: () => {
      setIsSending((prev) => ({ ...prev, signup: true }));
    },
    onSuccess: (response) => {
      console.log("✅ 회원가입 완료", response);
      // alert("회원가입이 완료되었습니다.");
      Report.success("Tranner", "회원가입이 완료되었습니다.", "확인", {
        fontFamily: "SUIT-Regular",
      });
      navigate("/");
    },
    onError: (err) => {
      console.error("❌ 회원가입 실패", err);
      alert(err.message);
      if (err.message.includes("이미 존재")) form.email = "";
      focusInput("email");
    },
    onSettled: () => {
      setIsSending((prev) => ({ ...prev, signup: false }));
    },
    retry: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "id") {
      if (!idRegexp.test(value)) setErrorMsg((prev) => ({ ...prev, id: true }));
      else setErrorMsg((prev) => ({ ...prev, id: false }));
    } else if (name === "pw") {
      const newPw = value;
      const confirmPw = form.pwConfirm;

      if (!pwRegexp.test(value)) {
        setErrorMsg((prev) => ({ ...prev, pw: true }));
        setIsValidForm((prev) => ({ ...prev, pw: false }));
      } else {
        setErrorMsg((prev) => ({ ...prev, pw: false }));
        setIsValidForm((prev) => ({ ...prev, pw: true }));
      }

      if (confirmPw !== newPw) {
        setErrorMsg((prev) => ({ ...prev, pwConfirm: true }));
        setIsValidForm((prev) => ({ ...prev, pwConfirm: false }));
      } else {
        setErrorMsg((prev) => ({ ...prev, pwConfirm: false }));
        setIsValidForm((prev) => ({ ...prev, pwConfirm: true }));
      }
    } else if (name === "pwConfirm") {
      if (form.pw !== value) {
        setErrorMsg((prev) => ({ ...prev, pwConfirm: true }));
        setIsValidForm((prev) => ({ ...prev, pwConfirm: false }));
      } else {
        setErrorMsg((prev) => ({ ...prev, pwConfirm: false }));
        setIsValidForm((prev) => ({ ...prev, pwConfirm: true }));
      }
    }
  };

  const handleEmailCheck = () => {
    if (
      form.email === "" ||
      isTimerRunning ||
      isValidForm.emailCode ||
      isSending.email
    )
      return;
    if (!emailRegexp.test(form.email)) {
      // alert("올바른 이메일 주소 형식으로 입력해주세요. 예: user@example.com");
      Report.failure(
        "Tranner",
        "올바른 이메일 주소 형식으로 입력해주세요. 예: user@example.com",
        "확인",
        {
          fontFamily: "SUIT-Regular",
        }
      );
      focusInput("email");
      return;
    }
    checkEmailMutate({ email: form.email });
  };

  const handleCodeCheck = () => {
    if (!isValidForm.email || isValidForm.emailCode || isSending.emailCode)
      return;
    checkCodeMutate({ email: form.email, code: Number(form.emailCode) });
  };

  const handleIdCheck = async () => {
    setIsSending((prev) => ({ ...prev, id: true }));

    if (form.id === "") return;

    const { data: isDuplicate, error } = await checkIdRefetch();

    if (isDuplicate) {
      // alert("이미 존재하는 아이디입니다.");
      Notify.failure("이미 존재하는 아이디입니다.", {
        fontFamily: "SUIT-Regular",
      });
      form.id = "";
      focusInput("id");
    } else {
      // alert("사용 가능한 아이디입니다.");
      Notify.success("사용 가능한 아이디입니다.", {
        fontFamily: "SUIT-Regular",
      });
      setIsValidForm((prev) => ({ ...prev, id: true }));
      focusInput("pw");
    }

    if (error) alert(error.message);

    setIsSending((prev) => ({ ...prev, id: false }));
    return;
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 방지
    if (!isAllValid) return;
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

  const handleIdKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleIdCheck(); // "중복 확인" 버튼 함수 실행
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
    const validCheck = Object.values(isValidForm).every(
      (value) => value === true
    );
    setIsAllValid(validCheck);
  }, [isValidForm]);

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-[15px]">
      <div className="flex flex-col gap-[10px]">
        <AuthInput
          label="이메일"
          name="email"
          type="text"
          inputRef={(el) => (inputRefs.current["email"] = el)}
          inputValue={form.email}
          onChange={handleChange}
          onKeyDown={handleEmailKeyDown}
          disabled={isValidForm.email}
        />
        <button
          type="button"
          onClick={handleEmailCheck}
          className={clsx(
            "w-[250px] h-[30px] text-[11.5px] text-white rounded-[4px]",
            form.email === ""
              ? style_inactive
              : isSending.email
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
          inputRef={(el) => (inputRefs.current["emailCode"] = el)}
          inputValue={form.emailCode}
          onChange={handleChange}
          onKeyDown={handleCodeKeyDown}
          width={132}
          disabled={isValidForm.emailCode}
        />
        <div className="flex gap-[5px] items-center">
          <button
            type="button"
            onClick={handleCodeCheck}
            className={clsx(
              "w-[50px] h-[45px] text-[11.5px] text-white rounded-[4px] px-[10px]",
              !isValidForm.email
                ? style_inactive
                : isSending.emailCode
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
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-end justify-between">
          <AuthInput
            label="아이디"
            name="id"
            type="text"
            inputRef={(el) => (inputRefs.current["id"] = el)}
            inputValue={form.id}
            onChange={handleChange}
            onKeyDown={handleIdKeyDown}
            width={190}
            disabled={isValidForm.id}
          />
          <button
            type="button"
            onClick={handleIdCheck}
            className={clsx(
              "w-[50px] h-[45px] text-[11.5px] text-white rounded-[4px] px-[10px]",
              form.id === ""
                ? style_inactive
                : isSending.id
                ? style_inactive
                : errorMsg.id
                ? style_inactive
                : isValidForm.id
                ? style_inactive
                : style_active
            )}
          >
            중복 확인
          </button>
        </div>
        {errorMsg.id && (
          <p className="text-[11px] text-red-500">
            아이디는 영문자/숫자 조합으로 5~20자 이내여야 합니다.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-[5px]">
        <AuthInput
          label="비밀번호"
          name="pw"
          type="password"
          inputRef={(el) => (inputRefs.current["pw"] = el)}
          inputValue={form.pw}
          onChange={handleChange}
        />
        {errorMsg.pw && (
          <div className="text-[11px] text-red-500">
            <p>비밀번호는 영문자, 숫자, 특수문자를 모두 포함하여</p>
            <p className="mt-[-2px]">8~20자 이내여야 합니다.</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[5px]">
        <AuthInput
          label="비밀번호 확인"
          name="pwConfirm"
          type="password"
          inputRef={(el) => (inputRefs.current["pwConfirm"] = el)}
          inputValue={form.pwConfirm}
          onChange={handleChange}
        />
        {errorMsg.pwConfirm && form.pwConfirm !== "" && (
          <p className="text-[11px] text-red-500">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
      </div>
      <button
        type="submit"
        className={clsx(
          "mt-[10px] w-[250px] h-[45px] text-[14px] text-white  rounded-[4px]",
          !isAllValid
            ? style_inactive
            : isSending.signup
            ? style_inactive
            : style_active
        )}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;

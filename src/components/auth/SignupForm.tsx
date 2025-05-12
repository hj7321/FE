import clsx from "clsx";
import AuthInput from "./AuthInput";

interface SignupFormProps {
  isFullEmailInput: boolean;
}

const SignupForm = ({ isFullEmailInput }: SignupFormProps) => {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex flex-col gap-[10px]">
        <AuthInput label="이메일" type="text" />
        <button
          className={clsx(
            "w-[250px] h-[30px] text-[11.5px] text-white rounded-[4px]",
            isFullEmailInput
              ? "bg-common hover:cursor-pointer hover:bg-selected"
              : "bg-[#C895E6] opacity-25"
          )}
        >
          인증번호 발송
        </button>
      </div>
      <div className="flex items-end justify-between">
        <AuthInput label="이메일 인증번호" type="text" short />
        <div className="flex gap-[8px] items-center">
          <button
            className={clsx(
              "w-[50px] h-[47px] text-[11.5px] text-white rounded-[4px] px-[10px]",
              isFullEmailInput
                ? "bg-common hover:cursor-pointer hover:bg-selected"
                : "bg-[#C895E6] opacity-25"
            )}
          >
            인증 확인
          </button>
          <p className="font-bold">04 : 59</p>
        </div>
      </div>
      <AuthInput label="아이디" type="text" />
      <AuthInput label="비밀번호" type="password" />
      <AuthInput label="비밀번호 확인" type="password" />
      <button className="mt-[10px] w-[250px] h-[45px] text-[14px] text-white bg-common rounded-[4px] hover:cursor-pointer hover:bg-selected">
        회원가입
      </button>
    </div>
  );
};

export default SignupForm;

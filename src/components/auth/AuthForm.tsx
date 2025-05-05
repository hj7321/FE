import AuthInput from "./AuthInput";

const AuthForm = () => {
  return (
    <section className="place-items-center">
      <div className="flex flex-col justify-center items-center px-[90px] py-[40px] bg-white rounded-[8px] [box-shadow:3px_3px_10px_rgba(0,0,0,0.25)] w-fit">
        <div className="flex gap-[12px] items-center mb-[30px]">
          <img
            src="/images/logo.svg"
            alt="logo"
            className="[filter:drop-shadow(5px_5px_2px_rgba(0,0,0,0.25))] h-[70px] aspect-[4/5]"
          />
          <p className="font-bold text-[45px] [text-shadow:3px_3px_5px_rgba(0,0,0,0.25)]">
            Tranner
          </p>
        </div>
        <div className="flex flex-col gap-[15px]">
          <AuthInput label="이메일" type="text" />
          <AuthInput label="아이디" type="text" />
          <AuthInput label="비밀번호" type="password" />
          <AuthInput label="비밀번호 확인" type="password" />
        </div>
      </div>
    </section>
  );
};

export default AuthForm;

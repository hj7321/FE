import { Link } from "react-router";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface AuthFormProps {
  pageName: string;
}

const AuthForm = ({ pageName }: AuthFormProps) => {
  return (
    <section className="place-items-center">
      <div className="flex flex-col justify-center items-center px-[90px] pt-[30px] pb-[40px] bg-white rounded-[8px] [box-shadow:3px_3px_10px_rgba(0,0,0,0.25)] w-fit">
        <Link to="/" className="flex gap-[12px] items-center mb-[30px]">
          <img
            src="/images/logo.svg"
            alt="logo"
            className="[filter:drop-shadow(5px_5px_2px_rgba(0,0,0,0.25))] h-[70px] aspect-[4/5] text-[12px]"
          />
          <p className="font-bold text-[45px] [text-shadow:3px_3px_5px_rgba(0,0,0,0.25)]">
            Tranner
          </p>
        </Link>
        {pageName === "signup" && <SignupForm isFullEmailInput={false} />}
        {pageName === "login" && <LoginForm />}
      </div>
    </section>
  );
};

export default AuthForm;

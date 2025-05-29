import { Link } from "react-router";
import LoginForm from "./LoginForm";
import { useState } from "react";
import clsx from "clsx";
import SignupForm from "./SignupForm";

interface AuthFormProps {
  pageName: string;
}

const AuthForm = ({ pageName }: AuthFormProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <section className="place-items-center">
      <div className="flex flex-col justify-center items-center px-[90px] pt-[30px] pb-[40px] bg-white rounded-[8px] [box-shadow:3px_3px_10px_rgba(0,0,0,0.25)] w-fit">
        <Link
          to="/"
          className="flex gap-[12px] items-center mb-[30px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="/images/logo.svg"
            alt="logo"
            className={clsx(
              "[filter:drop-shadow(5px_5px_2px_rgba(0,0,0,0.25))] h-[70px] aspect-[4/5] text-[12px]",
              isHovered && "![filter:drop-shadow(5px_5px_2px_rgba(0,0,0,0.5))]"
            )}
          />
          <p
            className={clsx(
              "font-bold text-[45px] [text-shadow:3px_3px_5px_rgba(0,0,0,0.25)]",
              isHovered && "![text-shadow:3px_3px_5px_rgba(0,0,0,0.5)]"
            )}
          >
            Tranner
          </p>
        </Link>
        {pageName === "signup" && <SignupForm />}
        {pageName === "login" && <LoginForm />}
      </div>
    </section>
  );
};

export default AuthForm;

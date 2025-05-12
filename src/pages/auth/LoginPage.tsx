import AuthForm from "../../components/auth/AuthForm";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <AuthForm pageName="login" />
    </div>
  );
};

export default LoginPage;

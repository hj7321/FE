import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import TopButton from "./TopButton";
import AIButton from "./AI/AIButton";
import clsx from "clsx";
import ModalBackground from "../components/modal/ModalBackground";

const Layout = () => {
  const { pathname }: { pathname: string } = useLocation();
  const authPath = ["/login", "/sign-up"];
  const hideLayout = authPath.some((path) => pathname.includes(path));

  return (
    <>
      <ModalBackground />
      {!hideLayout && <Header />}
      <main
        className={clsx(
          "bg-[#EDEDED]",
          hideLayout ? "min-h-screen" : "min-h-[600px]"
        )}
      >
        <ScrollToTop />
        <Outlet />
      </main>
      <TopButton
        isExistedLikeButton={pathname.startsWith("/place-exploration")}
      />
      {!hideLayout && <AIButton />}
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;

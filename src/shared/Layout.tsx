import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import TopButton from "./TopButton";
import AIButton from "./AI/AIButton";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-[#EDEDED] h-[600px]">
        <ScrollToTop />
        <Outlet />
      </main>
      <TopButton />
      <AIButton />
      <Footer />
    </>
  );
};

export default Layout;

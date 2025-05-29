import { createBrowserRouter } from "react-router";
import Layout from "../shared/Layout";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import PlaceExplorationPage from "../pages/place_exploration/PlaceExplorationPage";
import TravelPlanPage from "../pages/travel_plan/TravelPlanPage";
import MyPage from "../pages/my/MyPage";
import RecentlyViewedPlacesPage from "../pages/my/RecentlyViewedPlacesPage";
import TravelHistoryPage from "../pages/my/TravelHistoryPage";
import TokenCallback from "../components/auth/TokenCallback";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // 메인 페이지
      {
        path: "/",
        element: <MainPage />,
      },
      // Auth 관련 페이지
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignupPage />,
      },
      {
        path: "/token-callback",
        element: <TokenCallback />,
      },
      // 주요 서비스 페이지
      {
        path: "/place-exploration/:place",
        element: <PlaceExplorationPage />,
      },
      {
        path: "/travel-plan",
        element: <TravelPlanPage />,
      },
      // 내 정보 관련 페이지
      {
        path: "/my",
        element: <MyPage />,
      },
      {
        path: "/recently-viewed-places",
        element: <RecentlyViewedPlacesPage />,
      },
      {
        path: "/travel-history",
        element: <TravelHistoryPage />,
      },
    ],
  },
]);

export default router;

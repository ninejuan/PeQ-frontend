import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./pages/main";
import MenuLayout from "./layouts/MenuLayouts";
import GoogleSignIn from "./pages/signin";
import DomainRegister from "./pages/domain/register";
import ManageRecord from "./pages/domain/manageRecord";
import Domains from "./pages/domain/domains";
import Mypage from "./pages/mypage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MenuLayout />,
        children: [
          {
            path: "",
            element: <Main />,
          },
          {
            path: "signin",
            element: <GoogleSignIn />,
          },
          {
            path: "mypage",
            element: <Mypage />,
          },
          {
            path: "domain/register",
            element: <DomainRegister />,
          },
          {
            path: "domains",
            element: <Domains />,
          },
          {
            path: "domain/manage/:domain",
            element: <ManageRecord />,
          },
        ],
      },
    ],
  },
]);

export default router;

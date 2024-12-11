import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MenuLayout from "./layouts/MenuLayouts";
import GoogleSignIn from "./pages/signin";
import DomainRegister from "./pages/domain/register";
import ManageRecord from "./pages/domain/manageRecord";

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
            path: "signin",
            element: <GoogleSignIn />,
          },
          {
            path: "domain/register",
            element: <DomainRegister />,
          },
          {
            path: "domain/manage/:domain",
            element: <ManageRecord />,
          },
          {
            path: "domain/manage",
            element: <ManageRecord />,
          },
        ],
      },
    ],
  },
]);

export default router;

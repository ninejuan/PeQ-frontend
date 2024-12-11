import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MenuLayout from "./layouts/MenuLayouts";
import GoogleSignIn from "./pages/signin";

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
        ],
      },
    ],
  },
]);

export default router;

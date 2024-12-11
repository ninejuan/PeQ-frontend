import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MenuLayout from "./layouts/MenuLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MenuLayout />,
        children: [],
      },
    ],
  },
]);

export default router;

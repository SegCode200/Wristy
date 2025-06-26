import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import Layout from "../components/layout/Layout";
import AdminPage from "../pages/AdminPage";
import NotFoundPage from "../pages/NotFoundPage";

export const mainRoute = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
  {
    path: "auth/admin",
    element: <AdminPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ParentRoute from "./ParentRoute";
import MainPage from "../pages/MainPage";
import CollectionPage from "../pages/CollectionPage";
import MyPage from "../pages/MyPage";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticated = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/my-page",
          element: <MyPage />,
        },
      ],
    },
  ];

  const routesForPublic = [
    {
      path: "/",
      element: <ParentRoute />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/collections/:id", element: <CollectionPage /> },
        ...(token ? routesForAuthenticated : []),
      ],
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "*",
      element: <h1 style={{ textAlign: "center" }}>404 - Page not Found!</h1>,
    },
  ];

  const routesForAdmins = [
    {
      path: "/admins/:id",
      element: <div>admin page</div>,
    },
    {
      path: "/users/:id",
      element: <div>user page</div>,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    // ...(token ? routesForAuthenticated : []),
    ...routesForAdmins,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

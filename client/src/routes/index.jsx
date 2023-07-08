import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ParentRoute from "./ParentRoute";
import MainPage from "../pages/MainPage";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <ParentRoute />,
      children: [
        // { path: "/items/:itemId", element: <ItemPage /> },
        { path: "/", element: <MainPage /> },
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

  const routesForAuthenticated = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/users",
          element: (
            <>
              <h1>User Home Page</h1>
              <h3>Personal collections</h3>
              <ul>
                <li>
                  <a href='#'>Books collection</a>
                </li>
                <li>
                  <a href='#'>NFTs collection</a>
                </li>
              </ul>
            </>
          ),
        },
      ],
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
    ...(!token ? routesForAuthenticated : []),
    ...routesForAdmins,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

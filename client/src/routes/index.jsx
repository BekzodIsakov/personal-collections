import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "main",
      element: <div>main page</div>,
    },
    {
      path: "/items/*",
      element: <div>particual item page</div>,
    },
    {
      path: "/login",
      element: <div>Login page</div>,
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
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForAuthenticated : []),
    ...routesForAdmins,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

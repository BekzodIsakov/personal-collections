import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ParentRoute from "./ParentRoute";
import MainPage from "../pages/MainPage";
import CollectionPage from "../pages/CollectionPage";
import CollectionManagementPage from "../pages/CollectionManagementPage";
import NotFoundPage from "../pages/NotFoundPage";
import UsersPage from "../pages/UsersPage";
import UserPage from "../pages/UserPage";
import CurrentUserProvider from "../providers/currentUserProvider";

const Routes = () => {
  const { token, user } = useAuth();

  const routesForAuthenticated = [
    {
      path: "/",
      element: (
        <CurrentUserProvider>
          <ProtectedRoute />
        </CurrentUserProvider>
      ),
      children: [
        {
          path: "/me",
          element: <UserPage />,
        },
        {
          path: "/me/collections/:collectionId",
          element: <CollectionManagementPage />,
        },
      ],
    },
  ];

  const routesForAdmins = [
    {
      path: "/",
      element: (
        <CurrentUserProvider>
          <ProtectedRoute />
        </CurrentUserProvider>
      ),
      children: [
        {
          path: "/admin/:id",
          element: <div>admin page</div>,
        },
        {
          path: "/users",
          element: <UsersPage />,
        },
        {
          path: "/users/:userId",
          element: <UserPage />,
        },
        {
          path: "/users/:userId/collections/:collectionId",
          element: <CollectionManagementPage />,
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
        ...(token && user.isAdmin ? routesForAdmins : []),
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
      element: <NotFoundPage />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    // ...(token ? routesForAuthenticated : []),
    // ...routesForAdmins,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

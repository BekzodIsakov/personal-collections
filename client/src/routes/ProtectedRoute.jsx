import { Navigate, Outlet } from "react-router-dom";
// import Header from "../components/header/Header";
import { useAuth } from "../providers/authProvider";

export const ProtectedRoute = ({ redirectPath = "/signin" }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
};

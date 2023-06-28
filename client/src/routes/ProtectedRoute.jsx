import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const { token } = useAuth();
  console.log({ token });
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <>
      <Header />
      {children ? children : <Outlet />}
    </>
  );
};

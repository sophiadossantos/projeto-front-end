import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { usuarioLogado } = useAuthContext();

  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

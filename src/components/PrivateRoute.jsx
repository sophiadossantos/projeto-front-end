import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { usuarioLogado } = useAuthContext();

  // Se não tiver usuário logado, redireciona para /login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  // Caso contrário, renderiza o conteúdo protegido
  return children;
};

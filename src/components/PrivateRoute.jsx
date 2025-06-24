// Componente de rota protegida que só renderiza a página se o usuário estiver autenticado
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  // Recupera o usuário autenticado a partir do contexto global
  const { usuarioLogado } = useAuthContext();

  // Se não houver usuário logado, redireciona para a tela de login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza normalmente a rota protegida
  return children;
};

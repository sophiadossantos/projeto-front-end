// vai garantir que apenas quem está logado vai acessar o sistema

import { Navigate } from "react-router-dom"; // vai redirecionar
import { useAuthContext } from "../context/AuthContext"; // diz se tem usuário logado

export const PrivateRoute = ({ children }) => {
  // aqui vai puxar o usuário logado do context
  const { usuarioLogado } = useAuthContext();

  // se não houver, redireciona para a tela de login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  // se estiver logado, mostra o conteúdo da página normalmente
  return children;
};

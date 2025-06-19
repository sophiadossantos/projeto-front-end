import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Função para logar usuário
  const login = (usuario) => {
    setUsuarioLogado(usuario);
  };

  // Função para deslogar usuário
  const logout = () => {
    setUsuarioLogado(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuthContext = () => useContext(AuthContext);

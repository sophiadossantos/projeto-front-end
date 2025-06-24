import { createContext, useContext, useState } from "react";

// Criação do contexto de autenticação
const AuthContext = createContext();

// Componente que fornece o contexto para a aplicação
export const AuthProvider = ({ children }) => {
  // Estado que armazena o usuário logado
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Função de login: salva os dados do usuário no estado
  const login = (usuario) => {
    setUsuarioLogado(usuario);
  };

  // Função de logout: remove o usuário do estado
  const logout = () => {
    setUsuarioLogado(null);
  };

  return (
    // Torna o contexto acessível para todos os componentes filhos
    <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAuthContext = () => useContext(AuthContext);

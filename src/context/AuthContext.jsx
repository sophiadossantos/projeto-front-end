import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const login = (usuario) => {
    setUsuarioLogado(usuario);
  };

  const logout = () => {
    setUsuarioLogado(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

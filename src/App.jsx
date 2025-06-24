// Importa o CSS principal do projeto

import "./assets/styles/app.css";

// Importa o roteamento
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Contexto de autenticação
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

// Componentes fixos
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Páginas do sistema
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Usuarios } from "./pages/Usuarios";
import { Servicos } from "./pages/Servicos";

// Layout principal do app
function AppLayout() {
  const { usuarioLogado } = useAuthContext(); // Verifica se o usuário está logado

  return (
    <>
      {usuarioLogado && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <Usuarios />
            </PrivateRoute>
          }
        />

        <Route
          path="/servicos"
          element={
            <PrivateRoute>
              <Servicos />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            usuarioLogado ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>

      {usuarioLogado && <Footer />}
    </>
  );
}

// Exporta o componente App com Provider de autenticação e rotas
export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

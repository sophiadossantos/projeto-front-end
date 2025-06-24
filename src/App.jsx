// onde organiza todas as rotas de aplicação

import "./assets/styles/app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Usuarios } from "./pages/Usuarios";
import { Servicos } from "./pages/Servicos";

// importando as ferramentas de navegação, as páginas e a proteção das rotas

function AppLayout() {
  const { usuarioLogado } = useAuthContext(); // verifica se o usuário está logado

  // se estiver logado, mostra a navbar
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
  ); // se o usuário estiver logado aparece o footer
}

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

// aqui, o authprovider guarda quem está logado,
// o router cuida da navegação das páginas
// o applayout armazenas todas as rotas e telas do sistema

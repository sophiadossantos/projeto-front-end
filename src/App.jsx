import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Usuarios } from "./pages/Usuarios";
import { Servicos } from "./pages/Servicos";

function AppLayout() {
  const { usuarioLogado } = useAuthContext();

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
        <Route path="*" element={<Login />} />
      </Routes>
      {usuarioLogado && <Footer />}
    </>
  );
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

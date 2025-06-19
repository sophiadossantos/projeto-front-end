import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  // Função para deslogar e redirecionar para login
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#eee",
        padding: 10,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* Links de navegação */}
        <Link to="/dashboard" style={{ marginRight: 15 }}>
          Dashboard
        </Link>
        <Link to="/usuarios" style={{ marginRight: 15 }}>
          Usuários
        </Link>
        <Link to="/servicos">Serviços</Link>
      </div>

      {/* Botão para logout */}
      <button onClick={handleLogout}>Sair</button>
    </nav>
  );
};

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

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
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/dashboard" style={{ marginRight: "15px" }}>
          Dashboard
        </Link>
        <Link to="/usuarios" style={{ marginRight: "15px" }}>
          Usuários
        </Link>
        <Link to="/servicos">Serviços</Link>
      </div>
      <button onClick={handleLogout}>Sair</button>
    </nav>
  );
};

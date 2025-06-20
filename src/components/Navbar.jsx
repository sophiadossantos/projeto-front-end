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
    <nav>
      <div className="nav-links">
        <Link to="/">Tela Inicial</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/servicos">Serviços</Link>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </nav>
  );
};

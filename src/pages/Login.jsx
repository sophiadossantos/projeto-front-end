import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../services/api";
import { useAuthContext } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuarios = await getUsuarios();
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );
      if (usuarioEncontrado) {
        login(usuarioEncontrado);
        navigate("/dashboard");
      } else {
        setErro("Usuário ou senha inválidos");
      }
    } catch {
      setErro("Erro ao tentar logar. Tente novamente.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Entrar
        </button>
        {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
      </form>
    </div>
  );
};

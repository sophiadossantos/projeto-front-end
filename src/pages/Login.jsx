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
    setErro("");
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
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <img src="/logo.png" alt="MeuPet+" className="logo-login" />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {erro && <p>{erro}</p>}
      </form>
    </div>
  );
};

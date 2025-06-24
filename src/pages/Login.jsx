import { useState } from "react";
// useState para controlar os campos do formulário e o estado de erro

import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../services/api";
import { useAuthContext } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthContext();

  // impede o site de recarregar ao 'entrar'
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const usuarios = await getUsuarios(); // indo até o json server buscar os usuários
      // procurar informações
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      // se encontrar, vai navegar até o dashboard
      if (usuarioEncontrado) {
        login(usuarioEncontrado);
        navigate("/dashboard");

        // se não, erro
      } else {
        setErro("Usuário ou senha inválidos");
      }
    } catch {
      setErro("Erro ao tentar logar. Tente novamente.");
    }
  };

  //estrutura visual da tela de login
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

import { useState, useEffect } from "react";
import {
  getUsuarios,
  criarUsuario,
  editarUsuario,
  deletarUsuario,
} from "../services/api";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    perfil: "",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const dados = await getUsuarios();
      setUsuarios(dados);
      setErro("");
    } catch {
      setErro("Erro ao carregar usuários");
    }
  };

  const limparFormulario = () => {
    setForm({ nome: "", email: "", senha: "", telefone: "", perfil: "" });
    setEditandoId(null);
    setErro("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await editarUsuario(editandoId, form);
      } else {
        await criarUsuario(form);
      }
      limparFormulario();
      carregarUsuarios();
    } catch {
      setErro("Erro ao salvar usuário");
    }
  };

  const handleEditar = (usuario) => {
    setForm(usuario);
    setEditandoId(usuario.id);
    setErro("");
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Confirma exclusão?")) {
      try {
        await deletarUsuario(id);
        carregarUsuarios();
      } catch {
        setErro("Erro ao excluir usuário");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: 20, marginTop: 64 }}>
      <h2>Usuários</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required={!editandoId}
        />
        <input
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <input
          name="perfil"
          placeholder="Perfil"
          value={form.perfil}
          onChange={handleChange}
        />
        <button type="submit" style={{ marginTop: 8 }}>
          {editandoId ? "Salvar Alterações" : "Adicionar Usuário"}
        </button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.telefone}</td>
              <td>{u.perfil}</td>
              <td>
                <button onClick={() => handleEditar(u)}>Editar</button>{" "}
                <button onClick={() => handleExcluir(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

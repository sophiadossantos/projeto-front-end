import { useState, useEffect } from "react";
// useState para armazenar usuários e formulário
// useEffect carrega os dados ao abrir a página

import {
  getUsuarios,
  criarUsuario,
  editarUsuario,
  deletarUsuario,
} from "../services/api";

export const Usuarios = () => {
  // useState para armazenar usuários e formulário
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

  // useEffect carrega os dados ao abrir a página
  useEffect(() => {
    carregarUsuarios();
  }, []);

  // Funções CRUD com axios: get, post, put, delete
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
    <div>
      <h2>Usuários</h2>

      <form className="formulario-cadastro" onSubmit={handleSubmit}>
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
        <button type="submit">
          {editandoId ? "Salvar Alterações" : "Adicionar Usuário"}
        </button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>

      <table className="tabela-usuarios">
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
              <td data-label="Nome">{u.nome}</td>
              <td data-label="E-mail">{u.email}</td>
              <td data-label="Telefone">{u.telefone}</td>
              <td data-label="Perfil">{u.perfil}</td>
              <td data-label="Ações">
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

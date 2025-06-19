import { useState, useEffect } from "react";
import {
  getServicos,
  criarServico,
  editarServico,
  deletarServico,
} from "../services/api";

export const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    duracao: "",
    categoria: "",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarServicos();
  }, []);

  // Carrega serviços da API
  const carregarServicos = async () => {
    try {
      const dados = await getServicos();
      setServicos(dados);
      setErro("");
    } catch {
      setErro("Erro ao carregar serviços");
    }
  };

  // Limpa o formulário para novo cadastro
  const limparFormulario = () => {
    setForm({ nome: "", descricao: "", preco: "", duracao: "", categoria: "" });
    setEditandoId(null);
    setErro("");
  };

  // Trata submit do formulário para criar ou editar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await editarServico(editandoId, form);
      } else {
        await criarServico(form);
      }
      limparFormulario();
      carregarServicos();
    } catch {
      setErro("Erro ao salvar serviço");
    }
  };

  // Preenche formulário para editar
  const handleEditar = (servico) => {
    setForm(servico);
    setEditandoId(servico.id);
    setErro("");
  };

  // Excluir serviço após confirmação
  const handleExcluir = async (id) => {
    if (window.confirm("Confirma exclusão?")) {
      try {
        await deletarServico(id);
        carregarServicos();
      } catch {
        setErro("Erro ao excluir serviço");
      }
    }
  };

  // Atualiza estado do formulário conforme usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: 20, marginTop: 64 }}>
      <h2>Serviços</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="nome"
          placeholder="Nome do Serviço"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
        <input
          name="duracao"
          placeholder="Duração"
          value={form.duracao}
          onChange={handleChange}
          required
        />
        <input
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginTop: 8 }}>
          {editandoId ? "Salvar Alterações" : "Adicionar Serviço"}
        </button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Duração</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((s) => (
            <tr key={s.id}>
              <td>{s.nome}</td>
              <td>{s.descricao}</td>
              <td>{Number(s.preco).toFixed(2)}</td>
              <td>{s.duracao}</td>
              <td>{s.categoria}</td>
              <td>
                <button onClick={() => handleEditar(s)}>Editar</button>{" "}
                <button onClick={() => handleExcluir(s.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import { useState, useEffect } from "react";
import {
  getServicos,
  criarServico,
  editarServico,
  deletarServico,
} from "../services/api";

export const Servicos = () => {
  // Estrutura igual à de usuários, com campos diferentes (nome, valor, etc)
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

  // Requisições HTTP com axios e tratamento com try/catch
  const carregarServicos = async () => {
    try {
      const dados = await getServicos();
      setServicos(dados);
      setErro("");
    } catch {
      setErro("Erro ao carregar serviços");
    }
  };

  const limparFormulario = () => {
    setForm({ nome: "", descricao: "", preco: "", duracao: "", categoria: "" });
    setEditandoId(null);
    setErro("");
  };

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

  const handleEditar = (servico) => {
    setForm(servico);
    setEditandoId(servico.id);
    setErro("");
  };

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Serviços</h2>

      <form className="formulario-cadastro" onSubmit={handleSubmit}>
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
        <button type="submit">
          {editandoId ? "Salvar Alterações" : "Adicionar Serviço"}
        </button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>

      <table className="tabela-servicos">
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
              <td data-label="Nome">{s.nome}</td>
              <td data-label="Descrição">{s.descricao}</td>
              <td data-label="Preço">{Number(s.preco).toFixed(2)}</td>
              <td data-label="Duração">{s.duracao}</td>
              <td data-label="Categoria">{s.categoria}</td>
              <td data-label="Ações">
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

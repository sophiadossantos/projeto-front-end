import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getUsuarios = async () => {
  try {
    const res = await api.get("/usuarios");
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const criarUsuario = async (usuario) => {
  try {
    const res = await api.post("/usuarios", usuario);
    return res.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const editarUsuario = async (id, usuario) => {
  try {
    const res = await api.put(`/usuarios/${id}`, usuario);
    return res.data;
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    throw error;
  }
};

export const deletarUsuario = async (id) => {
  try {
    const res = await api.delete(`/usuarios/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
};

// Serviços

export const getServicos = async () => {
  try {
    const res = await api.get("/servicos");
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    throw error;
  }
};

export const criarServico = async (servico) => {
  try {
    const res = await api.post("/servicos", servico);
    return res.data;
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    throw error;
  }
};

export const editarServico = async (id, servico) => {
  try {
    const res = await api.put(`/servicos/${id}`, servico);
    return res.data;
  } catch (error) {
    console.error("Erro ao editar serviço:", error);
    throw error;
  }
};

export const deletarServico = async (id) => {
  try {
    const res = await api.delete(`/servicos/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
    throw error;
  }
};

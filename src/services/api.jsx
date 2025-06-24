import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// cria a função axios

const request = async (method, url, data) => {
  try {
    const res = await api({ method, url, data }); // Faz a requisição
    return res.data; // Retorna apenas os dados da resposta
  } catch (error) {
    // Mostra erro no console se falhar
    console.error(`Erro na requisição ${method.toUpperCase()} ${url}:`, error);
    throw error; // Repassa o erro para ser tratado no front
  }
};

// Usuários
export const getUsuarios = () => request("get", "/usuarios");
export const criarUsuario = (usuario) => request("post", "/usuarios", usuario);
export const editarUsuario = (id, usuario) =>
  request("put", `/usuarios/${id}`, usuario);
export const deletarUsuario = (id) => request("delete", `/usuarios/${id}`);

// Serviços
export const getServicos = () => request("get", "/servicos");
export const criarServico = (servico) => request("post", "/servicos", servico);
export const editarServico = (id, servico) =>
  request("put", `/servicos/${id}`, servico);
export const deletarServico = (id) => request("delete", `/servicos/${id}`);

// Exportação para ser usado nos componentes

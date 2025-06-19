import { useAuthContext } from "../context/AuthContext";

export const Dashboard = () => {
  const { usuarioLogado } = useAuthContext();

  return (
    <div style={{ padding: "2rem", marginTop: "4rem" }}>
      <h1>Bem-vindo(a), {usuarioLogado?.nome}!</h1>
      <p>Este é o dashboard do sistema.</p>
    </div>
  );
};

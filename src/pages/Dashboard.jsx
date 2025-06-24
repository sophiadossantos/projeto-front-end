// importa o lugar onde está guardado o usuário que fez o login
import { useAuthContext } from "../context/AuthContext";

export const Dashboard = () => {
  const { usuarioLogado } = useAuthContext();
  // pega as informações do usuário logado

  // parte visual
  return (
    <div className="dashboard-container">
      <img src="/telainicial.png" alt="MeuPet+" className="dashboard-image" />
      <p className="dashboard-text">
        {usuarioLogado?.nome}, que bom ter você aqui com a gente!
      </p>
    </div>
  );
};

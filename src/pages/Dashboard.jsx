// Componente que exibe uma mensagem personalizada ao usuário logado
import { useAuthContext } from "../context/AuthContext";

export const Dashboard = () => {
  // Acessa o nome do usuário logado a partir do contexto de autenticação
  const { usuarioLogado } = useAuthContext();

  return (
    <div className="dashboard-container">
      <img src="/telainicial.png" alt="MeuPet+" className="dashboard-image" />
      <p className="dashboard-text">
        {/* Mostra o nome do usuário com uma mensagem de boas-vindas */}
        {usuarioLogado?.nome}, que bom ter você aqui com a gente!
      </p>
    </div>
  );
};

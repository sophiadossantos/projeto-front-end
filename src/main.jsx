import React from "react";
import ReactDOM from "react-dom/client"; // Para renderizar o app na DOM
import { App } from "./App"; // Importa o componente principal

// Renderiza a aplicação dentro da <div id="root"> no index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Importa o React e o método ReactDOM para renderizar o app na DOM
import React from "react";
import ReactDOM from "react-dom/client"; // Para renderizar o app na DOM
// Importa o componente principal da aplicação
import { App } from "./App";

// Renderiza a aplicação dentro da <div id="root"> no index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

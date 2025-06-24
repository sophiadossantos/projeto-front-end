// Importa as regras básicas do JavaScript recomendadas pelo ESLint

import js from "@eslint/js";
// Importa as variáveis globais do ambiente de navegador (como window, document etc.)
import globals from "globals";

// Plugin para regras específicas de React Hooks
import reactHooks from "eslint-plugin-react-hooks";

// Plugin para lidar com hot-reload do React (Vite)
import reactRefresh from "eslint-plugin-react-refresh";

// Exporta um array com configurações
export default [
  // Ignora a pasta "dist" (build de produção)
  { ignores: ["dist"] },
  {
    // Aplica as regras em todos os arquivos JS e JSX
    files: ["**/*.{js,jsx}"],

    // Define opções de linguagem do JavaScript moderno
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },

    // Ativa os plugins
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    // Define as regras a serem aplicadas no código
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Gera erro para variáveis não usadas, mas ignora variáveis que começam com letra maiúscula
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": "off",
    },
  },
];

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Criação da aplicação Express
const app = (0, express_1.default)();
// Middleware para parsear o corpo das requisições JSON
app.use(express_1.default.json());
// Rota básica
app.get('/', (req, res) => {
    res.send('Servidor Node.js com Express está rodando!');
});
// Porta onde o servidor será exposto
const PORT = process.env.PORT || 3000;
// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

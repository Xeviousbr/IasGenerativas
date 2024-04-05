"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001; // Use uma porta diferente do cliente React
app.use(express_1.default.json());
// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Servidor Express com TypeScript está rodando1');
});
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

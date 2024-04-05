import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3001; // Use uma porta diferente do cliente React

app.use(express.json());

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Express com TypeScript está rodando1');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

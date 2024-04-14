import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
require('dotenv').config();

const app: Express = express();
const port = process.env.PORT || 3001; // Use uma porta diferente do cliente React

const password = '3mEERBRtS8OEjnBb';
const dbName = 'iasgenerativas';
const conexaostring = `mongodb+srv://xeviousbr:${password}@cluster0.f8vaska.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(conexaostring, {
  }).then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  }).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });
  
// mongoose.connect('mongodb://localhost:27017/nomeDoBanco', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Modelo para Cadastro
const CadastroSchema = new mongoose.Schema({
  nome: String,
  url: String,
  categoria: String,
  descricao: String,
  free: Boolean,
});

const Cadastro = mongoose.model('Cadastro', CadastroSchema);

// Rota para criar um cadastro
app.post('/cadastros', async (req: Request, res: Response) => {
    try {
      const novoCadastro = new Cadastro(req.body);
      await novoCadastro.save();
      res.status(201).json(novoCadastro);
    } catch (error) {
      if (error instanceof Error) {
        // Agora é seguro assumir que 'error' tem uma propriedade 'message'.
        res.status(400).json({ message: error.message });
      } else {
        // Aqui você trata o caso em que 'error' não é uma instância de Error.
        res.status(400).json({ message: 'Ocorreu um erro desconhecido' });
      }
    }
  });
// app.post('/cadastros', async (req: Request, res: Response) => {
//   try {
//     const novoCadastro = new Cadastro(req.body);
//     await novoCadastro.save();
//     res.status(201).json(novoCadastro);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Express com TypeScript está rodando');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

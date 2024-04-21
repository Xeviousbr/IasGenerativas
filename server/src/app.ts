import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT || 3001; 

const password = '3mEERBRtS8OEjnBb';
const dbName = 'iasgenerativas';
const conexaostring = `mongodb+srv://xeviousbr:${password}@cluster0.f8vaska.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

mongoose.connect(conexaostring).then(() => {
  console.log('Conexão com o MongoDB estabelecida com sucesso.');
}).catch(err => {
  if (err instanceof mongoose.Error.MongooseServerSelectionError) {
      console.error('Falha ao conectar ao MongoDB: Verifique se seu IP está na lista de permitidos no Atlas e se o cluster está acessível.');
  } else {
      console.error('Erro ao conectar ao MongoDB:', err);
  }
});
  
const CadastroSchema = new mongoose.Schema({
  nome: String,
  url: String,
  categoria: String,
  descricao: String,
  free: Boolean,
});

const Cadastro = mongoose.model('Cadastro', CadastroSchema);

app.post('/cadastros', async (req: Request, res: Response) => {
    console.log('Dados recebidos:', req.body);
    try {
      const novoCadastro = new Cadastro(req.body);
      await novoCadastro.save();
      res.status(201).json(novoCadastro);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Ocorreu um erro desconhecido' });
      }
    }
  });

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Express com TypeScript está rodando');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/cadastros', async (req: Request, res: Response) => {
  console.log('Obtendo dados');
  try {
      const cadastros = await Cadastro.find(); 
      res.status(200).json(cadastros);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dados', error });
  }
});

app.get('/cadastros/:id', async (req, res) => {
  try {
      const cadastro = await Cadastro.findById(req.params.id);
      if (!cadastro) {
          return res.status(404).send('Cadastro não encontrado');
      }
      res.send(cadastro);
  } catch (error) {
      res.status(500).send('Erro ao buscar o cadastro');
  }
});
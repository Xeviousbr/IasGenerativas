import express from 'express';

// Criação da aplicação Express
const app = express();

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

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


/*
/IasGenerativas
  /client
    - package.json (React App)
    /src
      /components
        - IasGenerativasList.js
      /services
        - ApiService.js
      App.js
      index.js
  /server
    /src
      /api
        - iasGenerativasController.ts
      /models
        - iaGenerativaModel.ts
      /routes
        - index.ts
      /services
        - iaGenerativaService.ts
      /utils
        - database.ts
      - app.ts
    - package.json (Node.js App)
    - tsconfig.json

*/
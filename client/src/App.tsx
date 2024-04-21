import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cadastro from './Cadastro.tsx'; 
import ItemList from './ItemList.tsx';

const App: React.FC = () => {
  console.log('App');
  return (
    <div>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro/:id" element={<Cadastro />} />
      </Routes>
    </div>
  );
};

const HomePage: React.FC = () => {
  let navigate = useNavigate();
  console.log('HomePage');
  return (
    <div>
      <h1>Catalogo de IAs Generativas</h1>
      <button onClick={() => navigate('/cadastro')}>Ir para Cadastro</button>
      <ItemList />
    </div>
  );
};

export default App;

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cadastro from './Cadastro.tsx'; 

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </div>
  );
};

const HomePage: React.FC = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Catalogo de IAs Generativas</h1>
      <button onClick={() => navigate('/cadastro')}>Ir para Cadastro</button>
    </div>
  );
};

export default App;

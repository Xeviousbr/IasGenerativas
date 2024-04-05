import React from 'react';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Botão clicado!');
  };
  return (
    <div>
      <h1>Página Inicial</h1>
      <button onClick={handleClick}>Clique Aqui</button>
    </div>
  );
};
export default App;
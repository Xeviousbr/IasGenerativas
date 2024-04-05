import React, { useState, useEffect } from 'react';

// Defina o tipo para os itens na sua lista
interface Item {
  id: number;
  name: string;
}

// Simulação de dados, substitua pela sua lógica de fetch/axios para buscar dados do backend
const mockData: Item[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  // Adicione mais itens conforme necessário
];

const ItemList = () => {
  // Especifique o tipo do estado como um array de Item
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Aqui você iria buscar os dados do seu backend
    setItems(mockData);
  }, []);

  // Função para lidar com a inclusão (adapte conforme necessário)
  const handleAdd = () => {
    console.log('Adicionar novo item');
    // Implemente a lógica de adição
  };

  // Função para lidar com a edição (adapte conforme necessário)
  const handleEdit = (id: number) => {
    console.log('Editar item com ID:', id);
    // Implemente a lógica de edição
  };

  return (
    <div>
      <button onClick={handleAdd}>Adicionar Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} <button onClick={() => handleEdit(item.id)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;

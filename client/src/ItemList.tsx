import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  _id: string;
  nome: string;
  url: string;
  categoria: string;
  descricao: string;
  free: boolean;
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Buscar os dados do servidor
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cadastros');
        setItems(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            Nome: {item.nome}, URL: {item.url}, Categoria: {item.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
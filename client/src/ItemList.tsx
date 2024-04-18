import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './layout.css';

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
    <div className="listagem">
      {items.map(item => (
        <div className="listagem-item" key={item._id}>
          <div>Nome: {item.nome}</div>
          <div>URL: {item.url}</div>
          <div>Categoria: {item.categoria}</div>
          <button className="edit-button" onClick={() => handleEdit(item.id)}>Editar</button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
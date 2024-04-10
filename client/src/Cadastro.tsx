import React, { useState } from 'react';

// Definição de tipos para os dados do formulário
interface CadastroForm {
  nome: string;
  url: string;
  categoria: string;
  descricao: string;
  free: boolean;
}

const Cadastro: React.FC = () => {
  // Estado inicial para o formulário
  const [formData, setFormData] = useState<CadastroForm>({
    nome: '',
    url: '',
    categoria: '',
    descricao: '',
    free: true,
  });

  // Manipula as mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    
    // Verifica se o elemento é um checkbox para lidar com 'checked'
    if (isCheckbox) {
      const { checked } = e.target as HTMLInputElement; // Assegura que o target é tratado como um input
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  

  // Manipula o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Aqui você pode adicionar a lógica para enviar os dados para um servidor, por exemplo
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        URL:
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Categoria:
        <select name="categoria" value={formData.categoria} onChange={handleChange}>
          <option value="">Selecione...</option>
          <option value="Científicas">Científicas</option>
          <option value="Empresas">Empresas</option>
          <option value="Generica texto">Generica texto</option>
          <option value="Imagens">Imagens</option>
          <option value="Mais de uma categoria">Mais de uma categoria</option>
          <option value="Músicas">Músicas</option>
          <option value="VídeoProgramação">Vídeo/Programação</option>
          <option value="Áudio">Áudio</option>
        </select>
      </label>
      <br />
      <label>
        Descrição:
        <input
          type="text"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Free:
        <input
          type="checkbox"
          name="free"
          checked={formData.free}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Cadastro;

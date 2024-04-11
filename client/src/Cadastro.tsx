import React, { useState } from 'react';

interface CadastroForm {
  nome: string;
  url: string;
  categoria: string;
  descricao: string;
  free: boolean;
}

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<CadastroForm>({
    nome: '',
    url: '',
    categoria: '',
    descricao: '',
    free: true,
  });
  const [errors, setErrors] = useState({
    nome: '',
    url: '',
    categoria: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { nome: '', url: '', categoria: '' };

    // Validação do nome
    if (formData.nome.length < 3) {
      newErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
      isValid = false;
    }

    // Validação da URL
    try {
      new URL(formData.url);
    } catch (_) {
      newErrors.url = 'A URL deve ser válida.';
      isValid = false;
    }

    // Validação da categoria
    if (!formData.categoria) {
      newErrors.categoria = 'Selecione uma categoria.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Aqui você pode adicionar a lógica para enviar os dados para um servidor, por exemplo
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    if (isCheckbox) {
      const { checked } = e.target as HTMLInputElement;
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
        {errors.nome && <div style={{ color: 'red' }}>{errors.nome}</div>}
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
        {errors.url && <div style={{ color: 'red' }}>{errors.url}</div>}
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
        {errors.categoria && <div style={{ color: 'red' }}>{errors.categoria}</div>}
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

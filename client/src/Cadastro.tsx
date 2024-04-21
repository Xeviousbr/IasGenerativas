import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface CadastroForm {
  nome: string;
  url: string;
  categoria: string;
  descricao: string;
  free: boolean;
}

const Cadastro: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (id && id !== "0") {
      axios.get(`http://localhost:3001/cadastros/${id}`)
        .then(response => {
          setFormData({
            nome: response.data.nome,
            url: response.data.url,
            categoria: response.data.categoria,
            descricao: response.data.descricao,
            free: response.data.free
          });
        })
        .catch(error => console.error('Erro ao buscar dados para edição:', error));
    }
  }, [id]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { nome: '', url: '', categoria: '' };

    if (formData.nome.length < 3) {
      newErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
      isValid = false;
    }

    try {
      new URL(formData.url);
    } catch (_) {
      newErrors.url = 'A URL deve ser válida.';
      isValid = false;
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Selecione uma categoria.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const method = id && id !== "0" ? 'put' : 'post';
        const url = `http://localhost:3001/cadastros${id ? `/${id}` : ''}`;
        const response = await axios[method](url, formData);
        console.log('Dados enviados com sucesso:', response.data);
        alert('Cadastro realizado com sucesso!');
        navigate('/');
      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Falha ao enviar os dados.');
      }
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
      <button type="submit">Salvar</button>

      {/* onClick={handleDelete} */}

      {id && (
        <button type="button" style={{ backgroundColor: 'red', marginLeft: '10px' }}>
          Excluir
        </button>
      )}

      <button type="button" onClick={() => navigate('/')}>Voltar</button>
    </form>
  );
};

export default Cadastro;

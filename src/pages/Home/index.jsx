import { useEffect, useState, useRef } from 'react'
import './style.css'
//import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
const [users, setUsers] = useState([])
const [rejeito, setRejeito] = useState([])

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()

const locaisDeArmazenamento = [
  { id: 1, nome: 'Depósito A' },
  { id: 2, nome: 'Sala de Quarentena B' },
  { id: 3, nome: 'Armazém Principal C' }
];

const statusAtual = [
  { id: 1, nome: 'Em Depósito' },
  { id: 2, nome: 'Em tratamento' },
  { id: 3, nome: 'Liberado' },
  { id: 4, nome: 'Descartado' },
];

const categoriaRejeito = [
  { id: 1, nome: 'Para-raios'},
  { id: 2, nome: 'Rejeito industrial'},
  { id: 3, nome: 'Detector de fumaça'},
  { id: 4, nome: 'Fonte selada'},
  { id: 5, nome: 'Material contaminado'},
];


const [rejeitoData, setRejeitoData] = useState({
    codigo_interno: '',
    descricao: '',
    categoria_id: '',
    material_id: '',
    peso_kg: '',
    dimensoes_cm: '',
    atividade_bq: '',
    tempo_decaimento_dias: '',
    nivel_referencia_bq: '',
    data_medicao_atividade: '',
    data_recebimento: '',
    data_liberacao: '',
    status_id: '',
    local_armazenamento_id: ''
  });


  function handleRejeitoChange(event) {
    const { name, value } = event.target;
    setRejeitoData(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  async function createRejeitos() {
    try {

      const dataMedicao = rejeitoData.data_medicao_atividade 
        ? new Date(rejeitoData.data_medicao_atividade).toISOString() 
        : null;

      const dataRecebimento = rejeitoData.data_recebimento
        ? new Date(rejeitoData.data_recebimento).toISOString()
        : null;

      const dataLiberacao = rejeitoData.data_liberacao
        ? new Date(rejeitoData.data_liberacao).toISOString()
        : null;

      const payload = {
        codigo_interno: rejeitoData.codigo_interno,
        descricao: rejeitoData.descricao,
        dimensoes_cm: rejeitoData.dimensoes_cm,

        categoria_id: parseInt(rejeitoData.categoria_id, 10),
        material_id: parseInt(rejeitoData.material_id, 10),
        status_id: parseInt(rejeitoData.status_id, 10),
        local_armazenamento_id: parseInt(rejeitoData.local_armazenamento_id, 10),
        peso_kg: parseFloat(rejeitoData.peso_kg),
        atividade_bq: parseFloat(rejeitoData.atividade_bq),
        tempo_decaimento_dias: parseFloat(rejeitoData.tempo_decaimento_dias),
        nivel_referencia_bq: parseFloat(rejeitoData.nivel_referencia_bq),
        data_medicao_atividade: dataMedicao,
        data_recebimento: dataRecebimento,
        data_liberacao: dataLiberacao,
      };
      

      for (const chave in payload){
        console.log(payload[chave])
        if (!payload[chave]){
          alert("Todos os campos são obrigatórios");
          return;
        }
      }
      alert("entrou aqui")
      await api.post('/rejeito', payload);
      alert('Rejeito cadastrado com SUCESSO!');

    } catch (error) {
      console.error("Falha ao cadastrar o rejeito:", error.response?.data || error.message);
      alert(`Erro ao cadastrar: ${error.response?.data?.error || 'Verifique os dados e tente novamente.'}`);
    }
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Rejeito</h1>

            <label>Código Interno</label>
            <input placeholder="Código Interno" name="codigo_interno" type="text" value={rejeitoData.codigo_interno} onChange={handleRejeitoChange} />
            
            <label>Descrição</label>
            <input placeholder="Descrição" name="descricao" type="text" value={rejeitoData.descricao} onChange={handleRejeitoChange} />
            
            <label>Categoria</label>
            <select 
              name="categoria_id" 
              value={rejeitoData.categoria_id} 
              onChange={handleRejeitoChange}
            >
              <option value="" disabled>Selecione uma categoria...</option>
              {categoriaRejeito.map(local => (
                <option key={local.id} value={local.id}>
                  {local.nome}
                </option>
              ))}
            </select>
            
            <label>Material ID</label>
            <input placeholder="Material ID" name="material_id" type="number" value={rejeitoData.material_id} onChange={handleRejeitoChange} />
            
            <label>Peso (kg)</label>
            <input placeholder="Peso (kg)" name="peso_kg" type="number" step="0.01" value={rejeitoData.peso_kg} onChange={handleRejeitoChange} />
            
            <label>Dimensões (cm)</label>
            <input placeholder="Dimensões (cm)" name="dimensoes_cm" type="text" value={rejeitoData.dimensoes_cm} onChange={handleRejeitoChange} />
            
            <label>Atividade (Bq)</label>
            <input placeholder="Atividade (Bq)" name="atividade_bq" type="number" step="0.01" value={rejeitoData.atividade_bq} onChange={handleRejeitoChange}  />
            
            <label>Tempo de Decaimento (dias)</label>
            <input placeholder="Tempo de Decaimento (dias)" name="tempo_decaimento_dias" type="number" step="0.01" value={rejeitoData.tempo_decaimento_dias} onChange={handleRejeitoChange} />
            
            <label>Nível de Referência (Bq)</label>
            <input placeholder="Nível de Referência (Bq)" name="nivel_referencia_bq" type="number" step="0.01" value={rejeitoData.nivel_referencia_bq} onChange={handleRejeitoChange} />
            
            <label>Data de Medição </label>
            <input name="data_medicao_atividade" type="datetime-local" value={rejeitoData.data_medicao_atividade} onChange={handleRejeitoChange} />
            
            <label>Data de Recebimento</label>
            <input name="data_recebimento" type="datetime-local" value={rejeitoData.data_recebimento} onChange={handleRejeitoChange} />
            
            <label>Data de Liberacão</label>
            <input name="data_liberacao" type="datetime-local" value={rejeitoData.data_liberacao} onChange={handleRejeitoChange} />
            
            <label>Status</label>
            <select 
              name="status_id" 
              value={rejeitoData.status_id} 
              onChange={handleRejeitoChange}
            >
              <option value="" disabled>Selecione um status...</option>
              {statusAtual.map(local => (
                <option key={local.id} value={local.id}>
                  {local.nome}
                </option>
              ))}
            </select>
            
            <label>Local de Armazenamento</label>
            <select 
              name="local_armazenamento_id" 
              value={rejeitoData.local_armazenamento_id} 
              onChange={handleRejeitoChange}
            >
              <option value="" disabled>Selecione um local...</option>
              {locaisDeArmazenamento.map(local => (
                <option key={local.id} value={local.id}>
                  {local.nome}
                </option>
              ))}
            </select>

            <button type='button' onClick= {createRejeitos} >Cadastrar</button>
            
          </form>
      </div>
    </>
  )
}

export default Home

import './style.css'
import Trash from '../../assets/trash.svg'

function Home() {

  const users = [{
    id: 'abc123abv',
    name: "Victor",
    age: 34,
    email: 'kkeichi@gmail.com'
  },
  {
    id: 'xyz123xyz',
    name: "Alguem",
    age: 88,
    email: 'alguem@gmail.com'
  },
  {
    id: 'xyz235xyz',
    name: "Someone",
    age: 99,
    email: 'alguem2@gmail.com'
  }
  ]

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuário</h1>
          <input placeholder="Nome" name='nome' type='text' />
          <input placeholder="Idade" name='idade' type='number' />
          <input placeholder="Email" name='email' type='text' />
          <button type='button'>Cadastrar</button>
        </form>
        {users.map(user => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: <span>{user.name}</span> </p>
              <p>Idade: <span>{user.age}</span> </p>
              <p>Email: <span>{user.email}</span> </p>
            </div>
            <button>
              <img src={Trash} />
            </button>
          </div>
        ))}

      </div>
    </>
  )
}

export default Home

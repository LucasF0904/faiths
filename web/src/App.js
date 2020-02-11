import React, { useState ,useEffect } from 'react';
import api from './services/api';
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import UserItem from './components/UserItem';


//Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
//Propriedade:Informações que um componente PAI passa para o componente FILHO 
//Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  const [users, setUsers] = useState([]);
  const [ github_username, setGithub_username] = useState('');
  const [ religion, setReligion] = useState('');
  const [ latitude, setLatitude] = useState('');
  const [ longitude, setLongitude] = useState('');
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);
  useEffect(() => {
    async function loadUsers(){
      const response = await api.get('/users');
      setUsers(response.data);
    }
    loadUsers();
  }, []);
  async function handleAddUser(e){
    e.preventDefault();
    const response = await api.post('/users', {
      github_username,
      religion,
      latitude,
      longitude,
    })
    console.log(response.data);
    setGithub_username('');
    setReligion('');
}
  return (
    <div id="app">
      <asside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddUser}>
          <div className="input-block">
            <label htmlFor="username_github">Usuário do GitHub</label>
            <input 
              name="username_github" 
              id="username_github" 
              required
              value={github_username}
              onChange={e => setGithub_username(e.target.value)}
              />
          </div>

          <div className="input-block">
            <label htmlFor="religion">Religion</label>
            <input 
              name="religion" 
              id="religion"
              required
              value={religion}
              onChange={e => setReligion(e.target.value)}
              />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                name="latitude" 
                id="latitude"
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                name="longitude" 
                id="longitude"
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                />
            </div>
          </div>
        <button type="submit">Salvar</button>
        </form>
      </asside>
      <main>
        <ul>
          {users.map(user => (
            <UserItem key={user._id} user={ user } />
          ))};
        </ul>
      </main>
    </div>
  );
}

export default App;

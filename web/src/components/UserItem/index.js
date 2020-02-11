import React from 'react';
import './styles.css';
function UserItem({ user }){
    
    return(
        <li className="user-item">
        <header>
          <img src={user.avatar_url} alt={user.name}/>
          <div className="user-info">
            <strong>{user.name}</strong>
            <span>{user.religion}</span>
          </div>
        </header>
        <a href={`https://github.com/${user.github_username}`}>Acessar Perfil do GitHub</a>
      </li>
    );
};
export default UserItem;
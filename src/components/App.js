import './App.css';
import Discover from './components/Discover'
import Menu from './components/Menu'
import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import * as API from './services/api'
import { AiOutlineGold } from 'react-icons/ai'


function App() { 

  const [ user, updateUser ] = useState(null)
  const [ isOpen, toggleWidget ] = useState(false)

  useEffect( () => {

    let params = document.getElementById('Nindoo-Widget-Script').src.split("?").pop().split("&"); 

    params.forEach( (p) => {
      const [ key, value ] = p.split('=') 
      localStorage.setItem(`discover@${key}`, value)
    })    

    if (!user) { 
      API.user.getMe()
        .then((response) => {
            updateUser(response.data)
        })
    } 

  }, [ user ]) 

  if (!user) {
    console.log('teste')
      return null
  }

  return (
    <div>
      <div className={ isOpen ? "Nindoo-Widget active" : "Nindoo-Widget" } >
        <Header user={user}/> 
        <Discover user={user} />
        <Menu user={user} />
      </div>
      <button className={ isOpen ? 'Nindoo-floater active' : 'Nindoo-floater' } onClick={() => toggleWidget(!isOpen)}>
          <AiOutlineGold size={20} />
      </button>
    </div>
  );
}

export default App;

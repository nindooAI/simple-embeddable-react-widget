import './App.css';
import Discover from './components/Discover'
import Menu from './components/Menu'
import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import * as API from './services/api'
import { AiOutlineGold } from 'react-icons/ai'
import { SketchPicker } from 'react-color'
import { SearchIcon } from './assets/icons'


function App() { 

  const [ user, updateUser ] = useState(null)
  const [ currentSetion, updateSection ] = useState('main')
  const [ isOpen, toggleWidget ] = useState(true)
  const [ searchResult, updateSearchResult ] = useState({})
  const [ searchInput, updateSearchInput ] = useState('')

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

  const find = async () => {

    if (searchInput) {
      API.data.search(searchInput) 
        .then( (response) => {
            console.log(response)
            updateSearchResult(response.data)
            updateSection('search')
        })
    } else {
      updateSearchResult([])
    }
}
  

  if (!user) {
    return null
  }

  return (
    <div>
      <div className={ isOpen ? "Nindoo-Widget active" : "Nindoo-Widget" } >
        <Header user={user}/> 
        <Discover user={user}  updateSection={updateSection} currentSection={currentSetion} searchResult={searchResult} />      
        <div className='search-container'>
            <input type='text' placeholder='Search' value={searchInput} onChange={(e) => updateSearchInput(e.target.value)}/> 
            <button className='search-icon'  onClick={() => find()}  >
                <SearchIcon />
            </button>
        </div>
        <Menu user={user} updateSection={updateSection} currentSection={currentSetion} />
      </div>
      <button className={ isOpen ? 'Nindoo-floater active' : 'Nindoo-floater' } onClick={() => toggleWidget(!isOpen)}>
          <AiOutlineGold size={20} />
      </button>
    </div>
  );
}

export default App;

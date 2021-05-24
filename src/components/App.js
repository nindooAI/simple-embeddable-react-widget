import './App.css';
import Dashboard from './components/Dashboard'
import Menu from './components/Menu'
import Spaces from './components/Spaces';
import Space from './components/Space';
import SearchResult from './components/SearchResult';
import React, { useState, useEffect } from 'react';
import * as API from './services/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Logo } from './assets/icons';
import { DotLoader } from 'react-spinners'
import Auth from './components/Auth';

function App() { 

  const [ user, updateUser ] = useState(null)
  const [ currentSection, updateSection ] = useState('discover')
  const [ isOpen, toggleWidget ] = useState(true)
  const [ searchResult, updateSearchResult ] = useState([[],[],[]])
  const [ searchInput, updateSearchInput ] = useState([])
  const [ spaces, updateSpaces ] = useState([]) 
  const [ space, updateSpace ] = useState([]) 
  const [ feed, updateFeed ] = useState({ 'Recommendation':[] })  
  const [ loading, toggleLoading ] = useState(false)

  useEffect( () => {

    function configWidget()  {

      let script_tag = document.getElementById('Nindoo-Widget-Script')
  
      // if (script_tag) {
      //   const params = script_tag.src.split("?").pop().split("&");
  
      //   params.forEach( (p) => {
      //     const [ key, value ] = p.split('=') 
      //     localStorage.setItem(`discover@${key}`, value)
      //   }) 
  
      // }
    }

    configWidget() 

    if (!localStorage.getItem('discover@token')) {
      updateSection('auth')
    } else if (!user) { 
      getUser()
    } else {
      getData()
    }

    toggleLoading(false)

  }, [ user ])  

  function getUser() {
    return API.user.getMe()
        .then((response) => {
          if (response.status === 401) {
            updateSection('auth')
          } else {
            updateUser(response.data)
          }
        })
  }

  async function getData() {
    toggleLoading(true)

    await Promise.all([ 
      API.user.getFeed()
        .then((response) => {
          updateFeed(response.data)
        }),
      API.space.getMine()
      .then((response) => {
          updateSpaces(response.data)
      })
    ])

    toggleLoading(false)
  }


  const find = async () => {

    toggleLoading(true)

    if (searchInput) {
      API.data.search(searchInput) 
        .then( (response) => {
            updateSearchResult(response.data[1])
            updateSection('search')
        })     
        

    } else {
      updateSearchResult([])
    } 

    toggleLoading(false)
  }
  
  const handleLogin = async () => {
    await getUser()
    updateSection('discover')
    getData().then( () => {
      toggleLoading(false)
    })
  }

  if (loading) {
    return (
      <div>
        <div className={ isOpen ? `Nindoo-Widget active ${currentSection}` : "Nindoo-Widget" } >
          <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'> 
            <DotLoader size={50} color='pink' />
          </div>
        </div>
          <button className={ isOpen ? 'Nindoo-floater active' : 'Nindoo-floater' } onClick={() => toggleWidget(!isOpen)}>
              <Logo width={20} />
          </button>
      </div>
    )
  }

  if (currentSection === 'auth') {
    return (
      <div>
        <div className={ isOpen ? `Nindoo-Widget active ${currentSection}` : "Nindoo-Widget" } >
          <Auth handleLogin={() => handleLogin()} />
        </div>
        <button className={ isOpen ? 'Nindoo-floater active' : 'Nindoo-floater' } onClick={() => toggleWidget(!isOpen)}>
            <Logo width={20} />
        </button>
      </div>
    )
  }

  else if (!user) {
    return null
  } 
  
  return (
    <div>
      <div className={ isOpen ? `Nindoo-Widget active ${currentSection}` : "Nindoo-Widget" } >
        <Menu user={user} spaces={spaces} space={space} updateSpace={updateSpace} updateSection={updateSection} currentSection={currentSection} />

        <div id='content'>
          { loading && <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'> <DotLoader size={50} color='pink' /> </div>}
          { currentSection === 'discover'  && <Dashboard feed={feed['Recommendation']} spaces={spaces} user={user} refresh={getData} updateSection={(space) => updateSection(space)} /> }
          { currentSection === 'spaces' && <Spaces user={user} spaces={spaces} updateSpace={(space) => updateSection(space)} refresh={getData} /> }
          { currentSection === 'search' && <SearchResult articles={searchResult} spaces={spaces}  /> }    
          {
            spaces.map( (s, i) => {
              if (currentSection === s.id) {
                return <Space user={user} space={s} updateSection={(section) => this.props.updateSection(section)} key={i} />
              } else {
                return null
              }
            })
          }
        </div>

        <div className='search-container'>
            <input type='text' placeholder='Discover' className='search-input' value={searchInput} onChange={(e) => updateSearchInput(e.target.value)}/> 
            <button onClick={() => find()} className='search-icon'  >
              <Logo />
            </button>
        </div>
      </div>
      <button className={ isOpen ? 'Nindoo-floater active' : 'Nindoo-floater' } onClick={() => toggleWidget(!isOpen)}>
          <Logo width={20} />
      </button>
    </div>
  );
}

export default App;

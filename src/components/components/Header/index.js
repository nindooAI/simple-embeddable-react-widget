import React , { useState } from 'react' 
import { Logo, SearchIcon } from '../../assets/icons'
import { withRouter } from 'react-router-dom'
import { LogoutIcon } from '../../assets/icons'
import './index.css'
import { PlusIcon } from '../../assets/icons/spaces'

function Header ({ history, user, onSearch }) {
    
    const [ searchInput, updateSearchInput ] = useState('')

    function clearSearch(value) {
        updateSearchInput(value)
        onSearch(value)
    }

    return(
        <header id='header'> 
            { user ?
                <span> Olá, { user.firstName } </span>
                : null 
            }            
        </header>
    )
}

export default Header
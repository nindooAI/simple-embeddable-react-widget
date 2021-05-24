import React , { useEffect, useState } from 'react' 
import { Logo, SearchIcon } from '../../assets/icons'
import { withRouter } from 'react-router-dom'
import { LogoutIcon } from '../../assets/icons'
import './index.css'
import { PlusIcon } from '../../assets/icons/spaces'
import UserPlaceholder from '../../assets/images/user.png'

function Header ({ history, user, onSearch }) {
    
    const [ searchInput, updateSearchInput ] = useState('')

    const [ userAvatar, updateUserAvatar ] = useState(null)

    useEffect( () => {
        const avatar = localStorage.getItem('discover@userAvatar')
        updateUserAvatar(avatar)
    }, [ userAvatar ])

    return(
        <header id='header'> 
            { user ?
                <span> Olá, { user.firstName } </span>
                : null 
            }                  
            <div className='user-picture-container'>
                <img alt='user-profile' src={ userAvatar ? userAvatar : UserPlaceholder }/> 
            </div>          
        </header>
    )
}

export default Header
import React from 'react' 
import { SpacesIcon } from '../../assets/icons/menu'
import { DiscoverOn, DiscoverOff } from '../../assets/icons'
import './index.css'
import { withRouter } from 'react-router-dom'
import UserPlaceholder from '../../assets/images/user.png'
import { AiOutlinePlusCircle, AiOutlineGold } from 'react-icons/ai'

const options = [
    // { name: 'Abilities', icon: (classes) => <AbilitiesIcon className={classes} /> },
    { name: 'Spaces', icon: (classes) => <SpacesIcon className={classes} /> },
    // { name: 'Store', icon: (classes) => <StoreIcon className={classes} /> }, 
]


class Menu extends React.Component  {

    constructor(props) {
        super(props) 
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        this.setState({
            userAvatar: localStorage.getItem('discover@userAvatar')
        })
    }

    handleClick(item) {       
        const { activeButton } = this.state  
        const { history } = this.props 

        if (!['login','register'].includes(activeButton)) {
            this.setState({
                activeButton: item.toLowerCase()
            })
            history.push('/' + item.toLowerCase())
        } 
    }

    render() {
        const { activeButton, userAvatar } = this.state 

        return (
            <menu className={ activeButton === 'login' ? 'expand' : ''}>
                <button onClick={ () => this.handleClick('')}>
                    <AiOutlinePlusCircle size={40} />
                </button>
                <button className='main-button'>
                    <AiOutlineGold size={20} />
                </button>
                <button className={activeButton === 'register' || activeButton === 'profile' ? 'active' : ''} onClick={() => this.handleClick('profile')}>
                    <img alt='user-profile' src={ userAvatar ? userAvatar : UserPlaceholder }/> 
                </button>
            </menu>
          )
    }




}

export default Menu
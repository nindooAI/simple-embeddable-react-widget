import React from 'react' 
import { SpacesIcon } from '../../assets/icons/menu'
import { DiscoverOn, DiscoverOff } from '../../assets/icons'
import './index.css'
import { withRouter } from 'react-router-dom'
import UserPlaceholder from '../../assets/images/user.png'
import { AiOutlinePlusCircle, AiOutlineGold } from 'react-icons/ai'

const options = [
    // { name: 'Abilities', icon: (classes) => <AbilitiesIcon className={classes} /> },
    { name: 'Spaces', icon: (classes) => <SpacesIcon className={classes} />, slug: 'spaces' },
    { name: 'Main', icon: (classes) => <AiOutlineGold size={20} className={classes} />, slug: 'main' }
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
        const { currentSection, updateSection } = this.props 

        return (
            <menu className={ activeButton === 'login' ? 'expand' : ''}>
                {
                    options.map( (option) => {
                        return (
                            <button className={option.slug + '-button'} onClick={ () => updateSection(option.slug)}>
                                { option.icon() }
                            </button>
                        )
                    })
                }               
                <div className='user-picture-container'>
                    <img alt='user-profile' src={ userAvatar ? userAvatar : UserPlaceholder }/> 
                </div>
            </menu>
          )
    }




}

export default Menu
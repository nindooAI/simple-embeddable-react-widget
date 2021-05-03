import React from 'react' 
import './index.css'
import { PlusIcon } from '../../../../../../assets/icons/spaces'
import SpaceForm from './components/spaceForm'

class Sidebar extends React.Component {
    
    constructor(props) {
        super(props) 
        this.state = {
            loading: true,
            current: null,
            modalIsOpen: false
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.errorMessage !== this.props.errorMessage && !this.props.errorMessage) {
            this.setState({
                modalIsOpen: false
            })
        } 

        if (this.props.errorMessage && !this.state.modalIsOpen) {
            this.setState({
                modalIsOpen: true
            })
        }
    }

    onCreate(name, description) {
        this.props.onCreateSpace(name, description)
    }

    onClick(space) {
        if (space.name !== this.state.current) {
            this.props.onSelectSpace(space)
        }
        this.setState({
            current: space.name
        })
    }

    toggleModal() {
        this.setState((state) => ({
            modalIsOpen: !state.modalIsOpen
        }))
    }
    
    render() {
        const { spaces, errorMessage, user } = this.props 
        const { spaceFormIsOpen, current, modalIsOpen } = this.state 

        return (
            <div id='sidebar'>
                <header>
                    <span> Spaces </span>
                    <button className='plus-button' onClick={() => this.toggleModal()}> 
                        <PlusIcon/>
                    </button>
                </header>

                <div className={ modalIsOpen ? 'modal open' : 'modal'}>
                    <SpaceForm errorMessage={errorMessage} onAdd={ (name, description) => this.onCreate(name, description) } />
                </div>
                <div className={ spaceFormIsOpen ? 'space-form open' : 'space-form close' }>
                    
                </div>
                <h4> My spaces </h4>
                <div className='spaces-list'>
                    { spaces.filter( (space) => space.role !== 'CONTRIBS_IN').map( (space, index) => { 
                        return (
                            <div className={ space.name === current ? 'space-item active' : 'space-item'} key={index} onClick={() => this.onClick(space)}> 
                                <div
                                    ref={space.name} 
                                    className='thumbnail'
                                    style={{
                                        background: `rgb(225, 232, 237) url("${space.image_url ? space.image_url : user.avatar }") no-repeat scroll center center / cover`
                                    }}
                                />
                                <p> { space.name } </p>
                            </div>
                        )
                    })}
                </div>
                <h4> Shared with me </h4>
                <div className='spaces-list'>
                    { spaces.filter( (space) => space.role === 'CONTRIBS_IN').map( (space, index) => { 
                        return (
                            <div className={ space.name === current ? 'space-item active' : 'space-item'} key={index} onClick={() => this.onClick(space)}> 
                                <div
                                    ref={space.name} 
                                    className='thumbnail'
                                    style={{
                                        background: `rgb(225, 232, 237) url("${space.image_url}") no-repeat scroll center center / cover`
                                    }}
                                />
                                <p> { space.name } </p>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }

}

export default Sidebar
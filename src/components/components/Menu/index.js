import React from 'react' 
import './index.css'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { Accordion } from 'react-bootstrap'

const defaultOptions = [
    { name: 'Discover', slug: 'discover' },
    { name: 'Search', slug: 'search'},
    { name: 'Spaces', slug: 'spaces'}
]


class Menu extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {
            options: defaultOptions,
            open: false
        }
    }

    handleClick(section) {            
        this.setState({
            open: false
        })
        this.props.updateSection(section)   
    }

    setOpen() {
        this.setState( (state) => ({
            open: !state.open
        }))
    }   

    render() {
        const { open, options } = this.state 
        const { currentSection, spaces } = this.props  

        const header = typeof currentSection === 'number' ? spaces.filter( s => s.id === currentSection)[0].name : currentSection.charAt(0).toUpperCase() + currentSection.slice(1) 

        return (
            <menu className={ open ? 'active' : '' }>
                <Accordion.Toggle onClick={() =>this.setOpen()}> <h5> { open ? 'Menu' : header } { open ? <BsChevronUp /> : <BsChevronDown />  } </h5> </Accordion.Toggle>
                <Accordion.Collapse in={open} className='menu-select' defaultValue={currentSection} onChange={ (e) => this.handleClick(e.target.value)}>
                    <div>

                    {
                        options.map( (option, index) => { 

                            return (
                                <div key={index} className={ currentSection === option.slug ? ('active option' ): 'option'} value={option.slug} onClick={ () => this.handleClick(option.slug)}>
                                    { option.name }
                                </div>
                            )
                        })
                    } 
                    {  spaces.map( (option, index) => { 
                            return (
                                <div value={option.slug} key={index} className={ currentSection === option.id ? 'active sub-option' : 'sub-option'} onClick={ () => this.handleClick(option.id)}>
                                    { option.name }
                                </div>
                            )
                        })
                    }
                    </div>
                </Accordion.Collapse>         
            </menu>
          )
    }




}

export default Menu
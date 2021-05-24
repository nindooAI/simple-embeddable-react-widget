import React from 'react' 
import './index.css'
import SpaceCard from './components/SpaceCard'
import EmptySpaceCard from './components/EmptySpaceCard'
import * as API from '../../services/api'

class Sidebar extends React.Component {
    
    constructor(props) {
        super(props) 
        this.state = {
            loading: true,
            current: null,
            modalIsOpen: false,
            spaces: props.spaces
        }
    }

    componentDidMount() {

        API.space.getMine()
        .then((response) => {
            this.setState({
                spaces: response.data
             })
        })
    }


    onCreate(name, description) {
        API.space.create({ name, description: '' })
            .then( (response) => {
                if (response.status === 201) {
                    this.props.refresh() 
                    this.props.updateSpace(response.data.id)
                }
            })
    }

    onClick(space) { 
        this.props.updateSpace(space)
    }
    
    render() {
        const { spaces } = this.props 

        return (
            <div id='spaces'>
                <div className='d-flex flex-wrap justify-content-between overflow-auto'>
                    { spaces.map( (space, index) => {
                        return (
                            <SpaceCard space={space} key={index} onClick={(space) => this.onClick(space)} />
                        )
                    })}
                    <EmptySpaceCard onCreate={(name) => this.onCreate(name)} />
                </div>
            </div>
        )
    }

}

export default Sidebar
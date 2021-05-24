import React from 'react' 
import * as API from '../../services/api'
import Card from '../Card'

class Spaces extends React.Component {
    
    constructor(props) {
        super(props) 
        this.state = {
            space: props.space,
            articles: [],
            syncing: false,
            contributors: []
        }
    }

    async componentDidMount() {
        await this.getSpaceData()
        await this.getContributors()
    }
   
    onClick(index) {         
        this.setState({ 
            rightIsOpen: true, 
            sideBarIsOpen: true, 
            space: index
        })
        
    }

    async onCreateSpace(name, description) {
        this.props.createSpace({ name, description })    
    }

    async getSpaceData() {

        this.setState({
            syncing: true
        })

        const response = await API.space.getData(this.props.space.id) 

        this.setState({
            syncing: false,
            articles: response.data 
        })
    }

    async getContributors() { 
        
        this.setState({
            syncing: true 
        })

        await API.space.getContributors(this.props.space.id)
                .then( (response) => {
                    this.setState({
                        contributors: response.data,
                        syncing: false
                    })
                })
    }

    render() {
        const { articles } = this.state 

        return (
            <section id='spaces'>
                <section className='link_container'> 
                    { articles.map( (article, index) => {
                        return (
                            <Card data={article} />
                        )})}
                </section>
            </section>
        )
    }


}

export default Spaces
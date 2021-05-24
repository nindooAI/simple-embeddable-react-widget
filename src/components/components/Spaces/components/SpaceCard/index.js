import React from 'react' 
import * as API from '../../../../services/api'

// import Interactions from '../interactions'

class SpaceCard extends React.Component {
    
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
        const { space, articles, contributors } = this.state 

        return (
            <section className='space_card'>
                <div className='d-flex justify-content-between'>
                    {/* <span className='small'>
                        { moment(space.updatedAt).fromNow()}
                    </span> */}
                </div>

                <div className='d-flex justify-content-between my-1'  onClick={() => this.props.onClick(space.id) }>
                    <div>
                        <h5 className='p-0 cursor-pointer'> <strong> { space.name } </strong> </h5>
                    </div>
                </div>
                <ul className='contributors'>
                    { contributors.map( (c, i) => {
                        return (
                            <li key={i}>
                                <img alt='user-profile' src={!c.avatar.includes('/static') ? c.avatar : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} width={30} height={30} />
                            </li>
                        )
                    })}
                </ul>                    
                <ul className='mini_articles'> 
                    { articles.map( (article, index) => { 

                        return (
                            <li key={index}> 
                                <div
                                    ref={index} 
                                    className='thumbnail'
                                    style={{
                                        background: `rgb(225, 232, 237) url("${article.image_url}") no-repeat scroll center center / cover`
                                    }}
                                />     
                            </li>
                        )})
                    }
                </ul>
            </section>
        )
    }


}

export default SpaceCard
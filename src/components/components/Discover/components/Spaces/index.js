import React from 'react' 
import './index.css'
import Sidebar from './components/Sidebar'
import { withRouter } from 'react-router-dom'
import * as API from '../../../../services/api'
import Interactions from './components/Interactions'
import { LinkIcon } from '../../../../assets/icons'

// import Interactions from '../interactions'

class Spaces extends React.Component {
    
    constructor(props) {
        super(props) 
        this.state = {
            space: null,
            articles: [],
            syncing: false
        }
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

    async getSpaceData(space) {

        this.setState({
            syncing: true,
            space: null
        })

        const response = await API.space.getData(space.id) 

        this.setState({
            space: space,
            syncing: false,
            articles: response.data 
        })
    }

    render() {
        const { space, articles, syncing } = this.state 
        const { spaces, errorMessage, user} = this.props 

        const styles = {width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'} 

        return (
            <section id='spaces'>
                <div className='left'>
                    <Sidebar spaces={spaces} user={user} errorMessage={errorMessage} onSelectSpace={(space) => this.getSpaceData(space)} onCreateSpace={(name, description) => this.onCreateSpace(name, description)}/>
                </div>
                <div className='content'> 
                    <h3> { space && space.name } </h3>
                    <section className='link_container'> 
                        { space && articles.map( (article, index) => {
                            return (
                                <div key={index}> 
                                    <div
                                        ref={index} 
                                        className='thumbnail'
                                        style={{
                                            background: `rgb(225, 232, 237) url("${article.image_url}") no-repeat scroll center center / cover`
                                        }}
                                    /> 
                                    <div className='info'> 
                                        <div></div>
                                        <p className='title'> 
                                            {article.title} 
                                        </p>     
                                        {/* <p className='description'> 
                                            {article.description} 
                                        </p>                                                     */}
                                        <a href={article.link} target='_blank' rel='noopener noreferrer' > { article.link } </a>
                                    </div> 
                                <div className='link-type' style={{ top: -25, left: 30 }}>
                                    <LinkIcon />
                                </div>
                            </div>
                            )})
                        }
                    </section>
                </div>
                <div className='right'>
                    { space && <Interactions space={space} deleteSpace={ (spaceId) => this.props.deleteSpace(spaceId)} leaveSpace={ (spaceId) => this.props.leaveSpace(spaceId)} /> }
                </div>
            </section>
        )
    }


}

export default withRouter(Spaces)
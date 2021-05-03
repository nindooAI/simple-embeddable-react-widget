import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Sidebar from './components/Sidebar'
import { CheckIcon, LinkIcon } from '../../../../assets/icons'
import { PlusIcon, SumarizeIcon } from '../../../../assets/icons/spaces'
import FadeIn from 'react-fade-in'
import { withRouter } from 'react-router-dom'
import * as API from '../../../../services/api'
import ReactLoading from 'react-loading'

class SearchResult extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            coordinates: {
                top: 0,
                left: 0,
            },
            modalIsOpen: false,
            current: null,
            similar: [],
            loading: true,
            spaces: [],
            showSpaceList: false
        }
    }

    async onClick(article) {

        const coordinates = ReactDOM
            .findDOMNode(this.refs[article.title])
            .getBoundingClientRect()


        await API.data.getSimilar(article.id)
            .then((response) => {
                console.log(response)
                this.setState({
                    modalIsOpen: true,
                    coordinates,
                    current: article.title,
                    article: article,
                    similar: response.data
                })
            })

    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            coordinates: {
                top: 0,
                left: 0
            }
        })

        setTimeout(1000, () => {
            this.setState({
                current: null
            })
        })
    }

    toggleSpaceList() {
        this.setState((state) => ({
            showSpaceList: !state.showSpaceList
        }))
    }

    async onAccessLink(article) {
        await API.user.readData(article.id) 
    }

    async addDataToSpace(spaceId) {
        const { article } = this.state

        this.setState({
            addingToSpace: spaceId
        })

        await API.space.addData(spaceId, article.id)
            .then( (response) => {
                this.setState({
                    addingToSpace: null,
                    addedToSpace: spaceId
                })
            })

        setTimeout(() => { 
            this.setState({
                addedToSpace: null
            })
        }, 1000)
    }

    goToProfile(username) {
        console.log(username)
    }

    render() {
        const { coordinates, modalIsOpen, showSpaceList, article, current, similar, addingToSpace, addedToSpace } = this.state
        const { articles, spaces } = this.props 

        return (
            <section id='dashboard' className='column'>
                    { articles[0].length > 0 &&
                    <div>
                        <FadeIn>
                        <p> Results </p>
                        <section className='result_container'>
                            { articles[0].map((article, index) => {
                                return (
                                    <div key={index} className='article'>
                                        <div
                                            ref={article.title}
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
                                            <a onClick={ () => this.onAccessLink(article) } href={article.link} target='_blank' rel="noopener noreferrer"> { article.link } </a>
                                        </div> 
                                        <div className='link-type'  onClick={() => this.onClick(article)} style={{ top: -25, left: 30 }}>
                                            <LinkIcon />
                                        </div>
                                    </div>
                                )

                            }) }
                            </section>
                        </FadeIn> 
                    </div>
                    }
                    { articles[2].length > 0 && <div> <FadeIn>
                        <p> Spaces </p>
                        <section className='result_container'>
                        { articles[2].map((space, index) => {
                            return (
                                <div className='space' key={index} > 
                                    <div
                                        ref={space.name} 
                                        className='thumbnail'
                                        style={{
                                            background: `rgb(225, 232, 237) url("${space.image}") no-repeat scroll center center / cover`
                                        }}
                                    />
                                    <p> { space.name } </p>
                                    <p> { space.description } </p>
                                </div>
                            )

                        }) }
                        </section>
                    </FadeIn></div>
                    }

                    { articles[1].length > 0 && <div><FadeIn>
                        <p> Users </p>
                        <section className='result_container'>
                        { articles[1].map((user, index) => {
                            return (
                                <div onClick={() => this.goToProfile(user.id) } className='user'> 
                                    <img alt='user-profile' src={user.avatar} className='user-avatar' />
                                    <p>{  user.firstName } { user.lastName } 
                                    <span>({user.username}) </span> </p>   
                                </div>  
                            )

                        }) }
                        </section>
                    </FadeIn> </div> }



                {/* <div className={modalIsOpen ? 'modal show' : 'modal'}>
                    <div
                        className='rectangle'
                        style={{
                            left: coordinates.left - 137,
                            top: coordinates.top - 127,
                            width: 'auto',
                            height: 'auto'
                        }}
                    >
                        <div
                            className='thumbnail'
                            style={{
                                background: current ? `rgb(225, 232, 237) url("${article.image_url}") no-repeat scroll center center / cover` : ''
                            }}
                        />
                        <div className='options' style={{ top: coordinates.top - 102, left: coordinates.left - 137 }}>
                            <p>
                                <button onClick={() => this.toggleSpaceList()}>
                                    <PlusIcon />
                                </button>
                                <span> Add to Space </span>
                            </p>
                            <p>
                                <button onClick={() => console.log('Click')}>
                                    <SumarizeIcon />
                                </button>
                                <span> Summarize</span>
                            </p>
                        </div>
                        {showSpaceList &&
                            <ul>
                                {spaces.map((space, index) => {
                                    return ( 
                                    <li key={index} onClick={() => this.addDataToSpace(space.id)}> 
                                        <p> {space.name} </p> 
                                        { space.id === addingToSpace && <ReactLoading type='spinningBubbles' height={20} width={20} /> } 
                                        { space.id === addedToSpace && <CheckIcon height={20} /> }     
                                    </li>
                                )})}
                            </ul>

                        }
                    </div>
                    <div className='link-type' style={{ top: coordinates.top - 162, left: coordinates.left - 117 }}
                        onClick={() => this.closeModal()}>
                        <LinkIcon />
                    </div>
                </div> */}


                {/* <div className={modalIsOpen ? 'right show' : 'right'}>
                    <Sidebar showHeader={true} articles={similar} />
                </div> */}


            </section>
        )
    }


}

export default SearchResult
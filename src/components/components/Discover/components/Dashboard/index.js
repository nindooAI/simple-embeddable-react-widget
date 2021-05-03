import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { CheckIcon, LinkIcon } from '../../../../assets/icons'
import FadeIn from 'react-fade-in'
import { withRouter } from 'react-router-dom'
import * as API from '../../../../services/api'
import ReactLoading from 'react-loading'

class Dashboard extends React.Component {

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

    render() {
        const { coordinates, modalIsOpen, showSpaceList, article, current, similar, addingToSpace, addedToSpace } = this.state
        const { feed, spaces, user } = this.props 


        return (
            <section id='dashboard'>
                    <FadeIn>
                            { Object.entries(feed).map( ([ area, articles ], index) => {
                                
                                return <section className='link-section' key={index}>
                                    <h4> { area } </h4>
                                    <section className='link_container'>
                                    { articles.map((article, index) => {
                                        return (
                                            <div key={index}>
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
                                                    <a id='link' onClick={ () => this.onAccessLink(article) }href={article.link} target='_blank' rel="noopener noreferrer"> { article.link } </a>
                                                </div> 
                                                <div className='link-type'  onClick={() => this.onClick(article)}>
                                                    <LinkIcon  />
                                                </div>
                                            </div>
                                        )

                                    }) }
                                    </section>
                                </section>
                            })}
                    </FadeIn>
            </section>
        )
    }


}

export default Dashboard
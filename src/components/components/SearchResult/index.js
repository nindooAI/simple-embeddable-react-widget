import React from 'react'
import './index.css'
import * as API from '../../services/api'
import Card from '../Card'

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

        await API.data.getSimilar(article.id)
            .then((response) => {
                this.setState({
                    modalIsOpen: true,
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
        const { articles } = this.props 

        return (
            <section id='dashboard'>
                <section className='link_container search'>
                    { articles[0].map((article, index) => { 

                        if (index > 9) return null 
                        
                        return (
                            <Card onAccessLink={this.onAccessLink} data={article} />
                        )

                    }) }
                    {
                        articles[1].map((article, index) => { 

                            if (index > 9) return null 
                            
                            return (
                                <Card onAccessLink={this.onAccessLink} data={article} />
                            )

                        }) }
                </section>
            </section>
        )
    }


}

export default SearchResult
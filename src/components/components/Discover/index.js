import React from 'react';
import './index.css'
import Header from '../Header'
import Dashboard from './components/Dashboard';
import Spaces from './components/Spaces'
import { 
  Route,
  Switch,
  withRouter
} from 'react-router-dom'

import LoadingScreen from '../../components/LoadingScreen'

import * as API from '../../services/api'
import SearchResult from './components/SearchResult';

class Discover extends React.Component { 

    constructor(props) {
        super(props) 
        this.state = {
            user: props.user, 
            feed: {}, 
            spaces: [],
            categories: [],
            loading: true,
            searchResult: []
        }
    }

    async componentDidMount() {

        await API.user.getFeed()
            .then((response) => {
                this.setState({
                    feed: response.data
                })
            })

        await API.space.getMine()
            .then((response) => {
                this.setState({
                    spaces: response.data,
                    loading: false
                })
            })

        await API.data.getCategories() 
                .then( async (response) => {
                    this.setState({
                        categories: response.data 
                    })
                })
    }

    async createSpace(data) {
        const response = await API.space.create(data)

        if (response.status === 201) {
            this.setState((state) => ({
                spaces: [response.data].concat(state.spaces),
                errorMessage: null
            }))
        } else { 
            this.setState({
                errorMessage: response.message
            })
        }
    
    }

    async deleteSpace(spaceId) {
        await API.space.remove(spaceId)
            .then( (response) => {
                this.setState((state) => ({
                    spaces: state.spaces.filter( (s) => s.id !== spaceId)
                }))
            })

    }

    async leaveSpace(spaceId) {
        await API.space.removeUser(spaceId)
            .then( (response) => {
                this.setState((state) => ({
                    spaces: state.spaces.filter( (s) => s.id !== spaceId)
                }))
            })
    }

    async findData(searchInput) {

        if (searchInput) {
            await API.data.search(searchInput) 
                .then( (response) => {
                    console.log(response)
                    this.setState({
                        searchResult: response.data
                    })
                })
        } else {
            this.setState({
                searchResult: []
            })
        }

    }

    render() {
        const { spaces, feed, searchResult, user, errorMessage, loading, categories} = this.state 

        if (loading) {
            return <div id='content'><LoadingScreen /></div>
        }

        return (
            <div id='content'>
                { searchResult[0] || searchResult[1] || searchResult[2] ? 
                    <SearchResult articles={searchResult} spaces={spaces} /> :
                    <Dashboard feed={feed} spaces={spaces} user={user} loading={loading} />
                }
            </div>
        )
    }

}

export default Discover

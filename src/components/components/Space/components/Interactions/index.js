import React from 'react' 
import * as API from '../../../../../../services/api'
import { PlusIcon } from '../../../../../../assets/icons/spaces'
import { SearchIcon, CheckIcon } from '../../../../../../assets/icons'

class Interactions extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            searchInput: '', 
            searchResult: {},
            contributors: [],
            modalIsOpen: false,
            syncing: false,
            typingTimeout:  0,
            searching: false 
        }
    }

    componentDidMount() {
        this.getContributors()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.space.id !== this.props.space.id) {
            this.getContributors()
        }
    }

    updateInput(value) {
        const self = this

        if (this.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        this.setState({
            searchInput: value,
            searching: value ? true : false, 
            searchResult: value ? [] : this.state.searchResult,
            typingTimeout: value === '' ? 0 : setTimeout(function () {
                self.find(self.state.name);
                }, 2000)
        });

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

    async find() {

        await API.user.findByUsername(this.state.searchInput)
                .then( (response) => {

                    if (response.status !== 200) {
                        this.setState({
                            searchResult: {},
                            searching: false
                        })

                    } else {
                        this.setState({
                            searchResult: response.data,
                            searching: false
                        })
                    }
                })
    }

    async addContributor(id) {

        await API.space.addUser(id, this.props.space.id)
                .then( (response) => { 
                    this.setState( (state) => ({
                        contributors: state.contributors.concat(response.data),
                        modalIsOpen: false 
                    }))
                })
    }

    toggleModal() {
        this.setState((state) => ({
            modalIsOpen: !state.modalIsOpen
        }))
    }

    render() {
        const { space } = this.props 
        const { searchResult, searchInput, contributors, modalIsOpen, syncing, searching } = this.state 


        const styles = {width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'} 

        if (syncing) {
            return (
                <div style={styles}>
                </div>
            )
        }

        return (
            <div id='info'>
                <section>
                    <header>
                        <p> Contributors </p>
                        <button>
                            <PlusIcon onClick={() => this.toggleModal()} />
                        </button>
                    </header>
                    <div className={ modalIsOpen ? 'modal open' : 'modal'}>
                        <div className='search-container'>
                            <button className='search-icon' onClick={() => this.find()}>
                                <SearchIcon />
                            </button>
                            <input type='text' placeholder='Search by username' value={searchInput} onChange={ (e) => this.updateInput(e.target.value)} /> 
                        </div>
                        { searchInput && searchResult.id && 
                            <div onClick={() => this.addContributor(searchResult.id) } className='search-result'> 
                                <img alt='user-profile' src={searchResult.avatar} className='user-avatar' />
                                <p>{  searchResult.firstName } { searchResult.lastName } 
                                <span>({searchResult.username}) </span> </p>   
                                { contributors.filter( (c) => c.id === searchResult.id).length ? <CheckIcon /> : null }
                            </div>
                        } 
                        {
                            searchInput && !searching && !searchResult.id && <div className='search-result'> 0 results found </div>
                        }
                    </div>
                    <div className='contributors'>
                        { contributors.map( c => {
                            return (
                                <div>
                                    <img alt='user-profile' src={c.avatar} width={30} height={30} style={{ borderRadius: 15, margin: 10 }} />
                                    <span> { c.firstName } </span>
                                </div>
                            )
                        })}
                    </div>
                </section>
                {
                    contributors.length > 1 ? 
                    <button className='delete-button' onClick={() => this.props.leaveSpace(space.id) }> Leave space </button> :
                    <button className='delete-button' onClick={() => this.props.deleteSpace(space.id) }> Delete space </button>
                }
            </div>
        )
    }
}

export default Interactions
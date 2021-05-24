import React from 'react'
import { DotLoader } from 'react-spinners'
import './index.css'
import * as API from '../../services/api'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Card from '../Card'


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            modalIsOpen: false,
            current: null,
            similar: [],
            spaces: [],
            showSpaceList: false,
            items: props.feed
        }
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    componentDidMount() {
        this.setState({
            items: this.props.feed
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.feed !== this.props.feed) {
            this.setState({
                items: this.props.feed
            })
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

    async onAccessLink(article) {
        await API.user.readData(article.id) 
    }

    async addDataToSpace(spaceId, articleId) {

        await API.space.addData(spaceId, articleId)
            .then( (response) => {
                this.setState({
                    addingToSpace: null,
                    addedToSpace: spaceId
                })
            })
    }

    onDragEnd(result) {

        if (result.combine) { 

            this.setState({
                loading: true
            })

            const articles = this.state.items.filter( s => s.link === result.combine.draggableId || s.link === result.draggableId) 
            
            const data = {
                name: 'New Space',
                description: ''
            }

            API.space.create(data)
                .then( async (response) => {
                    if (response.status === 201) articles.forEach( (a) => this.addDataToSpace(response.data.id, a.id)) 
                    await this.props.refresh()
                    this.props.updateSection(response.data.id)
                })

        }

        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.props.feed,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items
        });
    }      

    render() {
        const { items, loading } = this.state 

        return (
            <DragDropContext id='dashboard' onDragEnd={this.onDragEnd} > 
                { items.length === 0 && <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'><DotLoader size={50} color='pink' /> </div> }
                { !loading && 
                <Droppable isCombineEnabled droppableId='feed'>
                    { (provided, snapshot) => (
                    <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef} 
                        className='link_container' 
                    >
                        { items.map((article, index) => {
                            return (
                                <Draggable 
                                    key={index}
                                    index={index}
                                    draggableId={article.link}
                                >
                                    { (provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                                <Card onAccessLink={this.onAccessLink} data={article} />
                                        </div>
                                    )}
                                </Draggable >
                            )
                        }) }
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
            }
            {
                loading && <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'> <DotLoader size={50} color='pink' /> <p className='color-pink'> Criando Space </p>  </div>
            }
            </DragDropContext>
        )
    }


}

export default Dashboard
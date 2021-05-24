import React from 'react' 
import './index.css'
import { LinkIcon } from '../../../../assets/icons'

class Sidebar extends React.Component {

    onClick(article) {
        return null
    }
    
    render() {
        const { articles } = this.props 
      
        return (
            <div id='sidebar'>
                <header>
                    <span> Semelhantes </span>
                </header>
                <section className='similar-links'>
                    { articles.map( (article, index) => {
                        return (
                        <div key={index} onClick={() => this.onClick(article)}>
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
                                <a href={article.link} target='_blank' rel="noopener noreferrer"> { article.link } </a>
                            </div> 
                            <div className='link-type' style={{ top: -25, left: 30 }}>
                                <LinkIcon />
                            </div>
                        </div>
                        )
                    })}
                </section>
            </div>
        )

    }
}

export default Sidebar
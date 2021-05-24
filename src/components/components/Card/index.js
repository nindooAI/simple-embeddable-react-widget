import React from 'react' 
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'

const Card = ({ data, onAccessLink }) => {

    return (
        <div 
            className='thumbnail' 
            style={{
                background: `rgb(225, 232, 237) url("${data.image_url}") no-repeat scroll center center / cover`
            }}
        >
            <div className='info'> 
                <p className='title'> 
                    {data.title} 
                </p>     
                <div className='fav-btn'>
                    { Math.random() > 0.5 ? <BsHeart /> : <BsFillHeartFill /> }
                </div>
                <a className='link' onClick={ () => onAccessLink(data) } href={data.link} target='_blank' rel="noopener noreferrer"> { data.link.split('/')[2] } </a>
            </div>               
            <div className='card-type'>
                Article    
            </div>                                      
        </div>
    )


}

export default Card 
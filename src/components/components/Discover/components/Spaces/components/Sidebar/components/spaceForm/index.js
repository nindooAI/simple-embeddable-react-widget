import React, { useState } from 'react'
import './index.css'

function SpaceForm ({ onAdd, errorMessage }) {

    const [ name, updateName ] = useState('')
    const [ description, updateDescription ] = useState('') 

    return (
        <section className='space-form'>
            <div className='input-container'>
                <input value={name} onChange={ (e) => updateName(e.target.value) }/> 
                <p> Nome </p>
            </div>    
            <div className='input-container'>
                <textarea value={description} onChange={ (e) => updateDescription(e.target.value) }/> 
                <p> Description </p>
            </div>   
            <div className='flex'> 
                <p> { errorMessage } </p>
                <button onClick={() => onAdd(name, description)} >
                    Create
                </button>
            </div>
        </section>
    )



}

export default SpaceForm
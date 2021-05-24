import React, { useState }from 'react' 
import { Form, Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
// import Interactions from '../interactions'

const EmptySpaceCard = ({ onCreate }) => {

    const [ name, updateName ] = useState()
    const [ validated, setValidated ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.currentTarget 

        if (form.checkValidity() === false ) {
            e.stopPropagation()
        }

        setValidated(true)

        if (name) {
            onCreate(name, '')
        }
    }
    
    return (
        <section className='empty_space_card' >
            <Form onSubmit={handleSubmit} noValidate validated={validated} >
                <Form.Row>
                    <Form.Group>
                        <Form.Control className='space-input' required type='text' placeholder='Nova coleção' value={name} onChange={ (e) => updateName(e.target.value) } />
                        <Form.Control.Feedback type='invalid'>
                            Escolha um nome para sua coleção
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Button type='submit' className='bg-transparent w-100 border-0 text-white'>
                        <FaPlus />
                    </Button>
                </Form.Row>
            </Form>
            
        </section>
    )
}

export default EmptySpaceCard
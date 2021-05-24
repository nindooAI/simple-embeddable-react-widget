import React, { useState } from 'react' 
import { Form, Col, Button } from 'react-bootstrap'
import * as API from '../../services/api'
import logo from '../../assets/icons/logo.svg'

function Auth({ handleLogin }) { 


    const [ email, updateEmail ] = useState('')
    const [ password, updatePassword ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault() 

        API.auth.login(email, password)
            .then( (response) => {
                if (response.status === 201) {
                    handleLogin()
                }
            })
    }

    return (
        <Form className='d-flex flex-column justify-content-center h-100 p-5 text-white text-left' onSubmit={handleSubmit}>
            <Form.Row className='py-3'>
                <Col>
                    <Form.Group>
                        <Form.Label> E-mail </Form.Label>
                        <Form.Control type='email' value={email} onChange={ (e) => updateEmail(e.target.value)} />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group>
                        <Form.Label> Senha </Form.Label>
                        <Form.Control type='password'  value={password} onChange={ (e) => updatePassword(e.target.value)}/>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Button type='submit' className='login-btn my-3 mx-auto'> <img src={logo} width='25px' /> Entrar </Button>
            </Form.Row>
        </Form>
    )
}

export default Auth
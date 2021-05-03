import axios from 'axios'
import jwt_decode from 'jwt-decode' 
import config from '../config'

const instance = axios.create({
    baseURL:`http://${config.auth.host}:${config.auth.port}` 
});

async function register(email, username, password) {
    
    const body = {
        email: email,
        login: username,
        password: password
    }

    
    return await instance.post('/users', 
            JSON.stringify(body), 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*'
                }  
            })
                .then( (response) => {
                    return response
                })
                .catch( (error) => {
                    return {
                        status: error.response.status, 
                        message: error.response.data.error.message
                    }
                })
}

async function login(username, password) {

    const body = {
        handle: username,
        password: password
    }
    
    return await instance.post('/login', 
            JSON.stringify(body), 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*'
                }  
            })
                .then( (response) => {

                    const token = response.data.token
                    const data = jwt_decode(token) 
                    
                    localStorage.setItem('discover@token', response.data.token)
                    localStorage.setItem('discover@username', data.login )
                    
                    return response
                })
                .catch( (error) => { 

                    if (error.response) {
                        return {
                            status: error.response.status, 
                            message: error.response.data.error.message
                        }
                    } else {

                        return {
                            status: 500, 
                            message: 'Something went wrong. Please, try again.'
                        }
                    }
                })

}

export {
    login, 
    register 
}
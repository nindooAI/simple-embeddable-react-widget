import axios from 'axios'
import jwt_decode from 'jwt-decode'
import config from '../config'

const instance = axios.create({
    baseURL:`http://${config.discover.host}:${config.discover.port}` 
});

async function findByUsername(username) {

    const token = localStorage.getItem('discover@token')  

    return await instance.get(`/user/username/${username}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

async function getMe() {

    const token = localStorage.getItem('discover@token')  
    const { login } = jwt_decode(token)

    const response = await findByUsername(login) 

    localStorage.setItem('discover@userId', response.data.id )
    localStorage.setItem('discover@userAvatar', response.data.avatar)
    localStorage.setItem('discover@username', login)


    return await instance.get(`/user/${response.data.id}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

async function create(data) {

    const token = localStorage.getItem('discover@token')

    return await instance.post('/user/',
        data, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( (response) => { 
            localStorage.setItem('discover@userId', response.data.id)
            return response
        })
        .catch( (error) => {
            return {
                status: error.response.status, 
                message: error.response.data.error.message
            }
        })
    
}

async function getData() {

    const token = localStorage.getItem('discover@token')
    
    return await instance.get('/data', 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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


async function addInterest(interestId) {
    
    const token = localStorage.getItem('discover@token') 
    const userId = localStorage.getItem('discover@userId')

    return await instance.post(`/user/${userId}/interest/${interestId}`, 
                '', 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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


async function getFeed() {
    
    const token = localStorage.getItem('discover@token') 
    const userId = localStorage.getItem('discover@userId') 

    return await instance.get(`/user/${userId}/feed/`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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

async function readData(dataId) {

    const token = localStorage.getItem('discover@token') 
    const userId = localStorage.getItem('discover@userId')

    return await instance.post(`/user/${userId}/data/${dataId}`, 
                '', 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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

export {
    findByUsername,
    create,
    getData,
    getMe,
    addInterest,
    getFeed,
    readData
}
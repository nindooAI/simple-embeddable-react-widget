import axios from 'axios'
import config from '../config'

const instance = axios.create({
    baseURL:`http://${config.discover.host}:${config.discover.port}` 
});

async function create(data) {

    const token = localStorage.getItem('discover@token')
    const userId = localStorage.getItem('discover@userId')
   
    return await instance.post(`/user/${userId}/space`, 
            JSON.stringify(data), 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
        })
            .catch( (error) => {
                return {
                    status: error.response.status, 
                    message: error.response.data.error.message
                }
            })
            .then( async (response) => {
                return response
            })

}

async function remove(spaceId) {

    const token = localStorage.getItem('discover@token')
   
    return await instance.delete(`/space/${spaceId}`, 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
        })
            .catch( (error) => {
                return {
                    status: error.response.status, 
                    message: error.response.data.error.message
                }
            })
            .then( async (response) => {
                return response
            })

}

async function removeUser(spaceId) {

    const token = localStorage.getItem('discover@token')
    const userId = localStorage.getItem('discover@userId')
   
    return await instance.delete(`/space/${spaceId}/user/${userId}`, 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
        })
            .catch( (error) => {
                return {
                    status: error.response.status, 
                    message: error.response.data.error.message
                }
            })
            .then( async (response) => {
                return response
            })

}


async function getMine() {

    const token = localStorage.getItem('discover@token')
    const userId = localStorage.getItem('discover@userId') 

    return await instance.get(`/user/${userId}/space`, 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
            })
                .catch( (e) => {
                    return {
                        data: []
                    }
                })
                .then( (response) => {
                    return response
                })
}

async function addData(spaceId, dataId) {

    const token = localStorage.getItem('discover@token')
    const userId = localStorage.getItem('discover@userId') 

    return await instance.post(`/user/${userId}/space/${spaceId}/data/${dataId}`, '',
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
            })
                .catch( (error) => {
                    return {
                        status: error.response.status, 
                        message: error.response.data.error.message
                    }
                })
                .then( (response) => {
                    return response
                })
                   
}


async function addUser(userId, spaceId) {

    const token = localStorage.getItem('discover@token')

    return await instance.post(`/space/${spaceId}/user/${userId}/`, '',
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
            })
                .catch( (error) => {
                    return {
                        status: error.response.status, 
                        message: error.response.data.error.message
                    }
                })
                .then( (response) => {
                    return response
                })
                   
}

async function getData(spaceId) {

    const token = localStorage.getItem('discover@token')
    const userId = localStorage.getItem('discover@userId') 

    return await instance.get(`/user/${userId}/space/${spaceId}/data/`, 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
            })
                .catch( (error) => {
                    return {
                        status: error.response.status, 
                        message: error.response.data.error.message
                    }
                })
                .then( (response) => {
                    return response
                })
                   
}

async function getContributors(spaceId) {

    const token = localStorage.getItem('discover@token')

    return await instance.get(`/space/${spaceId}/user`, 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
            })
                .catch( (error) => {
                    return {
                        status: error.response.status, 
                        message: error.response.data.error.message
                    }
                })
                .then( (response) => {
                    return response
                })
                   
}
    
export {
    create, 
    getMine,
    addData,
    getData,
    addUser,
    getContributors,
    remove,
    removeUser
}
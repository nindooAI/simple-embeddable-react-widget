import axios from 'axios' 
import config from '../config'

const instance = axios.create({
    baseURL:`http://${config.discover.host}:${config.discover.port}` 
});


async function getSimilar(id) {

    const token = localStorage.getItem('discover@token')

    return await instance.get(`/data/${id}/similar`, 
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

async function getCategories() {

    const token = localStorage.getItem('discover@token') 

    return await instance.get(`/categories/`, 
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

async function search(input) {

    const token = localStorage.getItem('discover@token') 

    return await instance.post(`/data/search`, 
            JSON.stringify({ input }),
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
    getSimilar,
    getCategories,
    search
}

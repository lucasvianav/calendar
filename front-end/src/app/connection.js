import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:7000/api',
    headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) }
})

export default api
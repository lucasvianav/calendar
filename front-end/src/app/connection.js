import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:7000/api' })

export default api
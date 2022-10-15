import axios from 'axios'

const instance = axios.create({
    baseURL :'http://younikweb.ir/login/api/v1',
    timeout :5000 
})



export default instance
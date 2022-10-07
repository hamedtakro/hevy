import axios from 'axios'

const instance = axios.create({
    baseURL :'https://hamedtodos-default-rtdb.asia-southeast1.firebasedatabase.app',
    timeout :5000 
})



export default instance
import axios from 'axios'

let instance = axios.create({
    baseURL: 'https://react-my-burger-bb362.firebaseio.com/'
})

export default instance
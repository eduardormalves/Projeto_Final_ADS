import axios from 'axios';


export default api = axios.create(
    {
        baseURL: "http://10.0.0.152:3000"
    }
)
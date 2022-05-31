import axios from "axios";
import {baseAPI} from "../common/Constantes";
const user = JSON.parse(localStorage.getItem('user')); 

export default axios.create({
    baseURL: baseAPI + "/api/",
    headers: {
        "Content-type": "application/json",
        "Authorization": (user != null) ? 'Bearer ' + user.token : ''
    }
});
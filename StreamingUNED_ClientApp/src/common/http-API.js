import axios from "axios";
const user = JSON.parse(localStorage.getItem('user'));
export default axios.create({
    baseURL: "https://localhost:44329/api/",
    headers: {
        "Content-type": "application/json",
        "Authorization": (user != null) ? 'Bearer ' + user.token : ''
    }
});
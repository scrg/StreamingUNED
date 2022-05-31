import axios from "axios";
import {baseAPI} from "../common/Constantes";
const API_URL = baseAPI + "/api/auth/";
class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "gettoken", {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }
    getCurrentUser() {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user != null) {
            if (new Date().toJSON() > user.expiredTime) {
                this.logout();
            }
        }
        return user;
    }
}
export default new AuthService();
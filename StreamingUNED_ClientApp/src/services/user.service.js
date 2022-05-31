import axios from 'axios';
import authHeader from './auth-header';
import {baseAPI} from "../common/Constantes";

const API_URL =  baseAPI +'/api/usuarios/';
const user = JSON.parse(localStorage.getItem('user'));
class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}
export default new UserService();
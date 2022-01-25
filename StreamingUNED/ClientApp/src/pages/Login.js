import React, { useState} from 'react';
import md5 from 'md5';
import   'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import { error } from 'jquery';


function Login() {

    const baseUrl = "https://localhost:44329/api/usuarios";
    const cookies = new Cookies();

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleChange = e => {

        const { name, value } = e.target;
        setForm({
            ...form, [name]: value
        });

        console.log(form);

    }

    const iniciarSesion = async () => {
        await axios.get(baseUrl + `/${form.username}/${md5(form.password)}`)
            .then(response => {
                return response.data;
            }).then(response => {
                if (response.length > 0) {
                    var respuesta = response[0];
                    console.log(respuesta);
                }
                else {
                    alert('El usuario o la contraseña no son válidos');
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (


        <div className="containerPrincipal">

            <div className="containerLogin">
                <div className="form-group">
                    <label>Usuario;</label>
                    <br />
                    <input type="text"
                        className="form-control"
                        name="username"
                        onChange={ handleChange}
                    />
                    <label>Contraseña;</label>
                    <br />
                    <input type="password"
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={ ()=>iniciarSesion() } > Iniciar sesión </button>
                </div>
            </div>
        </div>
        );
}

export default Login;
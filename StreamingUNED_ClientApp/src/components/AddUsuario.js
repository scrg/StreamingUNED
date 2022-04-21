import React, { useState } from "react";
import UsuarioService from "../services/UsuarioService";

const AddUsuario = () => {
    const initialUsuarioState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fkrol: "",
        fkestado: "",
        correoelectronico: "",
        clave: ""
    };
    const [usuario, setUsuario] = useState(initialUsuarioState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };
    const saveUsuario = () => {
        var data = {
            nombre: usuario.nombre,
            apellido1: usuario.apellido1,
            apellido2: usuario.apellido2,
            correoelectronico: usuario.correoelectronico,
            clave: usuario.clave,
            fkestado: 1,
            fkrol: 3
        };
        UsuarioService.create(data)
            .then(response => {
                setUsuario({
                    id: response.data.id,
                    nombre: response.data.nombre,
                    apellido1: response.data.apellido1,
                    apellido2: response.data.apellido2,
                    correoelectronico: response.data.correoelectronico,
                    clave: response.data.clave
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newUsuario = () => {
        setUsuario(initialUsuarioState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h2>Registro completado correctamente.</h2>
                    <h4>Para poder acceder a la aplicacion, debe esperar a que su usuario sea validado por un gestor.</h4>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="correoelectronico">Correo Electrónico</label>
                        <input
                            type="text"
                            className="form-control"
                            id="correoelectronico"
                            required
                            value={usuario.correoelectronico}
                            onChange={handleInputChange}
                            name="correoelectronico"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="clave">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="clave"
                            value={usuario.clave}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={usuario.nombre}
                            onChange={handleInputChange}
                            name="nombre"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido1">Apellido 1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido1"
                            required
                            value={usuario.apellido1}
                            onChange={handleInputChange}
                            name="apellido1"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido2">Apellido 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido2"
                            required
                            value={usuario.apellido2}
                            onChange={handleInputChange}
                            name="apellido2"
                        />
                    </div>
                    <button onClick={saveUsuario} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};
export default AddUsuario; 
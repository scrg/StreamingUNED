import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"
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
    const saveUsuario = (e) => { 
        e.preventDefault();
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
        <>
            {submitted ? (
                <div>
                    <h2>Registro completado correctamente.</h2>
                    <h4>Para poder acceder a la aplicacion, debe esperar a que su usuario sea validado por un gestor.</h4>
                </div>
            ) : (

                <Form onSubmit={saveUsuario}>
                    <Form.Group> 
                        <Form.Label htmlFor="correoelectronico" >Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"  
                            className="form-control"
                            id="correoelectronico"
                            required
                            value={usuario.correoelectronico}
                            onChange={handleInputChange}
                            name="correoelectronico"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password" >Clave</Form.Label>
                        <Form.Control
                            type="password"
                            className="form-control"
                            name="clave"
                            value={usuario.clave}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="nombre" >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={usuario.nombre}
                            onChange={handleInputChange}
                            name="nombre"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="apellido1" >Apellido 1</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="apellido1"
                            required
                            value={usuario.apellido1}
                            onChange={handleInputChange}
                            name="apellido1"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="apellido2" >Apellido 2</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="apellido2"
                            required
                            value={usuario.apellido2}
                            onChange={handleInputChange}
                            name="apellido2"
                        />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Add New Employee
                    </Button>
                </Form>
            )}
        </>
    );
};
export default AddUsuario; 
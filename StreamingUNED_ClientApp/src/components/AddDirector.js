import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"
import DirectorService from "../services/DirectorService";

import { useNavigate } from 'react-router-dom';
 
const AddDirector = () => {
    const initialDirectorState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechanacimiento: ""
    };
    const history = useNavigate();
    const [director, setDirector] = useState(initialDirectorState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setDirector({ ...director, [name]: value });
    };
    const saveDirector = (e) => {
        e.preventDefault();
        var data = {
            nombre: director.nombre,
            apellido1: director.apellido1,
            apellido2: director.apellido2,
            fechanacimiento: director.fechanacimiento
        };
        DirectorService.create(data)
            .then(response => {
                setDirector({
                    id: response.data.id,
                    nombre: response.data.nombre,
                    apellido1: response.data.apellido1,
                    apellido2: response.data.apellido2,
                    fechanacimiento: response.data.fechanacimiento
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newDirector = () => {
        setDirector(initialDirectorState);
        setSubmitted(false);
    };
    const listado = () => {
        history("/directores/");
    };
    return (
        <>
            {submitted ? (
                <div>
                    <h4>Creado correctamente</h4>
                    <button className="btn btn-success" onClick={newDirector}>
                        Nuevo
                    </button>
                </div>
            ) : (

                <Form onSubmit={saveDirector}>
                    <Form.Group>
                        <Form.Label htmlFor="nombre" >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={director.nombre}
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
                            value={director.apellido1}
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
                            value={director.apellido2}
                            onChange={handleInputChange}
                            name="apellido2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="fechanacimiento" >Fecha Nacimiento</Form.Label>
                        <Form.Control
                            type="date"
                            className="form-control"
                            id="fechanacimiento"
                            required
                            value={director.fechanacimiento ?? ""}
                            onChange={handleInputChange}
                            name="fechanacimiento"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center mt-3"> 
                            <Button type="submit" className="btn btn-success">
                                Añadir director
                            </Button>
                    </Form.Group>
                </Form>
            )}
            <div className="d-flex justify-content-center mt-3"> 
                <Button className="btn btn-success" onClick={() => listado()}><span>Volver</span></Button> 
            </div>
        </>
    );
};
export default AddDirector; 
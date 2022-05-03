import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"
import InterpreteService from "../services/InterpreteService";

const AddInterprete = () => {
    const initialInterpreteState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechanacimiento: ""
    };
    const [interprete, setInterprete] = useState(initialInterpreteState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setInterprete({ ...interprete, [name]: value });
    };
    const saveInterprete = (e) => { 
        e.preventDefault();
        var data = {
            nombre: interprete.nombre,
            apellido1: interprete.apellido1,
            apellido2: interprete.apellido2,
            fechanacimiento: interprete.fechanacimiento
        };
        InterpreteService.create(data)
            .then(response => {
                setInterprete({
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
    const newInterprete = () => {
        setInterprete(initialInterpreteState);
        setSubmitted(false);
    };
    return (
        <>
            {submitted ? (
                <div>
                    <h4>Creado correctamente</h4>
                    <button className="btn btn-success" onClick={newInterprete}>
                        Nuevo
                    </button>
                </div>
            ) : (

                <Form onSubmit={saveInterprete}> 
                    <Form.Group>
                        <Form.Label htmlFor="nombre" >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={interprete.nombre}
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
                            value={interprete.apellido1}
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
                            value={interprete.apellido2}
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
                            value={interprete.fechanacimiento ?? ""}
                            onChange={handleInputChange}
                            name="fechanacimiento"
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
export default AddInterprete; 
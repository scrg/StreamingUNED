import React, { useState, useEffect } from "react";
import InterpreteService from "../services/InterpreteService";
import { Form, Button } from "react-bootstrap"
import moment from 'moment';


const Interprete = props => {
    const initialInterpreteState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechanacimiento: new Date(Date.now()),
        published: false
    };


    const [currentInterprete, setCurrentInterprete] = useState(initialInterpreteState);
    const [message, setMessage] = useState("");

    const getInterprete = id => {
        InterpreteService.get(id)
            .then(response => {
                setCurrentInterprete(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getInterprete(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentInterprete({ ...currentInterprete, [name]: value });
    }; 

    const updateInterprete = (e) => {        
        e.preventDefault();
        InterpreteService.update(currentInterprete.id, currentInterprete)
            .then(response => {
                console.log(response.data);
                setMessage("Actualizado");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteInterprete = () => {
        InterpreteService.remove(currentInterprete.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/Interpretes");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const listado = () => {
        window.location.href = window.location.origin + "/interpretes/";
    };

    return (
        <div className="edit-form">
            <h4>Interprete</h4>
            <Form onSubmit={updateInterprete}>
                <Form.Group>
                    <Form.Label htmlFor="nombre" >Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="nombre"
                        required
                        value={currentInterprete.nombre}
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
                        value={currentInterprete.apellido1}
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
                        value={currentInterprete.apellido2}
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
                        value={moment(currentInterprete.fechanacimiento).format('YYYY-MM-DD')}
                        onChange={handleInputChange}
                        name="fechanacimiento"
                    />
                </Form.Group>
                <Button variant="success" type="submit" >
                    Actualizar
                </Button>
                <Button variant="danger" onClick={deleteInterprete}>
                    Eliminar
                </Button>
                <Button onClick={() => listado()}>Volver</Button>  
                <p>{message}</p>
            </Form>
        </div>
    );
};

export default Interprete;
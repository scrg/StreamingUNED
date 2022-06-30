import React, { useState, useEffect } from "react";
import DirectorService from "../services/DirectorService";
import { Form, Button } from "react-bootstrap"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
 


const Director = props => {
    const initialDirectorState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechanacimiento: new Date(Date.now()),
        published: false
    };

    const history = useNavigate();

    const [currentDirector, setCurrentDirector] = useState(initialDirectorState);
    const [message, setMessage] = useState("");

    const getDirector = id => {
        DirectorService.get(id)
            .then(response => {
                setCurrentDirector(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getDirector(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentDirector({ ...currentDirector, [name]: value });
    };

    const updateDirector = (e) => {
        e.preventDefault();
        DirectorService.update(currentDirector.id, currentDirector)
            .then(response => {
                console.log(response.data);
                setMessage("Actualizado");
            })
            .catch(e => {
                console.log(e);
            });
    };
 
    const listado = () => {
        history("/directores/");
    };

    return ( 
            <div className="edit-form">
                <h4>Director</h4>

                <Form onSubmit={updateDirector}>
                    <Form.Group>
                        <Form.Label htmlFor="nombre" >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={currentDirector.nombre}
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
                            value={currentDirector.apellido1}
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
                            value={currentDirector.apellido2}
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
                            value={moment(currentDirector.fechanacimiento).format('YYYY-MM-DD')}
                            onChange={handleInputChange}
                            name="fechanacimiento"
                        />
                    </Form.Group>
                    <Button variant="success" type="submit" >
                        Actualizar
                    </Button> 
                    
                    <Button onClick={() => listado()}>Volver</Button>  
                    <p>{message}</p>
                </Form>
            </div>
            );
};

            export default Director;
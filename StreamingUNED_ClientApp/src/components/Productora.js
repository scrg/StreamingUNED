import React, { useState, useEffect } from "react";
import ProductoraService from "../services/ProductoraService";
import { Form, Button } from "react-bootstrap" 


const Productora = props => {
    const initialProductoraState = {
        id: null,
        nombre: "", 
        published: false
    };


    const [currentProductora, setCurrentProductora] = useState(initialProductoraState);
    const [message, setMessage] = useState("");

    const getProductora = id => {
        ProductoraService.get(id)
            .then(response => {
                setCurrentProductora(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getProductora(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentProductora({ ...currentProductora, [name]: value });
    };

    const updateProductora = (e) => {
        e.preventDefault();
        ProductoraService.update(currentProductora.id, currentProductora)
            .then(response => {
                console.log(response.data);
                setMessage("Actualizado");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteProductora = () => {
        ProductoraService.remove(currentProductora.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/Productoras");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const listado = () => {
        window.location.href = window.location.origin + "/productoras/";
    };

    return ( 
            <div className="edit-form">
                <h4>Productora</h4>

                <Form onSubmit={updateProductora}>
                    <Form.Group>
                        <Form.Label htmlFor="nombre" >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={currentProductora.nombre}
                            onChange={handleInputChange}
                            name="nombre"
                        />
                    </Form.Group> 
                    <Button variant="success" type="submit" >
                        Actualizar
                    </Button>
                    <Button variant="danger" onClick={deleteProductora}>
                        Eliminar
                    </Button>
                    
                    <Button onClick={() => listado()}>Volver</Button>  
                    <p>{message}</p>
                </Form>
            </div>
            );
};

            export default Productora;
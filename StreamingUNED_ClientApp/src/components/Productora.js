import React, { useState, useEffect } from "react";
import ProductoraService from "../services/ProductoraService";
import { Form, Button } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom';


const Productora = props => {
    const initialProductoraState = {
        id: null,
        nombre: "",
        published: false
    };


    const history = useNavigate();
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

    const { id } = useParams();
    useEffect(() => {
        getProductora(id);
    }, [id]);

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
 
    const listado = () => {
        history("/productoras/");
    };

    return (
        <>
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
                    <Form.Group className="d-flex justify-content-center mt-3">
                        <Button variant="success" type="submit" >
                            Actualizar
                        </Button>
                    </Form.Group>
                </Form>
                <p className="d-flex justify-content-center mt-3">{message}</p>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Button className="btn btn-success" onClick={() => listado()}><span>Volver</span></Button>
            </div>
        </>
    );
};

export default Productora;
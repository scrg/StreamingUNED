import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"
import ProductoraService from "../services/ProductoraService";

const AddProductora = () => {
    const initialProductoraState = {
        id: null,
        nombre: ""
    };
    const [productora, setProductora] = useState(initialProductoraState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setProductora({ ...productora, [name]: value });
    };
    const saveProductora = (e) => {
        e.preventDefault();
        var data = {
            nombre: productora.nombre
        };
        ProductoraService.create(data)
            .then(response => {
                setProductora({
                    id: response.data.id,
                    nombre: response.data.nombre
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newProductora = () => {
        setProductora(initialProductoraState);
        setSubmitted(false);
    };
    const listado = () => {
        window.location.href = window.location.origin + "/productoras/";
    };
    return (
        <>
            {submitted ? (
                <div>
                    <h4>Creado correctamente</h4>
                    <button className="btn btn-success" onClick={newProductora}>
                        Nuevo
                    </button>
                </div>
            ) : (

                <Form onSubmit={saveProductora}>
                    <Form.Group>
                        <Form.Label htmlFor="nombre" >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={productora.nombre}
                            onChange={handleInputChange}
                            name="nombre"
                        />
                    </Form.Group>
                            <Button type="submit">
                                Añadir productora
                            </Button>
                </Form>
            )}
            <div class="col text-center">
                <Button onClick={() => listado()}><span>Volver</span></Button> 
            </div>
        </>
    );
};
export default AddProductora; 
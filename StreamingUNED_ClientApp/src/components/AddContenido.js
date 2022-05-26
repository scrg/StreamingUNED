import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap"
import ContenidoService from "../services/ContenidoService";
import ContenidoTematicaService from "../services/ContenidoTematicaService";
import ContenidoTipoService from "../services/ContenidoTipoService";
import Select from 'react-select';
// https://codesandbox.io/s/react-select-v2-required-input-3xvvb?fontsize=14&file=/src/App.js

const AddContenido = () => {
    const [listTematicas, setTematicas] = useState([{ value: "value", label: "label" }]);
    const [listTipos, setTipos] = useState([{ value: "value", label: "label" }]);
    const [submitted, setSubmitted] = useState(false);

    const initialContenidoState = {
        id: null,
        fkEstado: 1,
        fkTipo: 1,
        fkTematica: 1,
        fkProductora: 1,
        identificador: "",
        titulo: "",
        anyoestreno: 0,
        fecha: "",
        duracion: 0,
        caratula: "",
        caratulaSrc: "",
        caratulaFile: "",
        recurso: "",
        fkDirectors: [],
        fkInterpretes: []

    };
    const [contenido, setContenido] = useState(initialContenidoState);

    useEffect(() => {
        retrieveTematicas();
        retrieveTipos();
    }, []);

    const retrieveTematicas = () => {
        ContenidoTematicaService.getAll()
            .then((response) => {
                const dropDownValue = response.data.map((response) => ({
                    "value": response.id,
                    "label": response.nombre
                }))
                setTematicas(dropDownValue);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const retrieveTipos = () => {
        ContenidoTipoService.getAll()
            .then((response) => {
                const dropDownValue = response.data.map((response) => ({
                    "value": response.id,
                    "label": response.nombre
                }))
                setTipos(dropDownValue);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const handleInputChange = event => {
        const { name, value } = event.target;
        setContenido({ ...contenido, [name]: value });
    };
    const saveContenido = (e) => {
        e.preventDefault();
        var data = {
            fkEstado: contenido.fkEstado,
            fkTipo: contenido.fkTipo,
            fkTematica: contenido.fkTematica,
            fkProductora: contenido.fkProductora,
            identificador: contenido.identificador,
            titulo: contenido.titulo,
            anyoestreno: contenido.anyoestreno,
            fecha: contenido.fecha,
            duracion: contenido.duracion,
            caratula: contenido.caratula,
            caratulaSrc: contenido.caratulaSrc,
            caratulaFile: contenido.caratulaFile,
            recurso: contenido.recurso,
            fkDirectors: contenido.fkDirectors,
            fkInterpretes: contenido.fkInterpretes
        };
        ContenidoService.create(data)
            .then(response => {
                setContenido({
                    id: response.data.id,
                    fkEstado: response.data.fkEstado,
                    fkTipo: response.data.fkTipo,
                    fkTematica: response.data.fkTematica,
                    fkProductora: response.data.fkProductora,
                    identificador: response.data.identificador,
                    titulo: response.data.titulo,
                    anyoestreno: response.data.anyoestreno,
                    fecha: response.data.fecha,
                    duracion: response.data.duracion,
                    caratula: response.data.caratula,
                    caratulaFile: response.data.caratulaFile,
                    caratulaSrc: response.data.caratulaSrc,
                    recurso: response.data.recurso,
                    fkDirectors: response.data.fkDirectors,
                    fkInterpretes: response.data.fkInterpretes
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newContenido = () => {
        setContenido(initialContenidoState);
        setSubmitted(false);
    };
    const listado = () => {
        window.location.href = window.location.origin + "/contenidos/";
    };
    return (
        <>
            {submitted ? (
                <div>
                    <h4>Creado correctamente</h4>
                    <button className="btn btn-success" onClick={newContenido}>
                        Nuevo
                    </button>
                </div>
            ) : (

                <Form onSubmit={saveContenido}>
                    <Form.Group>
                        <Form.Label htmlFor="titulo" >Título</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="titulo"
                            required
                            value={contenido.titulo}
                            onChange={handleInputChange}
                            name="titulo"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="identificador" >Identificador</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="identificador"
                            required
                            value={contenido.identificador}
                            onChange={handleInputChange}
                            name="identificador"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="fecha" >Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            className="form-control"
                            id="fecha"
                            required
                            value={contenido.fecha ?? ""}
                            onChange={handleInputChange}
                            name="fecha"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="tipo" >Tipo</Form.Label>
                        <Select
                            // defaultValue={[listTipos[2]]}                            
                            name="tipo"
                            options={listTipos}
                            className="basic-select"
                            classNamePrefix="select"
                            onChange={handleInputChange}    
                            
                        />
                    </Form.Group> 
                    <Form.Group>
                        <Form.Label htmlFor="tematica" >tematica</Form.Label>
                        <Select
                            // defaultValue={[listTematicas[1]]}
                            isMulti
                            name="tematica"
                            options={listTematicas}
                            className="basic-multi-select"
                            classNamePrefix="select"      
                            onChange={handleInputChange}                      
                        />
                    </Form.Group>
                    <Button type="submit">
                        Añadir contenido
                    </Button>
                </Form>
            )}
            <div className="col text-center">
                <Button onClick={() => listado()}><span>Volver</span></Button>
            </div>
        </>
    );
};
export default AddContenido; 
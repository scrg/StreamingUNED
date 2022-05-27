import React, { useState, useEffect } from "react";
import { Form, Button, FormGroup } from "react-bootstrap"
import ContenidoService from "../services/ContenidoService";
import ContenidoTematicaService from "../services/ContenidoTematicaService";
import ContenidoTipoService from "../services/ContenidoTipoService";
import DirectorService from "../services/DirectorService";
import InterpreteService from "../services/InterpreteService";
import ProductoraService from "../services/ProductoraService";
import Select from 'react-select';
// https://codesandbox.io/s/react-select-v2-required-input-3xvvb?fontsize=14&file=/src/App.js



const AddContenido = () => {
    const [listTematicas, setTematicas] = useState([{ value: "value", label: "label" }]);
    const [listDirectores, setDirectores] = useState([{ value: "value", label: "label" }]);
    const [listInterpretes, setInterpretes] = useState([{ value: "value", label: "label" }]);
    const [listTipos, setTipos] = useState([{ value: "value", label: "label" }]);
    const [listProductoras, setProductoras] = useState([{ value: "value", label: "label" }]);
    const [submitted, setSubmitted] = useState(false);

    const defaultImgSrc = '../logo192.png';

    const initialContenidoState = {
        id: null,
        fkEstado: 1,
        fkTipo: 0,
        fkTematica: 0,
        fkProductora: null,
        identificador: "",
        titulo: "",
        anyoestreno: 0,
        fecha: "",
        duracion: 0,
        caratula: "",
        caratulaSrc: defaultImgSrc,
        caratulaFile: "",
        recurso: "",
        fkDirectors: [],
        fkInterpretes: []

    };
    const [contenido, setContenido] = useState(initialContenidoState);

    useEffect(() => {
        retrieveTematicas();
        retrieveTipos();
        retrieveDirectores();
        retrieveInterpretes();
        retrieveProductoras();
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

    const retrieveProductoras = () => {
        ProductoraService.getAll()
            .then((response) => {
                const dropDownValue = response.data.map((response) => ({
                    "value": response.id,
                    "label": response.nombre
                }))
                setProductoras(dropDownValue);
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

    const retrieveDirectores = () => {
        DirectorService.getAll()
            .then((response) => {
                const dropDownValue = response.data.map((response) => ({
                    "value": response.id,
                    "label": response.nombreCompleto
                }))
                setDirectores(dropDownValue);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const retrieveInterpretes = () => {
        InterpreteService.getAll()
            .then((response) => {
                const dropDownValue = response.data.map((response) => ({
                    "value": response.id,
                    "label": response.nombreCompleto
                }))
                setInterpretes(dropDownValue);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setContenido({ ...contenido, [name]: value });
    };

    const handleTipoChange = event => {
        setContenido(contenido => ({
            ...contenido,
            fkTipo: event.value
        }));
    };
    const handleTematicaChange = event => {
        setContenido(contenido => ({
            ...contenido,
            fkTematica: event.value
        }));
    };
    const handleProductoraChange = event => {
        setContenido(contenido => ({
            ...contenido,
            fkProductora: event.value
        }));
    };
    const handleDirectorChange = event => {
        setContenido(contenido => ({
            ...contenido,
            fkDirectors: event
        }));
    };
    const handleInterpreteChange = event => {
        setContenido(contenido => ({
            ...contenido,
            fkInterpretes: event
        }));
    };
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setContenido({
                    ...contenido,
                    caratulaFile: imageFile,
                    caratulaSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile);
        }
        else {
            setContenido({
                ...contenido,
                caratulaFile: null,
                caratulaSrc: defaultImgSrc
            })
        }
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
            ContenidoDirectores: contenido.fkDirectors.map((e) => ({
                "FkDirector": e.value
            })),
            ContenidoInterpretes: contenido.fkInterpretes.map((e) => ({
                "FkInterprete": e.value
            })),
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
                            onChange={handleTipoChange}
                            value={[listTipos[contenido.fkTipo - 1]]}

                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="tematica" >tematica</Form.Label>
                        <Select
                            name="tematica"
                            options={listTematicas}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleTematicaChange}
                            value={[listTematicas[contenido.fkTematica - 1]]}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="productora" >Productora</Form.Label>
                        <Select
                            name="productora"
                            options={listProductoras}
                            className="basic-select"
                            classNamePrefix="select"
                            onChange={handleProductoraChange}
                            value={[listProductoras[contenido.fkProductora - 1]]}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="directores" >Directores</Form.Label>
                        <Select
                            // defaultValue={[listTematicas[1]]}
                            isMulti
                            name="directores"
                            options={listDirectores}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleDirectorChange}
                            value={contenido.fkDirectors}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="interpretes" >Interpretes</Form.Label>
                        <Select
                            // defaultValue={[listTematicas[1]]}
                            isMulti
                            name="interpretes"
                            options={listInterpretes}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleInterpreteChange}
                            value={contenido.fkInterpretes}
                        />
                    </Form.Group>
                    <Form.Group>
                        <img src={contenido.caratulaSrc} style={{ height: '10rem', width: '10rem' }} className="card-img-top" alt="caratula"></img>
                        <Form.Label htmlFor="caratula" >Caratula</Form.Label>
                        <Form.Control
                            type="file"
                            className="form-control-file"
                            id="caratula"
                            onChange={showPreview}
                            name="caratula"
                        />
                    </Form.Group>
                    <Form.Group className="form-group text-center">
                        <Button type="submit">
                            Añadir contenido
                        </Button>
                    </Form.Group>
                </Form>
            )}
            <div className="col text-center">
                <Button onClick={() => listado()}><span>Volver</span></Button>
            </div>
        </>
    );
};
export default AddContenido; 
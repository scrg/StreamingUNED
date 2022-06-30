import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap"
import UsuarioService from "../services/UsuarioService";
import MunicipioService from "../services/MunicipioService";
import ProvinciaService from "../services/ProvinciaService";
import CcaaService from "../services/CcaaService";

const Registro = () => {
    const initialUsuarioState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fkrol: "",
        fkestado: "",
        correoelectronico: "",
        clave: "",
        direccion: "",
        fkCcaa: 0,
        fkProvincia: 0,
        fkMunicipio: 0,
        codigoPostal: 0,
        cuentaBancaria: ""
    };
    const [usuario, setUsuario] = useState(initialUsuarioState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };


    const [listCcaas, setCcaas] = useState([]);
    const [listProvincias, setProvincias] = useState([]);
    const [listMunicipios, setMunicipios] = useState([]);


    useEffect(() => {
        retrieveCcaas();
    }, []);


    const retrieveCcaas = () => {
        CcaaService.getAll()
            .then((response) => {
                setCcaas(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleCcaaChange = event => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, fkCcaa: value });
        ProvinciaService.getAll()
            .then((response) => {
                setProvincias(response.data.filter(prov => prov.fkCcaa == value));
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleProvinciaChange = event => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, fkProvincia: value });
        MunicipioService.getAll()
            .then((response) => {
                setMunicipios(response.data.filter(mun => mun.fkProvincia == value));
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleMunicipioChange = event => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, fkMunicipio: value });
    };

    const saveUsuario = (e) => {
        e.preventDefault();
        var data = {
            nombre: usuario.nombre,
            apellido1: usuario.apellido1,
            apellido2: usuario.apellido2,
            correoelectronico: usuario.correoelectronico,
            direccion: usuario.direccion,
            codigoPostal: usuario.codigoPostal,
            fkCcaa: usuario.fkCcaa,
            fkProvincia: usuario.fkProvincia,
            fkMunicipio: usuario.fkMunicipio,
            clave: usuario.clave,
            cuentaBancaria: usuario.cuentaBancaria,
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
                        <Form.Label htmlFor="cuentaBancaria" >Cuenta bancaria</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="cuentaBancaria"
                            required
                            value={usuario.cuentaBancaria}
                            onChange={handleInputChange}
                            name="cuentaBancaria"
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

                    <Form.Group>
                        <Form.Label htmlFor="direccion" >Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="direccion"
                            required
                            value={usuario.direccion}
                            onChange={handleInputChange}
                            name="direccion"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="codigoPostal" >Código Postal</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="codigoPostal"
                            required
                            value={usuario.codigoPostal}
                            onChange={handleInputChange}
                            name="codigoPostal"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="Ccaa" >Comunidad Autonoma</Form.Label>
                        <Form.Select className="form-control" required id="Ccaa" onChange={handleCcaaChange}>
                            <option>Selecciona CCAA</option>
                            {
                                listCcaas.map(Element => (
                                    <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="Provincia" >Provincia</Form.Label>
                        <Form.Select className="form-control" required id="Provincia" onChange={handleProvinciaChange}>
                            <option>Selecciona Provincia</option>
                            {
                                listProvincias.map(Element => (
                                    <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="Municipio" >Municipio</Form.Label>
                        <Form.Select className="form-control" required id="Municipio" onChange={handleMunicipioChange}>
                            {
                                listMunicipios.map(Element => (
                                    <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                                ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>

                        <Button variant="success" type="submit">
                            Registro
                        </Button>
                    </Form.Group>
                </Form>
            )}
        </>
    );
};
export default Registro; 
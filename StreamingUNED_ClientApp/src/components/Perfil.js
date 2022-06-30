import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UsuarioService from "../services/UsuarioService";
import MunicipioService from "../services/MunicipioService";
import ProvinciaService from "../services/ProvinciaService";
import CcaaService from "../services/CcaaService";
import { Form, Button } from "react-bootstrap"

const Perfil = props => {
    const initialUsuarioState = {
        id: 0,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fkrol: "",
        fkestado: "",
        correoElectronico: "",
        clave: "",
        direccion: "",
        fkCcaa: 0,
        fkProvincia: 0,
        fkMunicipio: 0,
        codigoPostal: 0,
        cuentaBancaria: ""
    };


    const [currentUsuario, setCurrentUsuario] = useState(initialUsuarioState);
    const [message, setMessage] = useState("");
    const [idUsuario, setUsuarioId] = useState(0);

    const [listCcaas, setCcaas] = useState([]);
    const [listProvincias, setProvincias] = useState([]);
    const [listMunicipios, setMunicipios] = useState([]);


    useEffect(() => {
        setUsuarioId(AuthService.getCurrentUser().userId);
        retrieveCcaas();
    }, []);

    useEffect(() => {
        if (idUsuario > 0)
            getUsuario(idUsuario);
    }, [idUsuario]);

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
        const {  value } = event.target;
        setCurrentUsuario({ ...currentUsuario, fkCcaa: value });
        ProvinciaService.getAll()
            .then((response) => {
                setProvincias(response.data.filter(prov => prov.fkCcaa == value));
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleProvinciaChange = event => {
        const {  value } = event.target;
        setCurrentUsuario({ ...currentUsuario, fkProvincia: value });
        MunicipioService.getAll()
            .then((response) => {
                setMunicipios(response.data.filter(mun => mun.fkProvincia == value));
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleMunicipioChange = event => {
        const {  value } = event.target;
        setCurrentUsuario({ ...currentUsuario, fkMunicipio: value });
    };

    const getUsuario = (id) => {
        UsuarioService.get(id)
            .then(response => {
                setCurrentUsuario(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUsuario({ ...currentUsuario, [name]: value });
    };

    const updateUsuario = (e) => {
        e.preventDefault();
        UsuarioService.update(currentUsuario.id, currentUsuario)
            .then(response => {
                console.log(response.data);
                setMessage("Actualizado");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="edit-form">
            <h4>Perfil</h4>

            <Form onSubmit={updateUsuario}>
                <Form.Group>
                    <Form.Label htmlFor="correoelectronico" >Correo Electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        className="form-control"
                        id="correoelectronico"
                        required
                        value={currentUsuario.correoElectronico}
                        disabled={true}
                        name="correoelectronico"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password" >Clave</Form.Label>
                    <Form.Control
                        type="password"
                        className="form-control"
                        name="clave"
                        value={currentUsuario.clave}
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
                        value={currentUsuario.cuentaBancaria}
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
                        value={currentUsuario.nombre}
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
                        value={currentUsuario.apellido1}
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
                        value={currentUsuario.apellido2}
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
                        value={currentUsuario.direccion}
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
                        value={currentUsuario.codigoPostal}
                        onChange={handleInputChange}
                        name="codigoPostal"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="Ccaa" >Comunidad Autonoma</Form.Label>
                    <Form.Select className="form-control" required id="Ccaa" onChange={handleCcaaChange} defaultValue={currentUsuario.fkCcaa}>
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
                                <option key={Element.id} value={Element.id}   >{Element.nombre}</option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="Municipio" >Municipio</Form.Label>
                    <Form.Select className="form-control" required id="Municipio" onChange={handleMunicipioChange}>
                        {
                            listMunicipios.map(Element => (
                                <option key={Element.id} value={Element.id}   >{Element.nombre}</option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center mt-3"> 
                    <Button variant="success" type="submit" >
                        Actualizar
                    </Button> 
                </Form.Group>
                    <p className="d-flex justify-content-center mt-3">{message}</p> 
            </Form>
        </div>
    );
};

export default Perfil;

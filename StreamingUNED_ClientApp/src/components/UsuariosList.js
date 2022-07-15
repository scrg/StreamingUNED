import { Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import UsuarioService from "../services/UsuarioService";
import UsuarioEstadoService from "../services/UsuarioEstadoService";
import RolService from "../services/RolService";
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';


const UsuariosList = (props) => {
    const [sortedElements, setUsuarios] = useState([]);
    const [search, setSearch] = useState("");
    const usuariosRef = useRef();
    const [listRoles, setRoles] = useState([]);
    const [listEstados, setEstados] = useState([]);
    const [idRol, setRol] = useState(0);
    const [idEstado, setEstado] = useState(0);

    const history = useNavigate();
    usuariosRef.current = sortedElements;

    useEffect(() => {
        retrieveUsuarios();
        retrieveEstados();
        retrieveRoles();
    }, []);


    useEffect(() => {
        filterSelect();
    }, [idRol, idEstado]);

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
    };

    const retrieveUsuarios = () => {
        UsuarioService.getAll()
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const retrieveEstados = () => {
        UsuarioEstadoService.getAll()
            .then((response) => {
                setEstados(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const retrieveRoles = () => {
        RolService.getAll()
            .then((response) => {
                setRoles(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const refreshList = () => {
        retrieveUsuarios();
    };

    const findByAll = () => {
        UsuarioService.findByAll(search)
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const clearFilter = () => {
        window.location.reload(false);
    };

    const filterSelect = () => {
        setUsuarios(sortedElements
            .filter((c => c.fkEstado == idEstado || idEstado == 0))
            .filter((c => c.fkRol == idRol || idRol == 0)));
    };
 
    const addUsuario = () => {
        history("/addusuario");
    };

    const cambiarEstado = (id, idEstado) => {
        UsuarioService.cambiarEstado(id, idEstado)
            .then(() => {
                history("/usuarios");
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }; 

    const [showAlert, setShowAlert] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(5)

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        return () => {
            handleShowAlert();
        }
    }, [sortedElements])

    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = sortedElements.slice(indexOfFirstElement, indexOfLastElement);
    const totalPagesNum = Math.ceil(sortedElements.length / elementsPerPage);

    const handleEstadoChange = (e) => {
        setEstado(e.target.value);
    }
    const handleRolChange = (e) => {
        setRol(e.target.value);
    }

    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Administración Usuarios</h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={() => addUsuario()} className="btn btn-success"><span>Crear nuevo empleado</span></Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success">
                Lista actualizada
            </Alert>

            <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                    <select className="form-control" name="estado" onChange={handleEstadoChange}>
                        <option value={Number(0)}>Filtro estado</option>{
                            listEstados.map(Element => (
                                <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="input-group mb-3">
                    <select className="form-control" name="rol" onChange={handleRolChange}>
                        <option value={Number(0)}>Filtro Rol</option>
                        {
                            listRoles.map(Element => (
                                <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Texto"
                        value={search}
                        onChange={onChangeSearch}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByAll}
                        >
                            Buscar
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={clearFilter}
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido 1</th>
                        <th>Apellido 2</th>
                        <th>Estado</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        currentElements.map(Element => (
                            <tr key={Element.id}>
                                <td>{Element.nombre}</td>
                                <td>{Element.apellido1}</td>
                                <td>{Element.apellido2}</td>
                                <td>{Element.fkEstadoNavigation.nombre}</td>
                                <td>{Element.fkRolNavigation.nombre}</td>

                                <td>
                                    {Element.fkEstado == 2 && (
                                        <button onClick={() => cambiarEstado(Element.id, 3)} className="btn text-danger btn-act"><i className="fas fa-ban action" title='Bloquear'></i></button>
                                    )}
                                    {(Element.fkEstado == 1 || Element.fkEstado == 3) && (
                                        <button onClick={() => cambiarEstado(Element.id, 2)} className="btn text-success btn-act"><i className="fa-solid fa-circle-check action mr-2" title='Activar'></i></button>
                                    )}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination pages={totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentElements={currentElements}
                sortedElements={sortedElements} />
        </>
    );
};

export default UsuariosList;
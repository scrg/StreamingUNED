import { Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import ContenidoService from "../services/ContenidoService";
import ContenidoTematicaService from "../services/ContenidoTematicaService";
import ContenidoEstadoService from "../services/ContenidoEstadoService";
import ContenidoTipoService from "../services/ContenidoTipoService";
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';


const ContenidosList = (props) => {
    const [sortedElements, setContenidos] = useState([]);
    const [search, setSearch] = useState("");
    const contenidosRef = useRef();
    const [listTematicas, setTematicas] = useState([]);
    const [listTipos, setTipos] = useState([]);
    const [listEstados, setEstados] = useState([]);
    const [idTipo, setTipo] = useState(0);
    const [idEstado, setEstado] = useState(0);
    const [idTematica, setTematica] = useState(0);

    const history = useNavigate();
    contenidosRef.current = sortedElements;

    useEffect(() => {
        retrieveContenidos();
        retrieveEstados();
        retrieveTematicas();
        retrieveTipos();
    }, []);

    
    useEffect(() => {
        filterSelect(); 
    }, [idTipo, idTematica, idEstado]);

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
    };

    const retrieveContenidos = () => {
        ContenidoService.getAll()
            .then((response) => {
                setContenidos(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const retrieveTematicas = () => {
        ContenidoTematicaService.getAll()
            .then((response) => {
                setTematicas(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const retrieveTipos = () => {
        ContenidoTipoService.getAll()
            .then((response) => {
                setTipos(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const retrieveEstados = () => {
        ContenidoEstadoService.getAll()
            .then((response) => {
                setEstados(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveContenidos();
    };

    const findByAll = () => {
        ContenidoService.findByAll(search)
            .then((response) => {
                setContenidos(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const clearFilter = () => {
        window.location.reload(false);
    };

    const filterSelect = () => {
        setContenidos(sortedElements
            .filter((c=>c.fkEstado==idEstado || idEstado==0))
            .filter((c=>c.fkTematica==idTematica || idTematica==0))
            .filter((c=>c.fkTipo==idTipo || idTipo==0)));
    };

    const openContenido = (id) => {
        history("/contenidos/" + id);
    };

    const addContenido = () => {
        history("/addcontenido");
    };

    const deleteContenido = (id) => {
        ContenidoService.remove(id)
            .then((response) => {
                history("/contenidos");
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
    const handleTipoChange = (e) => {
        setTipo(e.target.value);  
    }
    const handleTematicaChange = (e) => {
        setTematica(e.target.value);  
    }

    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Administración Contenidos</h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={() => addContenido()} className="btn btn-success"><span>Crear nuevo contenido</span></Button>
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
                    <select className="form-control" name="tematica" onChange={handleTematicaChange}>
                        <option value={Number(0)}>Filtro tematica</option>
                        {
                            listTematicas.map(Element => (
                                <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="input-group mb-3">
                    <select className="form-control" name="tipo"  onChange={handleTipoChange}>
                        <option value={Number(0)}>Filtro tipo</option>
                        {
                            listTipos.map(Element => (
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
                        <th>Título</th>
                        <th>Estado</th>
                        <th>Tipo</th>
                        <th>Temática</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        currentElements.map(Element => (
                            <tr key={Element.id}>
                                <td>{Element.titulo}</td>
                                <td>{Element.fkEstadoNavigation.nombre}</td>
                                <td>{Element.fkTipoNavigation.nombre}</td>
                                <td>{Element.fkTematicaNavigation.nombre}</td>

                                <td>
                                    <button onClick={() => openContenido(Element.id)} className="btn text-warning btn-act"><i className="far fa-edit action mr-2"></i></button>
                                    <button onClick={() => deleteContenido(Element.id)} className="btn text-danger btn-act"><i className="fas fa-trash action"></i></button>
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

export default ContenidosList;
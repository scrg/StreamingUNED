import { Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import ContenidoService from "../services/ContenidoService";
import Pagination from './Pagination';

const ContenidosList = (props) => {
    const [sortedElements, setContenidos] = useState([]);
    const [search, setSearch] = useState("");
    const contenidosRef = useRef();

    contenidosRef.current = sortedElements;

    useEffect(() => {
        retrieveContenidos();
    }, []);

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

    const openContenido = (id) => {
        window.location.href = window.location.origin + "/contenidos/" + id;
    };

    const addContenido = () => {
        window.location.href = window.location.origin + "/addcontenido"
    };

    const deleteContenido = (id) => {
        ContenidoService.remove(id)
            .then((response) => {
                props.history.push("/contenidos");
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

            <div className="col-md-8">
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
                    </div>
                </div>
            </div>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        currentElements.map(Element => (
                            <tr key={Element.id}>
                                <td>{Element.titulo}</td>
                                <td>{Element.fkEstadoNavigation.nombre}</td>

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
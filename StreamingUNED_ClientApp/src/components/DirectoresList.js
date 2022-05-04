import { Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import DirectorService from "../services/DirectorService";
import Pagination from './Pagination';

const DirectoresList = (props) => {
    const [sortedElements, setDirectores] = useState([]);
    const [search, setSearch] = useState("");
    const directoresRef = useRef();

    directoresRef.current = sortedElements;

    useEffect(() => {
        retrieveDirectores();
    }, []);

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
    };

    const retrieveDirectores = () => {
        DirectorService.getAll()
            .then((response) => {
                setDirectores(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveDirectores();
    };

    const findByAll = () => {
        DirectorService.findByAll(search)
            .then((response) => {
                setDirectores(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const openDirector = (id) => { 
        window.location.href = window.location.origin + "/directores/" + id;
    };

    const addDirector = () => {
        window.location.href = window.location.origin + "/adddirector"
    };

    const deleteDirector = (id) => { 
        DirectorService.remove(id)
            .then((response) => {
                props.history.push("/directores");
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
                        <h2>Administración Directores</h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={() => addDirector()} className="btn btn-success"><span>Crear nuevo directoresRef</span></Button>
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
                        placeholder="Search by "
                        value={search}
                        onChange={onChangeSearch}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByAll}
                        >
                            Search
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
                                <td>
                                    <button onClick={() => openDirector(Element.id)} className="btn text-warning btn-act"><i className="far fa-edit action mr-2"></i></button>
                                    <button onClick={() => deleteDirector(Element.id)} className="btn text-danger btn-act"><i className="fas fa-trash action"></i></button>
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

export default DirectoresList;
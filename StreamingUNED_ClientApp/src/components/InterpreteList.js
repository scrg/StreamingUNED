import { Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import InterpreteService from "../services/InterpreteService"; 
import Pagination from './Pagination';

const InterpreteList = (props) => {

    const [sortedElements, setInterpretes] = useState([]);
    const [search, setSearch] = useState("");
    const interpretesRef = useRef();

    interpretesRef.current = sortedElements;

    useEffect(() => {
        retrieveInterpretes();
    }, []);

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
    };

    const retrieveInterpretes = () => {
        InterpreteService.getAll()
            .then((response) => {
                setInterpretes(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveInterpretes();
    }; 

    const findByAll = () => {
        InterpreteService.findByAll(search)
            .then((response) => {
                setInterpretes(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const openInterprete = (id) => { 
        window.location.href = window.location.origin + "/interpretes/" + id;
    };

    const addInterprete = (e) => {
        window.location.href = window.location.origin + "/addinterprete"
    };

    const deleteInterprete = (id) => { 

        InterpreteService.remove(id)
            .then((response) => {
                props.history.push("/interpretes"); 
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
                        <h2>Administración Intérpretes</h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={() => addInterprete()} className="btn btn-success"><span>Crear nuevo interprete</span></Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success">
                Emlployee List Updated Succefully!
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
                                        <button onClick={() => openInterprete(Element.id)} className="btn text-warning btn-act"><i className="far fa-edit action mr-2"></i></button>
                                        <button onClick={() => deleteInterprete(Element.id)} className="btn text-danger btn-act"><i className="fas fa-trash action"></i></button>
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
    )
}

export default InterpreteList;


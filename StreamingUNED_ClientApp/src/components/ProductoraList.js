import { Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import ProductoraService from "../services/ProductoraService";
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const ProductorasList = (props) => {
    const [sortedElements, setProductoras] = useState([]);
    const [search, setSearch] = useState("");
    const productorasRef = useRef();

    const history = useNavigate();
    productorasRef.current = sortedElements;

    useEffect(() => {
        retrieveProductoras();
    }, []);

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
    };

    const retrieveProductoras = () => {
        ProductoraService.getAll()
            .then((response) => {
                setProductoras(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveProductoras();
    };

    const findByAll = () => {
        ProductoraService.findByAll(search)
            .then((response) => {
                setProductoras(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const openProductora = (id) => { 
        history("/productoras/" + id);
    };

    const addProductora = () => {
        history("/addproductora")
    };

    const deleteProductora = (id) => { 
        ProductoraService.remove(id)
            .then((response) => {
                history("/productoras");
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
                        <h2>Administración Productoras</h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={() => addProductora()} className="btn btn-success"><span>Crear nueva productora</span></Button>
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
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        currentElements.map(Element => (
                            <tr key={Element.id}>
                                <td>{Element.nombre}</td>
                                <td>
                                    <button onClick={() => openProductora(Element.id)} className="btn text-warning btn-act"><i className="far fa-edit action mr-2"></i></button>
                                    <button onClick={() => deleteProductora(Element.id)} className="btn text-danger btn-act"><i className="fas fa-trash action"></i></button>
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

export default ProductorasList;
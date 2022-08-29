import { Button, Alert } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import ContenidoService from "../services/ContenidoService";
import ProductoraService from "../services/ProductoraService";
import DirectorService from "../services/DirectorService";
import InterpreteService from "../services/InterpreteService";
import ContenidoCard from "./ContenidoCard"
import { useNavigate } from 'react-router-dom';


const ContenidoCatalogo = (props) => {
    const [sortedElements, setContenidos] = useState([]);
    const [search, setSearch] = useState("");
    const contenidosRef = useRef();
    const [listProductoras, setProductoras] = useState([]);
    const [listDirectores, setDirectores] = useState([]);
    const [listInterpretes, setInterpretes] = useState([]);
    const [idProductora, setProductora] = useState(0);
    const [idDirector, setDirector] = useState(0);
    const [idInterprete, setInterprete] = useState(0);

    const history = useNavigate();
    contenidosRef.current = sortedElements;

    useEffect(() => {
        retrieveContenidos();
        retrieveProductoras();
        retrieveDirectores();
        retrieveInterpretes();
    }, []);


    useEffect(() => {
        filterSelect();
    }, [idProductora, idDirector, idInterprete]);

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
    const retrieveProductoras = () => {
        ProductoraService.getAll()
            .then((response) => {
                setProductoras(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
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
            .filter((c => c.fkProductora == idProductora || idProductora == 0))
            .filter(
                ({ contenidoDirectores }) => {
                    return (contenidoDirectores.some(e => e.fkDirector == idDirector) || idDirector == 0)
                })
            .filter(
                ({ contenidoInterpretes }) => {
                    return (contenidoInterpretes.some(e => e.fkInterprete == idInterprete) || idInterprete == 0)
                }) 
        );
    };

    useEffect(() => {
        return () => {
        }
    }, [sortedElements])



    const handleProductoraChange = (e) => {
        setProductora(e.target.value);
    }
    const handleDirectorChange = (e) => {
        setDirector(e.target.value);
    }
    const handleInterpreteChange = (e) => {
        setInterprete(e.target.value);
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                    <select className="form-control" name="productora" onChange={handleProductoraChange}>
                        <option value={Number(0)}>Filtro productora</option>{
                            listProductoras.map(Element => (
                                <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="input-group mb-3">
                    <select className="form-control" name="director" onChange={handleDirectorChange}>
                        <option value={Number(0)}>Filtro director</option>
                        {
                            listDirectores.map(Element => (
                                <option key={Element.id} value={Element.id} >{Element.nombreCompleto}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="input-group mb-3">
                    <select className="form-control" name="interprete" onChange={handleInterpreteChange}>
                        <option value={Number(0)}>Filtro interprete</option>
                        {
                            listInterpretes.map(Element => (
                                <option key={Element.id} value={Element.id} >{Element.nombreCompleto}</option>
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


            <div className='row-flex'>
                {
                    sortedElements.map(Element => (
                        <ContenidoCard key={Element.id} contenido={Element} />
                    ))
                }
            </div>
        </>
    );
};

export default ContenidoCatalogo;
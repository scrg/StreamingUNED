import {  Alert } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import VisualizacionService from "../services/VisualizacionService";
import Pagination from './Pagination';
import moment from 'moment';

export const Historico = (props) => {
    const [sortedElements, setVisualizaciones] = useState([]);
        const visualizacionesRef = useRef();

        visualizacionesRef.current = sortedElements;

    useEffect(() => {
        retrieveVisualizaciones();
    }, []);
 

    const retrieveVisualizaciones = () => {
        VisualizacionService.getHistorico()
            .then((response) => {
                setVisualizaciones(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
  

    const [showAlert, setShowAlert] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10)

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
                        <h2>Histórico visualizaciones</h2>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success">
                Lista actualizada
            </Alert> 

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        currentElements.map(Element => (
                            <tr key={Element.id}>                           
                            <td>{Element.fkContenidoNavigation.titulo}</td> 
                                <td>{moment(Element.fecha).format('DD-MM-YYYY')}</td>     
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

export default Historico;
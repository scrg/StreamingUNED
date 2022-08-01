
import React, { useState, useEffect, useRef } from 'react';
import ContenidoTematicaService from "../services/ContenidoTematicaService";
import ContenidoTipoService from "../services/ContenidoTipoService";
import DoughnutComponent from "./DoughnutComponent" 

const InformesVisualizaciones = () => {
    const [listTematicas, setTematicas] = useState([]);
    const [listTipos, setTipos] = useState([]);
    const [idTipo, setTipo] = useState(0);


    useEffect(() => {
        retrieveTematicas();
        retrieveTipos();
    }, []);

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

    const handleInputChange = (e) => {
        setTipo(e.target.value);
    }

    return (
        <>
            <h1>ESTADISTICAS POR VISUALIZACIONES</h1>
            <select className="form-control" name="tipo" onChange={handleInputChange}>
                <option value={Number(0)}>Filtro tipo</option>
                {
                    listTipos.map(Element => (
                        <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                    ))
                }
            </select>
            <h4>You selected {idTipo}</h4>
            {/* {
                listTematicas.map(Element => (
                    <CalleTematica key={Element.id} id={Element.id} nombre={Element.nombre} tipo={Number(idTipo)} />
                ))
            } */}
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>Por tipo</h3>
                            </div>
                            <div className="panel-body">
                                <DoughnutComponent />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>Por temática</h3>
                            </div>
                            <div id="chart2" className="panel-body">
                                <DoughnutComponent />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>Area Series</h3>
                            </div>
                            <div className="panel-body">
                                <div id="chart3"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>StepLine Series</h3>
                            </div>
                            <div id="chart4" className="panel-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformesVisualizaciones; 
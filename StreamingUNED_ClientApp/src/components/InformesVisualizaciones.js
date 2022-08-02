
import React, { useState, useEffect } from 'react';
import VisualizacionService from "../services/VisualizacionService";
import Chart from 'chart.js/auto';
import { Doughnut, Bar } from 'react-chartjs-2'
import { Form, Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';


const InformesVisualizaciones = () => {
    const [listVisualizaciones, setVisualizaciones] = useState([]);
    const [listVisualizacionesFiltrada, setVisualizacionesFiltrada] = useState([]);
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [fechaDesdeFilter, setFechaDesdeFilter] = useState(new Date("2000-01-01"));
    const [fechaHastaFilter, setFechaHastaFilter] = useState(new Date("2000-01-01"));

    const [datosTipo, setDatosTipo] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: 'Visualizaciones',
                data: [55, 23, 96],
                borderWidth: 1,
            }
        ]
    });


    const [datosTematica, setDatosTematica] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: 'Visualizaciones',
                data: [55, 23, 96],
                borderWidth: 1,
            }
        ]
    });


    useEffect(() => {
        retrieveVisualizaciones();
    }, []);


    useEffect(() => {
        filtrarDatos();
    }, [listVisualizaciones, fechaDesdeFilter, fechaHastaFilter]);

    useEffect(() => {
        formatearDatos();
    }, [listVisualizacionesFiltrada]);



    const retrieveVisualizaciones = () => {
        VisualizacionService.getInformeVisualizaciones()
            .then((response) => {
                setVisualizaciones(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const filtrarDatos = () => {
        if (fechaDesdeFilter.getTime() != new Date("2000-01-01").getTime() || fechaHastaFilter.getTime() != new Date("2000-01-01").getTime()) {
            if (fechaDesdeFilter.getTime() !== new Date("2000-01-01").getTime() && fechaHastaFilter.getTime() !== new Date("2000-01-01").getTime())
                setVisualizacionesFiltrada(listVisualizaciones.filter((obj) => { return new Date(obj.fecha).getTime() >= fechaDesdeFilter.getTime() && new Date(obj.fecha).getTime() <= fechaHastaFilter.getTime() }))
            else if (fechaDesdeFilter.getTime() !== new Date("2000-01-01").getTime())
                setVisualizacionesFiltrada(listVisualizaciones.filter((obj) => { return new Date(obj.fecha).getTime() >= fechaDesdeFilter.getTime() }))
            else
                setVisualizacionesFiltrada(listVisualizaciones.filter((obj) => { return new Date(obj.fecha).getTime() <= fechaHastaFilter.getTime() }))
        }
        else {
            setVisualizacionesFiltrada(listVisualizaciones);
        }
    }

    const formatearDatos = () => {
        var countsTipo = listVisualizacionesFiltrada.reduce((p, c) => {
            var name = c.fkContenidoNavigation.fkTipoNavigation.nombre;
            if (!p.hasOwnProperty(name)) {
                p[name] = 0;
            }
            p[name]++;
            return p;
        }, {});
        var countsTipoExtended = Object.keys(countsTipo).map(k => {
            return { name: k, count: countsTipo[k] };
        });

        if (countsTipoExtended.length > 0)
            setDatosTipo({
                labels: countsTipoExtended?.map((x) => x.name),
                datasets: [
                    {
                        label: "Visualizaciones",
                        data: countsTipoExtended?.map((x) => x.count),
                        backgroundColor: [
                            "#FF6666",
                            "#FFFF66",
                            "#66FF66",
                            "#66FFFF",
                            "#6666FF"
                        ]
                    }
                ]
            });
        else
            setDatosTipo({
                labels: [],
                datasets: [
                    {
                        label: "Visualizaciones",
                        data: [],
                        backgroundColor: []
                    }
                ]
            });


        var countsTematica = listVisualizaciones.reduce((p, c) => {
            var name = c.fkContenidoNavigation.fkTematicaNavigation.nombre;
            if (!p.hasOwnProperty(name)) {
                p[name] = 0;
            }
            p[name]++;
            return p;
        }, {});
        var countsTematicaExtended = Object.keys(countsTematica).map(k => {
            return { name: k, count: countsTematica[k] };
        });

        if (countsTematicaExtended.length > 0)
            setDatosTematica({
                labels: countsTematicaExtended?.map((x) => x.name),
                datasets: [
                    {
                        label: "Visualizaciones",
                        data: countsTematicaExtended?.map((x) => x.count),
                        backgroundColor: [
                            "#FF6666",
                            "#FFFF66",
                            "#66FF66",
                            "#66FFFF",
                            "#6666FF"
                        ]
                    }
                ]
            });

        else
            setDatosTematica({
                labels: [],
                datasets: [
                    {
                        label: "Visualizaciones",
                        data: [],
                        backgroundColor: []
                    }
                ]
            });
    }

    const handleFechaHastaChange = (e) => {
        setFechaHastaFilter((e.target.value == "") ? new Date("2000-01-01") : new Date(e.target.value));
        setFechaHasta(e.target.value);
    }
    const handleFechaDesdeChange = (e) => {
        setFechaDesdeFilter((e.target.value == "") ? new Date("2000-01-01") : new Date(e.target.value));
        setFechaDesde(e.target.value);
    }


    const barDataUsuarios = {
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: 'Visualizaciones',
                data: [55, 23, 96],
                borderWidth: 1,
            }
        ]
    }

    const doughnutDataUsuarios = {
        labels: ['Red', 'Green', 'Blue'],
        datasets: [
            {
                data: [5, 7, 6],
                backgroundColor: ['red', 'green', 'blue']
            }
        ]
    }

    return (
        <>
            <h1>ESTADISTICAS POR VISUALIZACIONES</h1>
            <div >
                <Form >
                    <Form.Group >
                        <Form.Label htmlFor="fechaDesde" >Fecha Desde</Form.Label>
                        <Form.Control
                            type="date"
                            className="form-control"
                            id="fechaDesde"
                            value={fechaDesde ?? ""}
                            onChange={handleFechaDesdeChange}
                            name="Fecha desde"
                        />
                        <Form.Label htmlFor="fechaHasta" >Fecha Hasta</Form.Label>
                        <Form.Control
                            type="date"
                            className="form-control"
                            id="fechaHasta"
                            value={fechaHasta ?? ""}
                            onChange={handleFechaHastaChange}
                            name="Fecha hasta"
                        />
                    </Form.Group>
                </Form>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <Card>
                                <CardHeader className='text-center'>Por tipo</CardHeader>
                                <Card.Body>
                                    {
                                        <Doughnut data={datosTipo} />
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <Card>
                                <CardHeader className='text-center'>Por tematica</CardHeader>
                                <Card.Body>
                                    {
                                        <Doughnut data={datosTematica} />
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="panel panel-default">

                        <Card>
                            <CardHeader className='text-center'>Por contenido</CardHeader>
                            <Card.Body>
                                {
                                    <Bar data={barDataUsuarios} />
                                }
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <Card>
                            <CardHeader className='text-center'>Por usuario</CardHeader>
                            <Card.Body>
                                {
                                    <Bar data={barDataUsuarios} />
                                }
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformesVisualizaciones; 
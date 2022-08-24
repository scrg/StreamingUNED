
import React, { useState, useEffect } from 'react';
import ValoracionService from "../services/ValoracionService";
import Chart from 'chart.js/auto';
import { Doughnut, Bar } from 'react-chartjs-2'
import { Form, Card, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';


const InformesValoraciones = () => {
    const [listValoraciones, setValoraciones] = useState([]);
    const [listValoracionesFiltrada, setValoracionesFiltrada] = useState([]);
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [fechaDesdeFilter, setFechaDesdeFilter] = useState(new Date("2000-01-01"));
    const [fechaHastaFilter, setFechaHastaFilter] = useState(new Date("2000-01-01"));
  
    const [datosContenidoMejor, setDatosContenidoMejor] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: "Valoraciones",
                data: [55, 23, 96],
                borderWidth: 1,
            }
        ]
    });
    const [datosContenidoPeor, setDatosContenidoPeor] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: "Valoraciones",
                data: [55, 23, 96],
                borderWidth: 1,
            }
        ]
    });
    const [datosUsuario, setDatosUsuario] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: "Valoraciones",
                data: [55, 23, 96],
                borderWidth: 1,
            }
        ]
    });

    useEffect(() => {
        retrieveValoraciones();
    }, []);

    useEffect(() => {
        filtrarDatos();
    }, [listValoraciones, fechaDesdeFilter, fechaHastaFilter]);

    useEffect(() => {
        formatearDatos();
    }, [listValoracionesFiltrada]);


    const retrieveValoraciones = () => {
        ValoracionService.getInformeValoraciones()
            .then((response) => {
                setValoraciones(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const filtrarDatos = () => {
        if (fechaDesdeFilter.getTime() != new Date("2000-01-01").getTime() || fechaHastaFilter.getTime() != new Date("2000-01-01").getTime()) {
            if (fechaDesdeFilter.getTime() !== new Date("2000-01-01").getTime() && fechaHastaFilter.getTime() !== new Date("2000-01-01").getTime())
                setValoracionesFiltrada(listValoraciones.filter((obj) => { return new Date(obj.fecha).getTime() >= fechaDesdeFilter.getTime() && new Date(obj.fecha).getTime() <= fechaHastaFilter.getTime() }))
            else if (fechaDesdeFilter.getTime() !== new Date("2000-01-01").getTime())
                setValoracionesFiltrada(listValoraciones.filter((obj) => { return new Date(obj.fecha).getTime() >= fechaDesdeFilter.getTime() }))
            else
                setValoracionesFiltrada(listValoraciones.filter((obj) => { return new Date(obj.fecha).getTime() <= fechaHastaFilter.getTime() }))
        }
        else {
            setValoracionesFiltrada(listValoraciones);
        }
    }

    const formatearDatos = () => {
 
        const reduced = listValoracionesFiltrada.reduce(function (m, d) {
            var name = d.fkContenidoNavigation.titulo;
            if (!m[name]) {
                m[name] = { ...d, count: 1 };
                return m;
            }
            m[name].valoracion += d.valoracion;
            m[name].count += 1;
            return m;
        }, {});

        // Create new array from grouped data and compute the average
        const countsContenido = Object.keys(reduced).map(function (k) {
            const item = reduced[k];
            return {
                name: item.fkContenidoNavigation.titulo,
                valoracion: item.valoracion / item.count
            }
        })

        const mejorValoradas =
            countsContenido
                .sort((a, b) => (a.valoracion < b.valoracion) ? 1 : -1)
                .slice(0, 10);


        const peorValoradas =
            countsContenido
                .sort((a, b) => (a.valoracion > b.valoracion) ? 1 : -1)
                .slice(0, 10);


        if (mejorValoradas.length > 0)
            setDatosContenidoMejor({
                labels: mejorValoradas?.map((x) => x.name),
                datasets: [
                    {
                        label: "Valoración media",
                        data: mejorValoradas?.map((x) => x.valoracion),
                        backgroundColor: [
                            "#FF6666",
                            "#FFFF66",
                            "#FF66FF",
                            "#FFB2FF",
                            "#66FF66",
                            "#66FFFF",
                            "#B2FF66",
                            "#B2FFFF",
                            "#6666FF",
                            "#66B266"
                        ]
                    }
                ]
            });

        else
            setDatosContenidoMejor({
                labels: [],
                datasets: [
                    {
                        label: "Valoración media",
                        data: [],
                        backgroundColor: []
                    }
                ]
            });

            
        if (peorValoradas.length > 0)
        setDatosContenidoPeor({
            labels: peorValoradas?.map((x) => x.name),
            datasets: [
                {
                    label: "Valoración media",
                    data: peorValoradas?.map((x) => x.valoracion),
                    backgroundColor: [
                        "#FF6666",
                        "#FFFF66",
                        "#FF66FF",
                        "#FFB2FF",
                        "#66FF66",
                        "#66FFFF",
                        "#B2FF66",
                        "#B2FFFF",
                        "#6666FF",
                        "#66B266"
                    ]
                }
            ]
        });

    else
        setDatosContenidoPeor({
            labels: [],
            datasets: [
                {
                    label: "Valoración media",
                    data: [],
                    backgroundColor: []
                }
            ]
        });


        //USUARIO
        var countsUsuario = listValoracionesFiltrada.reduce((p, c) => {
            var name = c.fkSocioNavigation.correoElectronico;
            if (!p.hasOwnProperty(name)) {
                p[name] = 0;
            }
            p[name]++;
            return p;
        }, {});
        var countsUsuarioExtended = Object.keys(countsUsuario).slice(0, 10).map(k => {
            return { name: k, count: countsUsuario[k] };
        });

        countsUsuarioExtended = countsUsuarioExtended
            .sort((a, b) => (a.count < b.count) ? 1 : -1)

        if (countsUsuarioExtended.length > 0)
            setDatosUsuario({
                labels: countsUsuarioExtended?.map((x) => x.name),
                datasets: [
                    {
                        label: "Valoraciones",
                        data: countsUsuarioExtended?.map((x) => x.count),
                        backgroundColor: [
                            "#FF6666",
                            "#FFFF66",
                            "#FF66FF",
                            "#FFB2FF",
                            "#66FF66",
                            "#66FFFF",
                            "#B2FF66",
                            "#B2FFFF",
                            "#6666FF",
                            "#66B266"
                        ]
                    }
                ]
            });

        else
            setDatosUsuario({
                labels: [],
                datasets: [
                    {
                        label: "Valoraciones",
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

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scale: {
            ticks: {
                precision: 0
            }
        }
    };



    return (
        <>
            <h2 className="col text-center">ESTADISTICAS POR VALORACIONES</h2>
            <div >
                <Form >
                    <Form.Group >
                        <Row>
                            <Col>
                                <Form.Label htmlFor="fechaDesde" >Fecha Desde</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="form-control"
                                    id="fechaDesde"
                                    value={fechaDesde ?? ""}
                                    onChange={handleFechaDesdeChange}
                                    name="Fecha desde"
                                />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="fechaHasta" >Fecha Hasta</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="form-control"
                                    id="fechaHasta"
                                    value={fechaHasta ?? ""}
                                    onChange={handleFechaHastaChange}
                                    name="Fecha hasta"
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </div>
            <div className="container">

                <div className="row">
                    <div>
                        <div>
                            <Card>
                                <CardHeader className='text-center'>Top 10 mejor valoradas</CardHeader>
                                <Card.Body>
                                    {
                                        <Bar data={datosContenidoMejor} options={options} />
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div>
                        <div>
                            <Card>
                                <CardHeader className='text-center'>Top 10 peor valoradas</CardHeader>
                                <Card.Body>
                                    {
                                        <Bar data={datosContenidoPeor} options={options} />
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <div>
                            <Card>
                                <CardHeader className='text-center'>Top 10 usuarios con mas valoraciones realizadas</CardHeader>
                                <Card.Body>
                                    {
                                        <Bar data={datosUsuario} options={options} />
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default InformesValoraciones; 
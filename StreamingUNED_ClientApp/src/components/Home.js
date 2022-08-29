import React, { useState, useEffect } from 'react';
import ContenidoService from "../services/ContenidoService";
import CarouselCards from "./CarouselCards"
import { Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';


export const Home = (props) => {
    const [listContenidosVisualizaciones, setContenidosVisualizaciones] = useState([]);
    const [listContenidosValoraciones, setContenidosValoraciones] = useState([]);
    const [listContenidosRecientes, setContenidosRecientes] = useState([]);
    const [listContenidosRecomendacionesVisualizaciones, setContenidosRecomendacionesVisualizaciones] = useState([]);


    useEffect(() => {
        retrieveContenidos();
    }, []);

    const retrieveContenidos = () => {
        ContenidoService.getTopRecientes()
            .then((response) => {
                setContenidosRecientes(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
            ContenidoService.getTopVisualizaciones()
                .then((response) => {
                    setContenidosVisualizaciones(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
                ContenidoService.getTopValoraciones()
                    .then((response) => {
                        setContenidosValoraciones(response.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
    };

    return (
        <>
            <Card>
                <CardHeader className='text-center'>Recomendaciones basadas en visualizaciones</CardHeader>
                <Card.Body>
                    {
                        <CarouselCards listContenidos={listContenidosRecomendacionesVisualizaciones} />
                    }
                </Card.Body>
            </Card>
            <Card>
                <CardHeader className='text-center'>Mas visualizadas</CardHeader>
                <Card.Body>
                    {
                        <CarouselCards listContenidos={listContenidosVisualizaciones} />
                    }
                </Card.Body>
            </Card>
            <Card>
                <CardHeader className='text-center'>Mejor valoradas</CardHeader>
                <Card.Body>
                    {
                        <CarouselCards listContenidos={listContenidosValoraciones} />
                    }
                </Card.Body>
            </Card>
            <Card>
                <CardHeader className='text-center'>Mas recientes</CardHeader>
                <Card.Body>
                    {
                        <CarouselCards listContenidos={listContenidosRecientes} />
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default Home;
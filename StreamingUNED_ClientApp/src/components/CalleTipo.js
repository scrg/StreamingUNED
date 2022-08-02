import React, { useState, useEffect } from 'react';
import ContenidoService from "../services/ContenidoService";
import CarouselCards from "./CarouselCards"
import { Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';


export const CalleTipo = (props) => {
    const [listContenidos, setContenidos] = useState([]);


    useEffect(() => {
        retrieveContenidos();
    }, [props.tematica]);

    const retrieveContenidos = () => {
        ContenidoService.findByTipoTematica(props.id, props.tematica)
            .then((response) => {
                setContenidos(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <Card>
                <CardHeader className='text-center'>{props.nombre}</CardHeader>
                <Card.Body>
                    {
                        <CarouselCards listContenidos={listContenidos} />
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default CalleTipo;
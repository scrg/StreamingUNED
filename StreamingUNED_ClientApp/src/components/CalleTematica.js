import React, { useState, useEffect } from 'react';
import ContenidoService from "../services/ContenidoService";
import CarouselCards from "./CarouselCards"
import { Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';


export const CalleTematica = (props) => {
    const [listContenidos, setContenidos] = useState([]);


    useEffect(() => {
        retrieveContenidos();
    }, [props.tipo]);

    const retrieveContenidos = () => {
        ContenidoService.findByTipoTematica(props.tipo, props.id)
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

export default CalleTematica;
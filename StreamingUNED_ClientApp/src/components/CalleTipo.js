import React, { useState, useEffect } from 'react';
import ContenidoService from "../services/ContenidoService";
import CarouselCards from "./CarouselCards"


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
            <p>{props.nombre} " - " {props.id}</p>
            {
                <CarouselCards listContenidos={listContenidos} />
            }
        </>
    )
}

export default CalleTipo;
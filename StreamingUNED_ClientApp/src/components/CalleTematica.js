import React, { useState, useEffect } from 'react';
import ContenidoService from "../services/ContenidoService";
import CarouselCards from "./CarouselCards"


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
            <p>{props.nombre} " - " {props.id}</p>
            {
                <CarouselCards listContenidos={listContenidos} />
            }
        </>
    )
}

export default CalleTematica;
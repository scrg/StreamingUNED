import React, { useState, useEffect, useRef } from 'react';
import ContenidoService from "../services/ContenidoService";


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
                listContenidos.map(Element => (
                    <label key={Element.id}>{Element.identificador} </label>
                ))
            }
        </>
    )
}

export default CalleTematica;

import React, { useState, useEffect, useRef } from 'react';
import ContenidoTematicaService from "../services/ContenidoTematicaService";
import ContenidoTipoService from "../services/ContenidoTipoService";
import CalleTematica from "./CalleTematica"

export const ContenidoPorTematica = () => {
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
            <h1>CONTENIDO POR TEMATICA</h1>
            <select className="form-control" name="city" onChange={handleInputChange}>
                <option value={Number(0)}>Filtro tipo</option>
                {
                    listTipos.map(Element => (
                        <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                    ))
                }
            </select>
            <h4>You selected {idTipo}</h4>
            {
                listTematicas.map(Element => (
                    <CalleTematica key={Element.id} id={Element.id} nombre={Element.nombre} tipo={Number(idTipo)} />
                ))
            }
        </>
    )
}
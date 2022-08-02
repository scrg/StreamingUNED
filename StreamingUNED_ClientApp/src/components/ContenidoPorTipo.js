
import React, { useState, useEffect, useRef } from 'react';
import ContenidoTematicaService from "../services/ContenidoTematicaService";
import ContenidoTipoService from "../services/ContenidoTipoService";
import CalleTipo from "./CalleTipo"

const ContenidoPorTipo = () => {
    const [listTematicas, setTematicas] = useState([]);
    const [listTipos, setTipos] = useState([]);
    const [idTematica, setTematica] = useState(0);


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
        setTematica(e.target.value); 
    }

    return (
        <>
            <h1>CONTENIDO POR TIPO</h1>
            <select className="form-control" name="tematica" onChange={handleInputChange}>
                <option value={Number(0)}>Filtro tematica</option>
                {
                    listTematicas.map(Element => (
                        <option key={Element.id} value={Element.id} >{Element.nombre}</option>
                    ))
                }
            </select>
            <br/>
            {
                listTipos.map(Element => (
                    <CalleTipo key={Element.id} id={Element.id} nombre={Element.nombre} tematica={Number(idTematica)} />
                ))
            }
        </>
    )
}

export default ContenidoPorTipo; 

import React, { useState, useEffect } from "react";
import ContenidoService from "../services/ContenidoService";
import VisualizacionService from "../services/VisualizacionService";
import ReactPlayer from 'react-player'

import ReactStars from "react-rating-stars-component";




export const ViewContenido = props => {

    const initialContenidoState = {
        id: null,
        fkEstado: 1,
        fkTipo: 0,
        fkTematica: 0,
        fkProductora: 0,
        identificador: "",
        titulo: "",
        fecha: "",
        duracion: 0,
        caratula: "",
        caratulaFile: "",
        recurso: "",
        recursoFile: "",
        fkDirectors: [],
        fkInterpretes: []

    };
    const [contenido, setContenido] = useState(initialContenidoState);


    const getContenido = id => {
        ContenidoService.get(id)
            .then(response => {
                setContenido(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getContenido(props.match.params.id);
    }, [props.match.params.id]);

    const onPlay = () => {
        var data = {
            fkContenido: contenido.id
        };
        VisualizacionService.create(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={contenido.recurso}
                    onPlay={onPlay}
                    width='100%'
                    height='100%'
                />
            </div>
            <div>
                <ReactStars
                    size={50}
                    half={false}
                    onChange={newRating => {
                        console.log(newRating);
                    }}
                />
            </div>
        </>
    );
};

export default ViewContenido;
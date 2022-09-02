
import React, { useState, useEffect } from "react";
import ContenidoService from "../services/ContenidoService";
import VisualizacionService from "../services/VisualizacionService";
import ValoracionService from "../services/ValoracionService";
import ReactPlayer from 'react-player'

import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom';




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

    const { id } = useParams();
    useEffect(() => {
        getContenido(id); 
    }, [id]);
  
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

    const Rating = (newRating) => {
        var data = {
            fkContenido: contenido.id,
            valoracion: newRating
        };
        ValoracionService.create(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });      
    }
    return (
        <>
        <div className="d-flex justify-content-center mt-3">
            <h2>{contenido.titulo}</h2>
        </div> 
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={contenido.recurso}
                    onPlay={onPlay}
                    width='100%'
                    height='100%'
                />
            </div>
            <div className="d-flex justify-content-center mt-3">
                <ReactStars
                    size={50}
                    half={false}
                    onChange={Rating} 
                />
            </div> 
        </>
    );
};

export default ViewContenido;
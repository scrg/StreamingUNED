import { Card } from 'react-bootstrap';
import {baseAPI} from "../common/Constantes";

import { useNavigate } from 'react-router-dom';
 


export const ContenidoCard = (props) => {
    
    const history = useNavigate();
    const openContenido = (id) => {
        history("/viewcontenido/" + id);
    };

    return (
        <>
            { 
                <Card style={{ width: '18rem', height:'18rem', cursor:'pointer'}} onClick={() => openContenido(props.contenido.id)} >
                    <Card.Img  style={{ height:'10rem' }} className="card-img-top rounded-circle" variant="top" src={baseAPI + '/Caratulas/' + props.contenido.caratula}  />
                    <Card.Body>
                        <Card.Title>{props.contenido.titulo}</Card.Title>
                        <Card.Text>
                        {props.contenido.identificador}
                        </Card.Text>
                    </Card.Body>
                </Card> 
            }
        </>
    )
}

export default ContenidoCard;
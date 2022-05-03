import React, { useState, useEffect } from "react";
import InterpreteService from "../services/InterpreteService"; 
import moment from 'moment';
 

const Interprete = props => {
    const initialInterpreteState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechaNacimiento:  new Date(Date.now()),
        published: false
    };


    const [currentInterprete, setCurrentInterprete] = useState(initialInterpreteState);
    const [message, setMessage] = useState("");

    const getInterprete = id => {
        InterpreteService.get(id)
            .then(response => {
                setCurrentInterprete(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getInterprete(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentInterprete({ ...currentInterprete, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentInterprete.id,
            nombre: currentInterprete.nombre,
            apellido1: currentInterprete.apellido1,
            apellido2: currentInterprete.apellido2,
            fechaNacimiento: currentInterprete.fechaNacimiento,
            published: true
        };

        InterpreteService.update(currentInterprete.id, data)
            .then(response => {
                setCurrentInterprete({ ...currentInterprete, published: status });
                console.log(response.data);
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateInterprete = () => {
        InterpreteService.update(currentInterprete.id, currentInterprete)
            .then(response => {
                console.log(response.data);
                setMessage("The Interprete was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteInterprete = () => {
        InterpreteService.remove(currentInterprete.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/Interpretes");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentInterprete ? (
                <div className="edit-form">
                    <h4>Interprete</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                required
                                value={currentInterprete.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido1">Apellido 1</label>
                            <input
                                type="text"
                                className="form-control"
                                id="apellido1"
                                name="apellido1"
                                required
                                value={currentInterprete.apellido1}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido2">Apellido 2</label>
                            <input
                                type="text"
                                className="form-control"
                                id="apellido2"
                                name="apellido2"
                                required
                                value={currentInterprete.apellido2}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fechaNacimiento"
                                required
                                value={moment(currentInterprete.fechaNacimiento).format('YYYY-MM-DD')}
                                onChange={handleInputChange}
                                name="fechaNacimiento"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentInterprete.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentInterprete.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deleteInterprete}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateInterprete}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Interprete...</p>
                </div>
            )}
        </div>
    );
};

export default Interprete;
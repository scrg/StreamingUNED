import React, { useState, useEffect } from "react";
import DirectorService from "../services/DirectorService";

const Director = props => {
    const initialDirectorState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechanacimiento: "",
        published: false
    };
    const [currentDirector, setCurrentDirector] = useState(initialDirectorState);
    const [message, setMessage] = useState("");

    const getDirector = id => {
        DirectorService.get(id)
            .then(response => {
                setCurrentDirector(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getDirector(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentDirector({ ...currentDirector, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentDirector.id,
            nombre: currentDirector.nombre,
            apellido1: currentDirector.apellido1,
            apellido2: currentDirector.apellido2,
            fechanacimiento: currentDirector.fechanacimiento,
            published: true
        };

        DirectorService.update(currentDirector.id, data)
            .then(response => {
                setCurrentDirector({ ...currentDirector, published: status });
                console.log(response.data);
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateDirector = () => {
        DirectorService.update(currentDirector.id, currentDirector)
            .then(response => {
                console.log(response.data);
                setMessage("The Director was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteDirector = () => {
        DirectorService.remove(currentDirector.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/Directores");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentDirector ? (
                <div className="edit-form">
                    <h4>Director</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={currentDirector.nombre}
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
                                value={currentDirector.apellido1}
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
                                value={currentDirector.apellido2}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fechanacimiento">Fecha Nacimiento</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fechanacimiento"
                                required
                                value={currentDirector.fechanacimiento}
                                onChange={handleInputChange}
                                name="fechanacimiento"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentDirector.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentDirector.published ? (
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

                    <button className="badge badge-danger mr-2" onClick={deleteDirector}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateDirector}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Director...</p>
                </div>
            )}
        </div>
    );
};

export default Director;
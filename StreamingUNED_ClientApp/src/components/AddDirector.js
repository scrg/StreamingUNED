import React, { useState } from "react";
import DirectorService from "../services/DirectorService";

const AddDirector = () => {
    const initialDirectorState = {
        id: null,
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechanacimiento: ""
    };
    const [director, setDirector] = useState(initialDirectorState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setDirector({ ...director, [name]: value });
    };
    const saveDirector = () => {
        var data = {
            nombre: director.nombre,
            apellido1: director.apellido1,
            apellido2: director.apellido2,
            fechanacimiento: director.fechanacimiento
        };
        DirectorService.create(data)
            .then(response => {
                setDirector({
                    id: response.data.id,
                    nombre: response.data.nombre,
                    apellido1: response.data.apellido1,
                    apellido2: response.data.apellido2,
                    fechanacimiento: response.data.fechanacimiento
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newDirector = () => {
        setDirector(initialDirectorState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newDirector}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={director.nombre}
                            onChange={handleInputChange}
                            name="nombre"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido1">Apellido 1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido1"
                            required
                            value={director.apellido1}
                            onChange={handleInputChange}
                            name="apellido1"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido2">Apellido 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido2"
                            required
                            value={director.apellido2}
                            onChange={handleInputChange}
                            name="apellido2"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechanacimiento">Fecha Nacimiento</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechanacimiento"
                            required
                            value={director.fechanacimiento}
                            onChange={handleInputChange}
                            name="fechanacimiento"
                        />
                    </div>
                    <button onClick={saveDirector} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};
export default AddDirector; 
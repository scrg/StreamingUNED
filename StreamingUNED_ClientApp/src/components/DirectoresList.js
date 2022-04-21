import React, { useState, useEffect, useMemo, useRef } from "react";
import DirectorService from "../services/DirectorService";
import { useTable } from "react-table"; 

const DirectoresList = (props) => {
    const [directores, setDirectores] = useState([]);
    const [search, setSearch] = useState("");
    const directoresRef = useRef();

    directoresRef.current = directores;

    useEffect(() => {
        retrieveDirectores();
    }, []);

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
    };

    const retrieveDirectores = () => {
        DirectorService.getAll()
            .then((response) => {
                setDirectores(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveDirectores();
    };

    const removeAllDirectores = () => {
        DirectorService.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByAll = () => {
        DirectorService.findByAll(search)
            .then((response) => {
                setDirectores(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const openDirector = (rowIndex) => {
        const id = directoresRef.current[rowIndex].id;         
        window.location.href = window.location.origin + "/directores/" + id;
    };
    
    const addDirector = () => {       
        window.location.href = window.location.origin + "/adddirector" };

    const deleteDirector = (rowIndex) => {
        const id = directoresRef.current[rowIndex].id;

        DirectorService.remove(id)
            .then((response) => {
                props.history.push("/directores");

                let newDirector = [...directoresRef.current];
                newDirector.splice(rowIndex, 1);

                setDirectores(newDirector);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const columns = useMemo(
        () => [
            {
                Header: "Nombre",
                accessor: "nombre",
            },
            {
                Header: "Apellido 1",
                accessor: "apellido1",
            },
            // {
            //     Header: "Status",
            //     accessor: "published",
            //     Cell: (props) => {
            //         return props.value ? "Published" : "Pending";
            //     },
            // },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <span onClick={() => openDirector(rowIdx)}>
                                <i className="far fa-edit action mr-2"></i>
                            </span>

                            <span onClick={() => deleteDirector(rowIdx)}>
                                <i className="fas fa-trash action"></i>
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: directores,
    });

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by "
                        value={search}
                        onChange={onChangeSearch}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByAll}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="col-md-8">
                <button className="btn btn-sm btn-danger" onClick={() => addDirector()}>
                    Nuevo director
                </button>
            </div>
        </div>
    );
};

export default DirectoresList;
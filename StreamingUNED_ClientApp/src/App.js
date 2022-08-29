import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Home from "./components/Home";
import Perfil from "./components/Perfil";
import BoardUser from "./components/board-user.component";
import BoardEmpleado from "./components/board-empleado.component";
import BoardAdmin from "./components/board-admin.component";


import AddDirector from "./components/AddDirector";
import Director from "./components/Director";
import DirectoresList from "./components/DirectoresList";

import AddContenido from "./components/AddContenido";
import Contenido from "./components/Contenido";
import ContenidosList from "./components/ContenidosList";

import AddInterprete from "./components/AddInterprete";
import Interprete from "./components/Interprete";
import InterpreteList from "./components/InterpreteList";

import AddProductora from "./components/AddProductora";
import Productora from "./components/Productora";
import ProductoraList from "./components/ProductoraList";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Registro from "./components/Registro";
import  ContenidoPorTematica  from "./components/ContenidoPorTematica";
import  ContenidoPorTipo  from "./components/ContenidoPorTipo";
import  ViewContenido  from "./components/ViewContenido";
import  Historico  from "./components/Historico";
import  Error  from "./components/Error";

import UsuariosList from "./components/UsuariosList";

import InformesVisualizaciones from "./components/InformesVisualizaciones";
import InformesValoraciones from "./components/InformesValoraciones";
import ContenidoCatalogo from "./components/ContenidoCatalogo";

const App = () => {
  const [showEmpleadoBoard, setShowEmpleadoBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowEmpleadoBoard(user.rolId === 2);//2	Empleado
      setShowAdminBoard(user.rolId === 1); //1	Gestor
    } 
    
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowEmpleadoBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined); 
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
        {currentUser ? (
                <Navbar.Brand href="/home"><img src="/logo192.png" alt="profile-img" className="profile-img-card"/></Navbar.Brand>
              ) : (
                <Navbar.Brand href="/login"><img src="/logo192.png" alt="profile-img" className="profile-img-card"/></Navbar.Brand>
              )} 
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {currentUser===undefined && (
                <Nav.Link href="/register">Registro</Nav.Link>
              )}
              {showAdminBoard && (
                <>
                  <NavDropdown title="Administración" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/usuarios">Usuarios</NavDropdown.Item>
                    <NavDropdown.Item href="/contenidos">Contenidos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/directores">Directores</NavDropdown.Item>
                    <NavDropdown.Item href="/interpretes">Intérpretes</NavDropdown.Item>
                    <NavDropdown.Item href="/productoras">Productoras</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Estadísticas" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/InformesVisualizaciones">Visualizaciones</NavDropdown.Item>
                    <NavDropdown.Item href="/InformesValoraciones">Valoraciones</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {showEmpleadoBoard && (
                <>
                  <NavDropdown title="Administración" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/usuarios">Usuarios</NavDropdown.Item>
                    <NavDropdown.Item href="/contenidos">Contenidos</NavDropdown.Item> 
                  </NavDropdown>
                  <NavDropdown title="Estadísticas" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/InformesVisualizaciones">Visualizaciones</NavDropdown.Item>
                    <NavDropdown.Item href="/InformesValoraciones">Valoraciones</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {currentUser && (
                <NavDropdown title="Catálogo" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/contenidoportematica">Por temática</NavDropdown.Item>
                  <NavDropdown.Item href="/contenidoportipo">Por tipo</NavDropdown.Item> 
                  <NavDropdown.Item href="/contenidocatalogo">Búsqueda</NavDropdown.Item>
                </NavDropdown>
              )}
              {currentUser && (
                <>
                  <Nav.Link href="/Historico">Histórico</Nav.Link>
                  <Nav.Link href="/Perfil">Perfil</Nav.Link>
                </>
              )}
              {currentUser ? (
                <Nav.Link href="/login" onClick={logOut}>Cerrar sesión</Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )} 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-3"> 
        <Routes>
          <Route exact path={"/"} element={<Login/>} />
          <Route exact path={"/home"} element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Registro/>} />
          <Route exact path="/Perfil" element={<Perfil/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardEmpleado/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route exact path="/usuarios" element={<UsuariosList/>} />
          <Route exact path="/directores" element={<DirectoresList/>} />
          <Route exact path="/adddirector" element={<AddDirector/>} />
          <Route path="/directores/:id" element={<Director/>} />
          <Route exact path="/contenidos" element={<ContenidosList/>} />
          <Route exact path="/addcontenido" element={<AddContenido/>} />
          <Route path="/contenidos/:id" element={<Contenido/>} />
          <Route exact path="/interpretes" element={<InterpreteList/>} />
          <Route exact path="/addinterprete" element={<AddInterprete/>} />
          <Route path="/interpretes/:id" element={<Interprete/>} />
          <Route exact path="/productoras" element={<ProductoraList/>} />
          <Route exact path="/addproductora" element={<AddProductora/>} />
          <Route path="/productoras/:id" element={<Productora/>} />
          <Route exact path="/contenidoportematica" element={<ContenidoPorTematica/>} />
          <Route exact path="/contenidoportipo" element={<ContenidoPorTipo/>} />
          <Route exact path="/contenidocatalogo" element={<ContenidoCatalogo/>} />
          <Route exact path="/viewcontenido/:id" element={<ViewContenido/>} />
          <Route exact path="/historico" element={<Historico/>} />
          <Route exact path="/InformesVisualizaciones" element={<InformesVisualizaciones/>} />
          <Route exact path="/InformesValoraciones" element={<InformesValoraciones/>} />          
          <Route path="*" element={<Error/>} />
        </Routes> 
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
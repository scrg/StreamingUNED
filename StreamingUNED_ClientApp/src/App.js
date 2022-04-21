import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";


import AddDirector from "./components/AddDirector";
import Director from "./components/Director";
import DirectoresList from "./components/DirectoresList";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import AddUsuario from "./components/AddUsuario";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.rolId === 2);//2	Empleado
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
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">Streaming_UNED</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {showAdminBoard && (
                <NavDropdown title="Administración" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/directores">Usuarios</NavDropdown.Item>
                  <NavDropdown.Item href="/directores">Catálogo</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/directores">Directores</NavDropdown.Item>
                  <NavDropdown.Item href="/directores">Intérpretes</NavDropdown.Item>
                  <NavDropdown.Item href="/directores">Productoras</NavDropdown.Item>
                  <NavDropdown.Item href="/directores">Temáticas</NavDropdown.Item>
                  <NavDropdown.Item href="/directores">Tipos</NavDropdown.Item>
                </NavDropdown>
              )}
              {showAdminBoard && (
                <NavDropdown title="Estadísticas" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.2">Por usuario</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Por temática</NavDropdown.Item>
                </NavDropdown>
              )}
              {showModeratorBoard && (
                <NavDropdown title="Empleado" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              )}
              {currentUser && (
              <NavDropdown title="Catálogo" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">Por temática</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Por tipo</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Búsqueda</NavDropdown.Item>
              </NavDropdown>
              )}
              {currentUser && (
              <Nav.Link href="#action/3.4">Histórico</Nav.Link>
              )}
              {currentUser && (
                <Nav.Link href="/profile">Perfil</Nav.Link>
              )}
              {currentUser ? (
                <Nav.Link href="/login" onClick={logOut}>LogOut</Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}

              {!currentUser && (
                <Nav.Link href="/register">Registro</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-3">
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/home"} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={AddUsuario} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route exact path="/directores" component={DirectoresList} />
          <Route exact path="/adddirector" component={AddDirector} />
          <Route path="/directores/:id" component={Director} />
        </Switch>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
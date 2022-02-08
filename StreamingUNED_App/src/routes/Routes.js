import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import cors from 'cors';

function App() {
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={ Login} />
                <Route path="/menu" component={Menu } />
                <Route path="/login" />
                </Switch>
            </BrowserRouter>
        )
}
export default App;
import React from "react";
import "./styles.css";
import {createBrowserHistory} from 'history';

import Login from "./login/login";
import Signup from "./signUp/signUp";
import ProductList from "./ListComponent/index";
import Dashboard from "./dashboard";
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
function App() {
    const history = createBrowserHistory();
    return (
        <Router history={history}>
            <Route path="/login" component={Login}/>

              <Route path="/signup"  component={Signup}/>

            <ProtectedRoute path="/dashboard"  >
              <Dashboard />

            </ProtectedRoute>
            <Route exact path="/product-list" component={ProductList}/>
            <Route exact path="/product/:id" component={Dashboard}/>

            <Route exact path="/" >
              <Redirect exact from="/" to="dashboard" />
            </Route>
            <Route path="*">
              <Redirect from="/" to="dashboard" />
            </Route>
        </Router>
    );
}
export default App;

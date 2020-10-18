import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import login from "./components/userCredential/login";
import signup from "./components/userCredential/signup";


export default class App extends Component {
    render() {
        return (
            <Router >
                <Switch>
                    <Route path="/login" exact component={login} />
                    <Route path="/signup" exact component={signup} />
                </Switch>
            </Router>
        )
    }
}


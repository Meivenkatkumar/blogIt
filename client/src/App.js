import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/userCredential/login";
import Signup from "./components/userCredential/signup";
import {apiService} from "./api/api";

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            logIn: false,
            username: ""
        }
    }

    verifyLogin = async () => {
        try {
            var response = await apiService.getRequest("/auth/verify");
            if(response.success){
              this.setState({
                  loading: false,
                  logIn: true,
                  username: response.user.username
              });
            }
            else{
                this.setState({
                    loading: false,
                    logIn: false,
                    username: ""
                }); 
            }
        } catch (err) {
            console.log("handle error:", err);
        }
    }

    componentDidMount = async () => {
        try {
            await this.verifyLogin();
        } catch (err) {
            console.log("handle error:", err);
        }
    }

    render() {
        return (
            <Router >
                <Switch>
                    <Route 
                      path="/login" exact 
                      render={(props) => <Login logIn={this.state.logIn} verifyLogin={this.verifyLogin} />} 
                    />
                    <Route 
                      path="/signup" exact 
                      render={(props) => <Signup logIn={this.state.logIn} verifyLogin={this.verifyLogin} />} 
                    />
                </Switch>
            </Router>
        )
    }
}


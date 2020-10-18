import React from "react";
import $ from "jquery";
import {apiService} from "../../api/api";

export default class Login extends React.Component {

  submitForm = async () => {
    var body = {
      username: $("#username").val(),
      password: $("#password").val()
    }
    try{
      var response = await apiService.postRequest("/auth/login", body);
      if(!response.success){
        throw response.msg;
      }
      window.location.href = "/";
    }
    catch(err){
      console.log("handle error:",err);
    }
  }

  render() {
    return (
      <div>
        <h3>Log in to your Account</h3>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            required
          />
        </div>
        
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            id="password"
            required
          />
        </div>

        <div>
          <input
            type="submit"
            defaultValue="Get Started"
            onClick={this.submitForm}
          />
          <p>Log in with :</p>
        </div>

        <div>
          <p>
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </div>
      </div>
    );
  }
}

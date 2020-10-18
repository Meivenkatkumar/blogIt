import React from "react";
import $ from "jquery";
import {apiService} from "../../api/api";

export default class Signup extends React.Component {
  
  submitForm = async () => {
    var body = {
      username: $("#username").val(),
      password: $("#password").val(),
      re_password: $("#retype-password").val(),
      email: $("#email").val()
    }
    
    if(body.password !== body.re_password){
      alert("Password did not match");
    }
    else{
      try{
        var response = await apiService.postRequest("/auth/signup", body);
        if(!response.success){
          throw response.msg;
        }
        window.location.href = "/";
      }
      catch(err){
        console.log("handle error:",err);
      }
    }
  }
  
  render() {
    return (
      <div>
        <h3>Signup</h3>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Full name"
            id="username"
            required
          />
        </div>
  
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            id="email"
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
          <label>Confirm password</label>
          <input
            type="password"
            placeholder="********"
            id="retype-password"
            required
          />
        </div>
        
        <div>
          <input
            type="submit"
            defaultValue="Get Started"
            onClick={this.submitForm}
          />
          <p>Sign up with</p>
        </div>
      
        <div>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    );
  }
}

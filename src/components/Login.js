import React, { useEffect } from "react";
import axios from "axios";
import {axiosWithAuth} from '../helpers/axiosWithAuth'

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    // make a POST request with the username and password as the data body
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((res) => {
        // res.data.payload
        // store the token in localStorage (sessions, cookies)
        console.log(res)
        window.localStorage.setItem("token", JSON.stringify(res.data.payload));
        // navigate to some landing/profile/dashboard page
        this.props.history.push("/protected");
        // function component => import the useHistory hook and use that to navigate
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            placeholder = "username"
            data-testid="username"
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder = "password"
            data-testid="password"
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
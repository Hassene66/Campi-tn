import { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Login() {
  const [userInput, setUserInput] = useState({
    Email: "",
    Password: "",
  });
  const HandleInputChange = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: userInput.Email,
      motdepasse: userInput.Password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/api/login", data, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };
  return (
    <div className="login ">
      <div className="limiter" id="login">
        <div className="container-login100">
          <div className="container">
            <div className="row ">
              <div className="col-md-5 m-auto col-md-offset-1">
                <div className="login_topimg"> </div>
                <div className="wrap-login100">
                  <form
                    onSubmit={HandleSubmit}
                    className="login100-form validate-form"
                  >
                    <span className="login100-form-title "> Login </span>
                    <span className="login100-form-subtitle m-b-16">
                      to your account
                    </span>
                    <div className="wrap-input100 validate-input m-b-16">
                      <input
                        className="input100"
                        type="e-mail"
                        name="Email"
                        placeholder="Email"
                        onChange={HandleInputChange}
                        value={userInput.Email}
                      />
                      <span className="focus-input100" />
                      <span className="symbol-input100">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <div className="wrap-input100 validate-input m-b-16">
                      <input
                        className="input100"
                        type="password"
                        name="Password"
                        placeholder="Mot de passe"
                        onChange={HandleInputChange}
                        value={userInput.Password}
                      />
                      <span className="focus-input100" />
                      <span className="symbol-input100">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    <div className="container-login100-form-btn p-t-25">
                      <button className="login100-form-btn">Login</button>
                    </div>
                    <div className="flex-sb-m w-full p-b-30 mt-3">
                      <div className="contact100-form-checkbox"></div>
                      <div>
                        Don't have an account?{" "}
                        <Link to="/register">Sign Up</Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

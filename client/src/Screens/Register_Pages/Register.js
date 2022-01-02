import React from "react";
import { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Register() {
  const [userInput, setUserInput] = useState({
    Name: "",
    Surname: "",
    Email: "",
    Password: "",
  });
  const HandleInputChange = (e) => {
    setUserInput((PrevState) => ({
      ...PrevState,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nom: userInput.Name,
      prénom: userInput.Surname,
      email: userInput.Email,
      motdepasse: userInput.Password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/api/register", data, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };
  return (
    <div className="register ">
      <div className="limiter" id="login">
        <div className="container-login100">
          <div className="container">
            <div className="row ">
              <div className="col-md-5 m-auto col-md-offset-1">
                <div
                  className="login_topimg "
                  style={{ objectFit: "contain" }}
                ></div>
                <div className="wrap-login100">
                  <form
                    onSubmit={HandleSubmit}
                    className="login100-form validate-form"
                  >
                    <span className="login100-form-title "> Créer </span>
                    <span className="login100-form-subtitle m-b-16">
                      un nouveau compte
                    </span>
                    <div className="wrap-input100 validate-input m-b-16">
                      <input
                        className="input100"
                        type="text"
                        name="Name"
                        placeholder="Nom"
                        onChange={HandleInputChange}
                        value={userInput.Name}
                      />
                    </div>
                    <div className="wrap-input100 validate-input m-b-16">
                      <input
                        className="input100"
                        type="text"
                        name="Surname"
                        placeholder="Prénom"
                        onChange={HandleInputChange}
                        value={userInput.Surname}
                      />
                    </div>
                    <div className="wrap-input100 validate-input m-b-16">
                      <input
                        className="input100"
                        type="e-mail"
                        name="Email"
                        placeholder="Email"
                        onChange={HandleInputChange}
                        value={userInput.Email}
                      />
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
                    </div>
                    <div className="container-login100-form-btn p-t-25">
                      <button className="login100-form-btn">Register</button>
                    </div>
                    <div className="flex-sb-m w-full p-b-30 mt-3">
                      <div className="contact100-form-checkbox"></div>
                      <div>
                        Déjà membre? <Link to="/login">Login</Link>
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

export default Register;

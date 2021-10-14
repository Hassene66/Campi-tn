import react, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
function Register() {
  const [userInput, setUserInput] = useState({
    FullName: "",
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
    console.log(`Fullname : ${userInput.FullName}
Email : ${userInput.Email}
Password : ${userInput.Password}
      `);
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
                    <span className="login100-form-title "> Register </span>
                    <span className="login100-form-subtitle m-b-16">
                      new account
                    </span>
                    <div className="wrap-input100 validate-input m-b-16">
                      <input
                        className="input100"
                        type="text"
                        name="FullName"
                        placeholder="Full name"
                        onChange={HandleInputChange}
                        value={userInput.FullName}
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
                        placeholder="Password"
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
                        Already a member? <Link to="/login">Login</Link>
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

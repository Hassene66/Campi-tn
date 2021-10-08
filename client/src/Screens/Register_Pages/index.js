import React from "react";
import FooterWrapper from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import Register from "./Register";

const RegisterPage = () => {
  return (
    <>
      <FooterWrapper>
        <Navbar className="menu menu-dark" />
        <Register />
      </FooterWrapper>
    </>
  );
};

export default RegisterPage;

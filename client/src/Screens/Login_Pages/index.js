import React from "react";
import FooterWrapper from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import LoginForm from "./Login";

const LoginPage = () => {
  return (
    <>
      <FooterWrapper>
        <Navbar className="menu menu-dark" />
        <LoginForm />
      </FooterWrapper>
    </>
  );
};

export default LoginPage;

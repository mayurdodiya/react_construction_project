import React, { useState } from "react";
import style from "./../css/Button.module.css";
import { Link } from "react-router";
// import { useNavigate } from "react-router-dom";  // Import useHistory

const Button49 = () => {
  // let [logSignup, setLogSignup] = useState("login");
  // const navigate = useNavigate();

  function loginFun(params) {
    // navigate("/login");
    console.log("login");
    // return <Link key="1" to="http://localhost:3000/login">Logi</Link>;
    // return setLogSignup("login");
  }

  function signUpFun(params) {
    console.log("signup");
    // return setLogSignup("signup");
  }
  return (
    <>
      <button className={style["button-49"]} role="button" onClick={loginFun}>
        Login
        <Link key="1" to={'/login'}>Lojj</Link>
      </button>
      <button className={style["button-48"]} role="button" onClick={signUpFun}>
        SignUp
      </button>
    </>
  );
};

export default Button49;

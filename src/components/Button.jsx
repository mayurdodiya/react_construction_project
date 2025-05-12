import React, { } from "react";
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
    <span className={style.btnSpan}>
      <Link key="1" to={"/login"}>
        <button className={style["button-49"]} role="button" onClick={loginFun}>
          Login
        </button>
      </Link>

      <Link key="2" to={"/signup"}>
        <button className={style["button-48"]} role="button" onClick={signUpFun}>
          SignUp
        </button>
      </Link>
    </span>
  );
};

export default Button49;

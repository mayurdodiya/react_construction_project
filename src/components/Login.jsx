import style from "./../css/Login.module.css";
import { Link, useNavigate } from "react-router";
import loginPageImg from "../img/login1.png";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function HandleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      //

      const data = await response.json();

      if (data?.success) {
        localStorage.setItem("token", data.data.token);
        toast.success("Login successfully.", {
          autoClose: 1000,
          onClose: () => {
            navigate("/dashboard");
          },
        });
      } else {
        toast.error(data?.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error sending login request:", error);
    }
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
      <img className={style.img} src={loginPageImg} alt="main page img" />
      <form className={style.login_box} onSubmit={HandleSubmit}>
        <h2>Login</h2>
        <div className={style.input_group}>
          <input type="text" name="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} required />
          <i>🔒</i>
        </div>
        <div className={style.input_group}>
          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <i>🔒</i>
        </div>
        <div className={style.options}>
          <label>
            <input type="checkbox" name="remember" /> Remember me
          </label>
          <a href="#" style={{ color: "white" }}>
            Forgot Password?
          </a>
        </div>
        <br />
        <br />
        <button type="submit" className={style.login_btn}>
          Login
        </button>
        <div className={style.register_link}>
          Don’t have an account? <a href="/signup">Register</a>
        </div>
      </form>
    </>
  );
}

export default Login;

import style from "./../css/Login.module.css";
import { useNavigate } from "react-router";
import loginPageImg from "../img/login1.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const validate = (formData) => {
    const errorData = {};
    if (!formData.email) {
      errorData.email = "Email is required*";
    }

    if (!formData.password) {
      errorData.password = "Password is required*";
    }
    setError(errorData);
    return errorData;
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    const validateError = validate(formData);
    if (Object.keys(validateError).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

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
      <img className={style.img} src={loginPageImg} alt="main page img" />
      <form className={style.login_box} onSubmit={HandleSubmit}>
        <h2>Login</h2>
        <div className={style.input_group}>
          <input className={error?.email ? `${style.input} ${style.inputError}` : style.input} type="text" name="email" placeholder={error?.email ?? "Email"} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} /* required */ />
          <i>🔒</i>
        </div>
        <div className={style.input_group}>
          <input type="password" name="password" placeholder={error?.password ?? "Password"} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} /* required */ />
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

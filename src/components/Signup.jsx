import style from "./../css/Signup.module.css";
import loginPageImg from "../img/login1.png";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fromData, setFormData] = useState({ email: "", name: "", mobile: "", password: "", confirmPassword: "" });
  const [error, setError] = useState({});
  const [tostShow, setTostShow] = useState(true);

  useEffect(() => {
    if (tostShow && location.state?.data?.message) {
      toast.success(location.state?.data?.message || "Login successfully.");
      setTostShow(false);
    }
  });

  const validate = (data) => {
    const errorData = {};
    if (!data?.email) {
      errorData.email = "Email is required*";
    }

    if (!data?.mobile) {
      errorData.mobile = "Mobile is required*";
    }

    if (!data?.password) {
      errorData.password = "Password is required*";
    }

    if (!data?.confirmPassword) {
      errorData.confirmPassword = "Confirm password is required*";
    }

    setError(errorData);
    return errorData;
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    const validation = validate(fromData);
    if (Object.keys(validation).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: fromData?.email,
          password: fromData?.password,
          confirm_password: fromData?.confirmPassword,
          name: fromData?.name,
          phone_no: fromData?.mobile,
        }),
      });

      const data = await response.json();

      if (data?.success) {
        toast.success(data?.message || "Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
      <img className={style.img} src={loginPageImg} alt="main page img" />
      <form className={style.login_box} onSubmit={HandleSubmit}>
        <h2>SignUp</h2>

        <div className={style.input_group}>
          <input type="text" name="name" placeholder="Name" onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} /* required */ />
        </div>

        <div className={style.input_group}>
          <input type="text" name="phone no" placeholder={error?.mobile ?? "Mobile number"} onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))} /* required */ />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="text" name="email" placeholder={error?.email ?? "Email"} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} /* required */ />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="password" name="password" placeholder={error?.password ?? "Password"} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} /* required */ />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="password" name="confirm password" placeholder={error?.confirmPassword ?? "Confirm Password"} onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))} /* required */ />
          <i>🔒</i>
        </div>
        <br />
        <br />
        <button type="submit" className={style.login_btn}>
          Signup
        </button>
        {
          <div className={style.register_link}>
            If you have an account? <a href="/login">Login here</a>
          </div>
        }
      </form>
    </>
  );
}

export default Signup;

import style from "./../css/Signup.module.css";
import loginPageImg from "../img/login1.png";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tostShow, setTostShow] = useState(true);

  useEffect(() => {
    if (tostShow && location.state?.data?.message) {
      toast.success(location.state?.data?.message || "Login successfully.");
      setTostShow(false);
    }
  });

  async function HandleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4001/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirm_password: confirmPassword,
          name: name,
          phone_no: mobile,
        }),
      });

      const data = await response.json();
      console.log(data, "----------------------------data");

      if (data?.success) {
        toast.success(data?.message || "Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000); // ✅ CORRECT
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
          <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="text" name="phone no" placeholder="Mobile number" onChange={(e) => setMobile(e.target.value)} required />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="text" name="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} required />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="password" name="confirm password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
          <i>🔒</i>
        </div>
        <br />
        <br />
        {/* <Link> */}
        <button type="submit" className={style.login_btn}>
          Signup
        </button>
        {/* </Link> */}

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

import style from "./../css/Signup.module.css";
import loginPageImg from "../img/login1.png";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function EditUser() {
  const navigate = useNavigate();
  const [location] = useSearchParams();
  const id = location.get("id");

  const [userData, setUserData] = useState({});

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(email, "----------email");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:4001/api/v1/auth/getUserById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
      });
  }, []);

  async function SaveData() {
    const token = localStorage.getItem("token");
    const url = `http://localhost:4001/api/v1/auth/editUserById/${id}`;
    console.log(url, "------------------url");
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone_no: mobile,
      }),
    });

    response = await response.json();
    if (response?.success) {
      console.log("update successfully");
      toast.success(response?.message);
      navigate("/dashboard");
    } else {
      console.log("not-update successfully");
      toast.error(response?.message);
    }
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
      <img className={style.img} src={loginPageImg} alt="main page img" />
      <form
        className={style.login_box}
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          SaveData();
        }}
      >
        <h2>Edit Profile Detail</h2>

        <div className={style.input_group}>
          <input type="text" name="name" placeholder={userData.name} onChange={(e) => setName(e.target.value)} required />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="text" name="phone no" placeholder={userData.phone_no} onChange={(e) => setMobile(e.target.value)} required />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="text" name="email" placeholder={userData.email} onChange={(e) => setEmail(e.target.value)} required />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="password" name="password" placeholder="-" onChange={(e) => setPassword(e.target.value)} required />
          <i>🔒</i>
        </div>

        <div className={style.input_group}>
          <input type="password" name="confirm password" placeholder="-" onChange={(e) => setConfirmPassword(e.target.value)} required />
          <i>🔒</i>
        </div>
        <br />
        <br />
        {/* <Link> */}
        <button type="submit" className={style.login_btn}>
          Edit Profile
        </button>
        {/* </Link> */}
      </form>
    </>
  );
}

export default EditUser;

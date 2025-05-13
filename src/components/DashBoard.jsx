import { Link, useNavigate } from "react-router";
import style from "./../css/DashBoard.module.css";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import loginPageImg from "../img/login1.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function DashBoard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const countRef = useRef(0);
  console.log(countRef, "----------------------------- useRef");
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4001/api/v1/auth/userList", {
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

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
      <img className={style.img} src={loginPageImg} alt="main page img" />
      {/* <div className={style.login_box} onSubmit={"HandleSubmit"}> */}
      <div className={style.login_box}>
        <div className={style.table_wrapper}>
          <h1>Dashbord</h1>
          {/* <h1>useRef = {countRef.current}</h1>
                      <button onClick={()=> {
                        countRef.current = countRef.current + 1
                      }}>click</button> */}
          <table className={style.glass_table}>
            <thead className={style.stickey}>
              <tr>
                <th>Sr.No</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((data, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone_no}</td>
                  <td>
                    <Link onClick={() => navigate(`/editUser?id=${data._id}`)}>
                      <i className={`fas fa-edit ${style.edit_icon}`}></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DashBoard;

import { Link, useNavigate } from "react-router";
import style from "./../css/DashBoard.module.css";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import loginPageImg from "../img/login1.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LeftBtnMenu from "./LeftBtnMenu";

function DashBoard() {
  const navigate = useNavigate();
  let [userData, setUserData] = useState([]);
  const [pagIngData, setPagingData] = useState(0);
  const [search, setSearch] = useState("");
  const [menuPosition, setLeftBtnMenu] = useState({});
  const [dataId, setId] = useState("0");
  const countRef = useRef(0);
  console.log(countRef, "----------------------------- useRef");
  console.log(dataId, "----------------------------- useRef");


  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:4001/api/v1/auth/userList?page=${pagIngData}&size=${5}`, {
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
  }, [pagIngData, menuPosition, search]);

  const searchHandle = () => {
    const normalizedSearch = search.trim().toLowerCase();
    if (normalizedSearch != "") {
      setUserData(userData.filter((data) => data.email.toLowerCase().includes(normalizedSearch)));
    } else {
      setSearch("");
    }
  };

  const sortingHandle = async (type) => {
    const sortingData = [...userData].sort((a, b) => type=='dsc'?b.phone_no - a.phone_no: a.phone_no - b.phone_no);
    setUserData(sortingData);
  };

  return (
    <>
      <LeftBtnMenu menuPosition={[menuPosition, setLeftBtnMenu, dataId]} />
      <img className={style.img} src={loginPageImg} alt="main page img" />
      {/* <div className={style.login_box} onSubmit={"HandleSubmit"}> */}
      <div className={style.login_box}>
        <div className={style.table_wrapper}>
          <h1>Dashbord</h1>
          <input
            type="text"
            onChange={(e) => {
              e.stopPropagation()
              setSearch(e.target.value);
            }}
          />
          <button onClick={searchHandle}>Search</button>
          <br />
          <br />
          <button onClick={() => sortingHandle("asc")}>ASC</button>&nbsp;&nbsp;
          <button onClick={() => sortingHandle("dsc")}>DSC</button>
          <br />
          <br />
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
                <tr
                  key={idx}
                  onContextMenu={(e) => {
                    // can open right click menu
                    e.preventDefault(); // close browser default menu
                    console.log(e.clientX, e.clientY); // arrow move
                    setLeftBtnMenu({ left: e.clientX, top: e.clientY });
                    setId(data._id);
                  }}
                  onClick={(e) => {
                    // set other event
                    setLeftBtnMenu({});
                  }}
                >
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
        <span className={style.pageSpan}>
          {pagIngData === 0 ? (
            ""
          ) : (
            <button className={style.PageBtn} onClick={() => setPagingData(pagIngData === 0 ? 0 : pagIngData - 1)}>
              Prev Page
            </button>
          )}
          {
            <button className={style.PageBtn} onClick={() => setPagingData(pagIngData + 1)}>
              Next Page
            </button>
          }
        </span>
      </div>
    </>
  );
}

export default DashBoard;

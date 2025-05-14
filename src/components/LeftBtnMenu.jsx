import { toast, ToastContainer } from "react-toastify";
import style from "./../css/LeftBtnMenu.module.css";

function LeftBtnMenu({ menuPosition }) {
  const [position, setLeftBtnMenu, dataId] = menuPosition;
  console.log(position, "------------- dddddddddddddddddddddddddd");
  if (!position.left) return;

  return (
    <>
      <div className={style.btnMenu} style={position}>
        <button className={style.btn} onClick={(e) => setLeftBtnMenu({})}>
          Edit
        </button>
        <button
          className={style.btn}
          onClick={(e) => {
            console.log("--------------wwwwwwwwwww111111111");
            fetch(`http://localhost:4001/api/v1/auth/deleteuser/${dataId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "-------------------- data");
                if (data.success) {
                  toast.success(data?.message);
                  console.log("--------------------------------- user is deleted+++++++++++++++");
                } else {
                  toast.error(data?.message);
                }
              });
            setLeftBtnMenu({});
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default LeftBtnMenu;

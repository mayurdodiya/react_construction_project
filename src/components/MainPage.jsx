import style from "./../css/MainPage.module.css";
import mainPageImg from "./../img/Slider.png";
import MainPageContent from "./MainPageContent";

function MainPage() {
  return (
    <>
      <img className={style.img} src={mainPageImg} alt="main page img" />
      <MainPageContent />
    </>
  );
}

export default MainPage;

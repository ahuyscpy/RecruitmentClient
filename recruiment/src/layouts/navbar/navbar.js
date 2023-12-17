import logo from "../../assets/images/asep.png";
import styles from "./navbar.module.scss";
import { BsSearch, BsBuilding } from "react-icons/bs";
import {
  IoMdChatbubbles,
  IoMdNotifications,
  FaUserCircle,
} from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import clsx from "clsx";
import Notification from "../../pages/notification/notification";
import { useNavigate, Link, useLocation } from "react-router-dom";
const navs = [
  {
    path: "/search-recruitment",
    name: "Danh sách việc làm",
  },
  {
    path: "/search-company",
    name: "Danh sách công ty",
  },
  {
    path: "/search-user",
    name: "Danh sách ứng viên",
  },
];
function Navbar() {
  let navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className={styles.navbar}>
      <div className={`${styles.navbar_icon} !flex items-center`}>
        <Link to="/">
          <img src={logo} className={styles.navbar_logo} />
        </Link>
      </div>
      <div className={styles.category}>
        {navs.map((e) => (
          <Link
            key={e.path}
            to={e.path}
            className="h-full flex items-center text-black"
          >
            <div className={`flex items-center mr-5 text-[16px] hover:text-primary ${e.path === location.pathname ? 'font-bold text-primary' : '' }`}>
              {e.name}
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.catalog}>
        <Link to="/login" className={styles.user}>
          <FaRegUserCircle className={styles.icon_user} />
          <div className={styles.user_content}>Đăng nhập</div>
          <div className={styles.separation}>|</div>
        </Link>
        <Link to="/register-user" className={styles.user}>
          <FaRegUserCircle className={styles.icon_user} />
          <div className={styles.user_content}>Đăng ký</div>
          <div className={styles.separation}>|</div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

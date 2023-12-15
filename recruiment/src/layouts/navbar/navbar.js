import logo from '../../assets/images/asep.png'
import styles from './navbar.module.scss'
import { BsSearch,BsBuilding } from "react-icons/bs";
import { IoMdChatbubbles, IoMdNotifications,FaUserCircle} from "react-icons/io";
import { FaRegUserCircle} from "react-icons/fa";
import clsx from 'clsx';
import Notification from '../../pages/notification/notification';
import { useNavigate, Link } from 'react-router-dom';
function Navbar() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_icon}>
                <Link to="/"><img src={logo} className={styles.navbar_logo} /></Link>
            </div>
            <div className={styles.category}>
                
                <Link to='/search-recruitment' className={styles.recruitment}>
                    <div className={styles.content}>Danh sách việc làm</div>
                </Link>
                <Link to='/search-company' className={styles.recruitment}>
                    <div className={styles.content}>Danh sách Công ty</div>
                </Link>
                <Link to='/search-user' className={styles.recruitment}>
                    <div className={styles.content}>Danh sách ứng viên</div>
                </Link>
            </div>
            <div className={styles.catalog}>
                <Link to='/login' className={styles.user}>
                    <FaRegUserCircle className={styles.icon_user}/>
                    <div className={styles.user_content}>Đăng nhập</div>
                    <div className={styles.separation}>|</div>
                </Link>
                <Link to='/register-user' className={styles.user}>
                    <FaRegUserCircle className={styles.icon_user}/>
                    <div className={styles.user_content}>Đăng ký</div>
                    <div className={styles.separation}>|</div>
                </Link>
               
            </div>
        </div>
        
    )
}

export default Navbar;
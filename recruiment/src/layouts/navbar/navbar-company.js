import logo from '../../assets/images/asep.png'
import styles from './navbarCompany.module.scss'
import { IoMdChatbubbles, IoMdNotifications, FaUserCircle } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import clsx from 'clsx';
import { useNavigate, Link } from 'react-router-dom';

function NavbarCompany() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_icon}>
                <Link to="/company"><img src={logo} className={styles.navbar_logo} /></Link>
            </div>
            <div className={styles.category}>
                
                <Link to='/recruitment' className={styles.recruitment}>
                    <div className={styles.content}>Tuyển dụng</div>
                </Link>
                <Link to='/search-user' className={styles.recruitment}>
                    <div className={styles.content}>Danh sách ứng viên</div>
                </Link>
                <Link to='/search-recruitment' className={styles.recruitment}>
                    <div className={styles.content}>Danh sách việc làm</div>
                </Link>
            </div>


            <div className={styles.catalog}>


                <Link to='/chat' className={styles.chat}>
                    <div className={styles.separation}>|</div>
                    <IoMdChatbubbles className={styles.icon_chat} />
                    <div className={styles.separation}>|</div>
                </Link>
                <Link to='/notification' className={styles.notification}>

                    <IoMdNotifications className={styles.icon_notification} />
                    <div className={styles.separation}>|</div>
                </Link>

                <Link to ={'/company/profile/' + user.id}className={styles.user}>
                    <FaRegUserCircle className={styles.icon_user} />
                    <div className={styles.user_content}>Thông tin</div>
                    <div className={styles.separation}>|</div>
                </Link>
                <a onClick={logout} className={styles.user}>
                    <FiLogOut className={styles.icon_user} />
                    <div className={styles.user_content}>Đăng xuất</div>
                </a>
            </div>
        </div>
    )
}

export default NavbarCompany;
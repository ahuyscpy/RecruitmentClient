import logo from '../../assets/images/asep.png'
import styles from './navbarAdmin.module.scss'
import { IoLogOut } from "react-icons/io5";
import clsx from 'clsx';
import { useNavigate, Link } from 'react-router-dom';

function NavbarAdmin() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_icon}>
                <Link to="/career"><img src={logo} className={styles.navbar_logo} /></Link>
            </div>
            <div className={styles.category}>
                <Link to='/career' className={clsx(styles.career, styles.active_category)}>
                    <div className={styles.content}>việc làm</div>
                </Link>
                <Link to='/branch' className={styles.branch}>
                    <div className={styles.content}>Tỉnh/ Thành phố</div>
                </Link>
                <Link to='/account' className={styles.account}>
                    <div className={styles.content}>Tài khoản</div>
                </Link>
            </div>


            <div className={styles.catalog} >
                <a onClick={logout} className={styles.user}>
                    <IoLogOut className={styles.icon_user} />
                    <div className={styles.user_content}>Đăng xuất</div>
                </a>
            </div>
        </div>
    )
}

export default NavbarAdmin;
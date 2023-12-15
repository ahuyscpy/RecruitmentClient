import logo from '../../assets/images/asep.png'
import styles from './navbar-user.module.scss'
import { BsSearch,BsBuilding } from "react-icons/bs";
import { IoMdChatbubbles, IoMdNotifications,FaUserCircle} from "react-icons/io";
import { FaRegUserCircle} from "react-icons/fa";

import { Link } from 'react-router-dom';
function NavbarUser() {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_icon}>
                <Link to="/user"><img src={logo} className={styles.navbar_logo} /></Link>
            </div>
            <div className={styles.catalog}>
                <Link to='/search-recruitment' className={styles.location}>
                    <BsSearch className={styles.icon_search}/>
                    <div className={styles.location_content}>Tìm kiếm việc làm</div>
                    <div className={styles.separation}>|</div>
                </Link>
                
                <Link to='/search-company' className={styles.company}>
                    <BsBuilding className={styles.icon_company}/>
                    <div className={styles.company_content}>Công ty</div>
                    <div className={styles.separation}>|</div>
                </Link>

                <Link to='/chat' className={styles.chat}>
                    <IoMdChatbubbles className={styles.icon_chat}/>
                    {/* <div className={styles.count}>1</div> */}
                    <div className={styles.separation}>|</div>
                </Link>
                <Link to='/notification' className={styles.notification}>
                    
                    <IoMdNotifications className={styles.icon_notification}/>
                    {/* <div className={clsx(styles.count, styles.active)}>1</div> */}
                    <div className={styles.separation}>|</div>
                </Link>
                <Link to={'/user/profile/information/' + user.id} className={styles.user}>
                    <FaRegUserCircle className={styles.icon_user}/>
                    <div className={styles.user_content}>Tài khoản</div>
                    <div className={styles.separation}>|</div>
                </Link>
            </div>
        </div>
        
    )
}

export default NavbarUser;
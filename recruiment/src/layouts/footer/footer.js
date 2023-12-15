import clsx from 'clsx';
import styles from './footer.module.scss'


function Footer() {
    return (

        <div className={styles.footer}>
            <div className={styles.wrapper}>
            <div>
                <div className={styles.title}>Giành cho ứng viên</div>
                <ul className={styles.content_list}>
                    <li className={styles.content}>Xem trang cá nhân</li>
                    <li className={styles.content}>Tìm việc làm</li>
                    <li className={styles.content}>Tìm công ty</li>
                    <li className={styles.content}>Xem thông báo</li>
                    
                </ul>
            </div>
            <div>
                <div className={styles.title}>Giành cho công ty</div>
                <ul className={styles.content_list}>
                    <li className={styles.content}>Tìm kiếm ứng viên</li>
                    <li className={styles.content}>Đăng bài tuyển dụng</li>
                    <li className={styles.content}>Chat</li>
                    
                </ul>
            </div>
            <div >
                <div  className={styles.title}>Việc làm theo khu vực</div>
                <ul className={styles.content_list}>
                    <li className={styles.content}>Hà Nội</li>
                    <li className={styles.content}>Đà Nẵng</li>
                    <li className={styles.content}>Tp Hồ Chí Minh</li>
                </ul>
            </div>
            <div >
                <div  className={styles.title}>Việc làm theo nghành nghề</div>
                <ul className={styles.content_list}>
                    <li className={styles.content}>Bác sĩ</li>
                    <li className={styles.content}>Công nghệ thông tin</li>
                    <li className={styles.content}>Thiết kế đồ họa</li>
                </ul>
            </div>
            </div>
            

        </div>
    )
}

export default Footer;
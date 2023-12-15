import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams,Outlet  } from 'react-router-dom';
import { Form, Input, Button, message, Modal } from 'antd';

import styles from './profile-user.module.scss'
import NavbarUser from '../../../layouts/navbar/navbar-user';
import clsx from 'clsx';
import Information from './information';
import ChangePasswordUser from './change-password-user';
import ForgotPassword from './forgot-password';
import NavbarCompany from '../../../layouts/navbar/navbar-company';
import NavbarAdmin from '../../../layouts/navbar/navbar-admin';
import Navbar from '../../../layouts/navbar/navbar';

function ProfileUser() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <>
            {user?.role == 'user'?<NavbarUser /> : user?.role == 'company'? <NavbarCompany/> : user?.role ==='admin'? <NavbarAdmin/> : <Navbar/>}
            
            <div className={styles.wrapper}>
                {user?.role == 'user' && 
                <div className={styles.catalog}>
                    <ul className={styles.list}>
                        <Link to={'/user/profile/information/' + user.id}>
                            <li className={styles.item }>
                                <h3>Tài Khoản</h3>
                                <p>Thông tin cá nhân</p>
                            </li>
                        </Link>
                        <Link to={'/user/profile/change-password/' + user.id}>
                            <li className={styles.item}>
                                <h3>Đổi Mật khẩu</h3>
                                <p>Thay đổi mật khẩu đăng nhập</p>
                            </li>
                        </Link>
                        <a onClick={logout}>
                            <li className={styles.item}>
                                <h3>Đăng xuất</h3>
                                <p>Đăng xuất</p>
                            </li>
                        </a>
                    </ul>


                </div>
                }
                
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ProfileUser
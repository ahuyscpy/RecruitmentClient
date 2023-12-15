import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';

import styles from './home-company.module.scss'
import NavbarCompany from '../../../layouts/navbar/navbar-company'
import banner from '../../../assets/images/employer-banner.png'
import Footer from '../../../layouts/footer/footer'
function HomeCompany(){
    const [userList, setUserList] = useState()
    useEffect(() => {
        getSearchInformation();
    }, []);
    const getSearchInformation = async () => {
        
        await axios.get(`https://localhost:5001/api/Users/GetAllUser`).then(
            res => {
                console.log(res.data.resultObj)
                setUserList(res.data.resultObj)
            }
        );

    };
    
    return (
        <>
        <NavbarCompany/>
        <div className={styles.container}>
            <h1>Nhà tuyển dụng</h1>
            <div className={styles.banner}>
                <img src={banner} className={styles.banner_image}/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h3>Các ứng viên gợi ý</h3>
                </div>

                <p>{userList ? userList.length : 0} ứng viên</p>
                <div className={styles.recruitment_list}>
                    {userList ? userList.map((user) => (
                        <Link to={'/user/profile/information/' + user.id} key={user.id}>
                            <div className={styles.recruitment_item}>
                                <div className={styles.item_image}>
                                    <img src={'https://localhost:5001/avatars/' + user.avatarPath}
                                        className={styles.image} />
                                </div>
                                <div className={styles.item_content}>
                                    <div className={styles.title}>
                                        <h2>{user.name}</h2>
                                    </div>
                                    <div className={styles.branch}>
                                       {user.address}

                                    </div>
                                    <div className={styles.salary}>
                                        {user.academicLevel} 
                                    </div>
                                </div>
                                
                            </div>
                        </Link>
                    )) : ''}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default HomeCompany
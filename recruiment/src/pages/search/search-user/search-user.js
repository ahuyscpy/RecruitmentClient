import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';

import styles from './search-user.module.scss'
import NavbarCompany from '../../../layouts/navbar/navbar-company';
import NavbarAdmin from '../../../layouts/navbar/navbar-admin';
import Navbar from '../../../layouts/navbar/navbar';
import Footer from '../../../layouts/footer/footer';
import NavbarUser from '../../../layouts/navbar/navbar-user';

function SearchUser(){
    const { Option } = Select;
    const user = JSON.parse(localStorage.getItem('user'))
    // const user = {
    //     // id: 'f7b8188c-2807-456f-678d-08da19f68e9f',
    //     // role: 'user'

    //     id: '0E0A6662-29FA-4178-F932-08DA19F23EE9',
    //     role: 'company'
    // }
    const [userList, setUserList] = useState()
    const [userSearchList, setUserSearchList] = useState()
    useEffect(() => {
        getSearchInformation();
    }, []);
    const getSearchInformation = async () => {
        
        await axios.get(`https://localhost:5001/api/Users/GetAllUser`).then(
            res => {
                console.log(res.data.resultObj)
                setUserList(res.data.resultObj)
                setUserSearchList(res.data.resultObj)
            }
        );

    };
    function handleSearch(keyword) {
        if (keyword) {
            const newData = userSearchList.filter(function (item) {
              const user = item.name ? item.name.toUpperCase() : "".toUpperCase() ;
              const textData = keyword.toUpperCase();
              return user.indexOf(textData) > -1;
            });
            setUserList(newData)
          } else {
            setUserList(userSearchList);
          }
    }
    return(
        <>
            {user?.role == 'company' ? <NavbarCompany /> :user?.role == 'user'? <NavbarUser /> : <Navbar/>}
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h3>Kết quả tìm kiếm ứng viên</h3>
                    <div className={styles.search}>
                        <Input placeholder='Nhập tên ứng viên để tìm kiếm' className={styles.Input}
                        onChange={e => handleSearch(e.target.value)}/>
                    </div>
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
            <Footer/>
        </>
    )
}

export default SearchUser
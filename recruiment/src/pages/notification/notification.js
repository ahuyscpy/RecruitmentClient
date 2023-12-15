import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';
import styles from './notification.module.scss'

import NavbarCompany from '../../layouts/navbar/navbar-company';
import NavbarAdmin from '../../layouts/navbar/navbar-admin';
import NavbarUser from '../../layouts/navbar/navbar-user';
import Navbar from '../../layouts/navbar/navbar';
import Footer from '../../layouts/footer/footer';
function Notification() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [notificationList, setNotificationList] = useState()
    useEffect(() => {
        getNotification();
    }, []);
    const getNotification = async () => {

        await axios.get(`https://localhost:5001/api/Companies/GetAllNotify?id=${user.id}`).then(
            res => {
                console.log(res.data.resultObj)
                setNotificationList(res.data.resultObj)

            }
        );

    };
    function timeCaculate(datetime) {
        var oneHour = 60 * 60 * 1000
        var oneDate = 60 * 60 * 1000 * 24
        var dateCreated = new Date(datetime);
        var currentDate = new Date();
        if (currentDate - dateCreated < oneHour) {
            var minuteCurent = currentDate.getMinutes()
            var minuteCreated = dateCreated.getMinutes()
            if (minuteCurent < minuteCreated) {
                minuteCurent += 60;
                return minuteCurent - minuteCreated + ' phút trước'
            }
            else {
                if (minuteCreated - minuteCurent <= 1) {
                    return 'vừa xong'
                }
                else {
                    return minuteCreated - minuteCurent + ' phút trước'
                }

            }
        }
        else if (currentDate - dateCreated < oneDate) {
            var hourCurent = currentDate.getHours()
            var hourCreated = dateCreated.getHours()
            if (hourCurent < hourCreated) {
                hourCurent += 24
                return hourCurent - hourCreated + ' giờ trước'
            }
            else {
                return hourCurent - hourCreated + ' giờ trước'
            }
        }
        else {
            var dayCurent = currentDate.getDate()
            var dayCreated = dateCreated.getDate()
            var preMonth = currentDate.getMonth() - 1;
            if (dayCurent < dayCreated) {
                if (preMonth == 1
                    || preMonth == 3
                    || preMonth == 5
                    || preMonth == 7
                    || preMonth == 8
                    || preMonth == 10
                    || preMonth == 12
                ) {
                    dayCurent += 31
                }
                else if (preMonth == 2) {
                    dayCurent += 28;
                }
                else {
                    dayCurent += 30
                }
                return dayCurent - dayCreated + ' ngày trước'
            }
            else {
                return dayCurent - dayCreated + ' ngày trước'
            }
        }
    }
    return (
        <>
            {user.role == 'company' ? 
            <NavbarCompany /> : user.role == "user"? 
            <NavbarUser/> :user.role == "admin"? 
            <NavbarAdmin/> : <Navbar/> }
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h1>Thông báo</h1>
                    {notificationList ? notificationList.map((notify) => (
                        <div className={styles.item_notify} key={notify.id}>
                            <p>{notify.content}</p>
                            <span className={styles.time}>{timeCaculate(notify.dateCreated)}</span>
                        </div>
                    )) : ''}


                </div>
            </div>
            <Footer/>
        </>


    )
}

export default Notification
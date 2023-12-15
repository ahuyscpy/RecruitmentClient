import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';
import { MdDateRange, MdDelete } from "react-icons/md";

import NavbarUser from "../../../layouts/navbar/navbar-user";
import Footer from "../../../layouts/footer/footer";
import styles from './home-user.module.scss'
import banner from '../../../assets/images/homebanner.jpg'
function HomeUser(){
    const [listRecruitments, setListRecruitments] = useState()

    useEffect(() => {
        getSearchInformation();
    }, []);
    const getSearchInformation = async () => {
        
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
            }
        );

    };

    function tranferPrice(data) {
        if (data) {
            data = data.toString();
            var cut;
            for (var i = data.length - 3; i > 0; i -= 3) {
                cut = data.slice(i, data.length);
                data = data.slice(0, i);
                data = data.concat('.')
                data = data.concat(cut)
            }
            return data
        } else {
            return 'undefined'
        }

    }
    function timeCaculate(datetime) {
        var oneHour = 60 * 60 * 1000
        var oneDate = 60 * 60 * 1000 * 24
        var dateCreated = new Date(datetime);
        var currentDate = new Date();
        if ( currentDate-dateCreated  < oneHour) {
            var minuteCurent = currentDate.getMinutes()
            var minuteCreated = dateCreated.getMinutes()
            if (  minuteCurent<minuteCreated ) {
                minuteCurent += 60;
                return minuteCurent   -minuteCreated  + ' phút trước'
            }
            else {
                if ( minuteCreated - minuteCurent <= 1) {
                    return 'vừa xong'
                }
                else {
                    return minuteCreated  - minuteCurent + ' phút trước'
                }

            }
        }
        else if (currentDate - dateCreated < oneDate) {
            var hourCurent = currentDate.getHours()
            var hourCreated = dateCreated.getHours()
            if (  hourCurent<hourCreated ) {
                hourCurent += 24
                return   hourCurent  -hourCreated + ' giờ trước'
            }
            else {
                return  hourCurent - hourCreated + ' giờ trước'
            }
        }
        else {
            var dayCurent = currentDate.getDate()
            var dayCreated = dateCreated.getDate()
            var preMonth = currentDate.getMonth() -1;
            if (  dayCurent<dayCreated ) {
                if (preMonth == 1 
                    ||preMonth == 3
                    ||preMonth == 5
                    ||preMonth == 7
                    ||preMonth == 8
                    ||preMonth == 10
                    ||preMonth == 12
                    ){
                        dayCurent += 31
                    }
                    else if (preMonth == 2){
                        dayCurent +=28;
                    }
                    else{
                        dayCurent += 30
                    }
                return   dayCurent  -dayCreated + ' ngày trước'
            }
            else {
                return  dayCurent - dayCreated + ' ngày trước'
            }
        }
    }
    return (
        <>
            <NavbarUser/>
            <div className={styles.wrapper}>
                    <div className={styles.banner}>
                        <img src={banner} className={styles.banner_image}></img>
                    </div>
                    <h1>Việc làm gợi ý</h1>
                    <div className={styles.recruitment_list}>
                    {listRecruitments ? listRecruitments.map((recruitment) => (
                        <Link to={'/recruitment/detail/' + recruitment.id} key={recruitment.id}>
                            <div className={styles.recruitment_item}>
                                <div className={styles.item_image}>
                                    <img src={'https://localhost:5001/avatars/' +recruitment.avatarPath}
                                        className={ styles.image} />
                                </div>
                                <div className={styles.item_content}>
                                    <div className={styles.title}>
                                        <h2>{recruitment.name}</h2>
                                        <div className={styles.date}>
                                            <MdDateRange className={styles.date_icon} />
                                            {timeCaculate(recruitment.dateCreated)}
                                        </div>
                                    </div>
                                    <div className={styles.company}>
                                        {recruitment.companyName}
                                    </div>
                                    <div className={styles.branch}>
                                        {recruitment.branches.map((city, index) => (
                                                    index == 0 ? city : ', ' + city
                                                ))}
                                       
                                    </div>
                                    <div className={styles.salary}>
                                        {tranferPrice(recruitment.salary)} VND
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

export default HomeUser
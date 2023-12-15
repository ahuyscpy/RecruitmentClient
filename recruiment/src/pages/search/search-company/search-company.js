import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';

import styles from './search-company.module.scss'
import NavbarAdmin from '../../../layouts/navbar/navbar-admin';
import NavbarCompany from '../../../layouts/navbar/navbar-company';
import NavbarUser from '../../../layouts/navbar/navbar-user';
import Navbar from '../../../layouts/navbar/navbar';
import Footer from '../../../layouts/footer/footer';
function SearchCompany() {
    const user = JSON.parse(localStorage.getItem('user'))

    const [companyList, setCompanyList] = useState()
    const [companySearchList, setCompanySearchList] = useState()

    useEffect(() => {
        getSearchInformation();
    }, []);
    const getSearchInformation = async () => {

        await axios.get(`https://localhost:5001/api/Companies/GetAllCompany`).then(
            res => {
                console.log(res.data.resultObj)
                setCompanyList(res.data.resultObj)
                setCompanySearchList(res.data.resultObj)
            }
        );

    };
    function handleSearch(keyword) {
        if (keyword) {
            const newData = companySearchList.filter(function (item) {
              const company = item.name ? item.name.toUpperCase() : "".toUpperCase() ;
              const textData = keyword.toUpperCase();
              return company.indexOf(textData) > -1;
            });
            setCompanyList(newData)
          } else {
            setCompanyList(companySearchList);
          }
    }
    return (
        <>
            {user?.role == 'company' ? 
            <NavbarCompany /> : user?.role == "user"? 
            <NavbarUser/> :user?.role == "admin"? 
            <NavbarAdmin/> : <Navbar/> }

            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h3>Kết quả tìm kiếm công ty</h3>
                    <div className={styles.search}>
                        <Input placeholder='Nhập tên công ty để tìm kiếm' className={styles.Input}
                        onChange={e => handleSearch(e.target.value)}/>
                    </div>
                </div>

                <p>{companyList ? companyList.length : 0} công ty</p>
                <div className={styles.recruitment_list}>
                    {companyList ? companyList.map((company) => (
                        <Link to={'/company/profile/' + company.id} key={company.id}>
                            <div className={styles.recruitment_item}>
                                <div className={styles.item_image}>
                                    <img src={'https://localhost:5001/avatars/' + company.avatarPath}
                                        className={styles.image} />
                                </div>
                                <div className={styles.item_content}>
                                    <div className={styles.title}>
                                        <h2>{company.name}</h2>
                                    </div>
                                    <div className={styles.company}>
                                        {company.countRecruitment} việc đang tuyển
                                    </div>
                                    <div className={styles.branch}>
                                        {company.branches.length ? company.branches.map((branch, index) => (
                                            index == 0 ? branch.city : ', ' + branch.city
                                        )) : 'Không có chi nhánh'}

                                    </div>
                                    <div className={styles.salary}>
                                        {company.workerNumber} Nhân viên
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

export default SearchCompany
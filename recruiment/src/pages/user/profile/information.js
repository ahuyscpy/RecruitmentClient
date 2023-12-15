import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal } from 'antd';

import styles from './information.module.scss'
import { MdModeEditOutline } from "react-icons/md";
function Information() {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false)
    const [userInformation, setUserInformation] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [age, setAge] = useState()
    const [sex, setSex] = useState()
    const [address, setAddress] = useState()
    const [academicLevel, setAcademicLevel] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const inputFile = useRef(null) 
    useEffect(() => {
        getUserInformation();
    }, []);

    const getUserInformation = async () => {
        await axios.get(`https://localhost:5001/api/Users/GetUserInformation?userId=${id}`).then(
            res => {
                if (res.data.isSuccessed) {
                    setUserInformation(res.data.resultObj)
                    setFirstName(res.data.resultObj.firstName)
                    setLastName(res.data.resultObj.lastName)
                    setAge(res.data.resultObj.age)
                    setSex(res.data.resultObj.sex)
                    setAddress(res.data.resultObj.address)
                    setAcademicLevel(res.data.resultObj.academicLevel)
                    setEmail(res.data.resultObj.email)
                    setPhoneNumber(res.data.resultObj.phoneNumber)
                }
            }
        );
    };
    function renderSex(number) {
        if (number == 1) {
            return 'Nam'
        }
        else if (number == 2) {
            return 'Nữ'
        }
        else {
            return 'Khác'
        }
    }

    function handleChange() {
        setIsUpdate(true)
    }
    const handleSave = async () => {
        if (firstName == userInformation.firstName 
            && lastName == userInformation.lastName
            && age == userInformation.age
            && sex == userInformation.sex
            && academicLevel == userInformation.academicLevel
            && address == userInformation.address
            && email == userInformation.email
            && phoneNumber == userInformation.phoneNumber){
                message.error("vui lòng thay đổi ít nhất 1 dữ liệu")
            }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            message.error("vui lòng nhập email hợp lệ")
        }
        else{
            const userId = userInformation.userId
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/Users/UpdateUserInformation`,
                { userId, firstName,lastName,age:parseInt(age) ,sex: parseInt(sex), address, academicLevel, email,phoneNumber},
                config
            );
            if (data.isSuccessed) {
                message.success('cập nhật thành công')
                getUserInformation();
                setIsUpdate(false)
            }
            else {
                message.error(data.message)
            }
        }
        
    }
    function handleCancel() {
        setIsUpdate(false)
        setFirstName(userInformation.firstName)
        setLastName(userInformation.lastName)
        setAge(userInformation.age)
        setSex(userInformation.sex)
        setAddress(userInformation.address)
        setAcademicLevel(userInformation.academicLevel)
        setEmail(userInformation.email)
        setPhoneNumber(userInformation.phoneNumber)
    }

    const openFolder = () => {
        inputFile.current.click()
    }
    const editAvatar = async (event) => {
        const file = event.target.files[0]
        var bodyFormData = new FormData();
        bodyFormData.append('thumnailImage', file); 
        bodyFormData.append('id', userInformation.userAvatar.id); 
        
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const {data} = await axios.put(
        	`https://localhost:5001/api/Users/UpdateUserAvatar`,
        	bodyFormData,
        	config
        );
        if (data.isSuccessed){
            message.success('Thay đổi ảnh bìa thành công')
            getUserInformation()
            navigate('/user/profile')
        }
        else{
            message.error(data.message)
        }
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.catalog}>
                        <h3>Tài khoản</h3>
                        <p>Hãy cập nhật chính xác thông tin về tài khoản của bạn.</p>
                    </div>
                    <div className={styles.avatar}>
                        <img src={userInformation ? 'https://localhost:5001/avatars/' + userInformation.userAvatar.imagePath : ''}
                            className={styles.image} />
                            
                        <MdModeEditOutline className={styles.icon} onClick={openFolder}/>
                        <input 
                            type="file"
                            id="avatar" name="avatar"
                            accept="image/png, image/jpeg" 
                            onChange={editAvatar}
                            ref={inputFile}
                            style={{display: "none"}}
                            />
                    </div>
                    
                </div>
                <div className={styles.body}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <div className={styles.title}>Họ</div>
                            {!isUpdate ? <div className={styles.content}>
                                {firstName}
                            </div>
                                :
                                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            }


                        </li>
                        <li className={styles.item}>
                            <div className={styles.title}>Tên</div>
                            {!isUpdate ? <div className={styles.content}>
                                {lastName}
                            </div>
                                :
                                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            }


                        </li>
                        <li className={styles.item}>
                            <div className={styles.title}>Tuổi</div>
                            {!isUpdate ? <div className={styles.content}>{age}</div>
                                :
                                <Input value={age} onChange={(e) => setAge(e.target.value)} />
                            }

                        </li>
                        <li className={styles.item}>
                            <div className={styles.title}>Email</div>
                            {!isUpdate ? <div className={styles.content}>{email}</div>
                                :
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                            }

                        </li>
                        <li className={styles.item}>
                            <div className={styles.title}>Giới tính</div>

                            {!isUpdate ? <div className={styles.content}>{renderSex(sex)}</div>
                                :
                                <select className={styles.select} onChange={(e) => setSex(parseInt(e.target.value))}>
                                    <option value='1'>Nam</option>
                                    <option value='2'>Nữ</option>
                                    <option value='3'>Khác</option>
                                </select>
                            }

                        </li>
                        <li className={styles.item}>
                            <div className={styles.title}>Số điện thoại</div>

                            {!isUpdate ? <div className={styles.content}>{phoneNumber}</div>
                                :
                                <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            }

                        </li>
                        <li className={styles.item}>
                            <div className={styles.title}>Địa chỉ</div>

                            {!isUpdate ? <div className={styles.content}>{address}</div>
                                :
                                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                            }

                        </li>
                        <li className={styles.item}>
                            <div className={styles.title}>Trình độ học vấn</div>

                            {!isUpdate ? <div className={styles.content}>{academicLevel}</div>
                                :
                                <Input value={academicLevel} onChange={(e) => setAcademicLevel(e.target.value)} className={styles.input} />
                            }

                        </li>
                    </ul>
                   
                    {user?.role == 'user' ? !isUpdate ? <Button type='primary' className={styles.change} onClick={handleChange}>Thay đổi</Button>
                        : <Button type='primary' className={styles.save} onClick={handleSave}>Lưu</Button>
                    : ''}
                    {user?.role == 'user' && isUpdate ? <Button type='none' className={styles.cancel} onClick={handleCancel}>Hủy</Button> : ''}
                </div>
            </div>
        </>
    )
}

export default Information
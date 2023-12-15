import styles from './login.module.scss'
import { FaUserAlt } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
function Login() {
   
    const {setUser } = useContext(UserContext);
    let navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        userName: '',
        password: '',
        rememberMe: true
    })
    function handleOnChange(e) {
        if (e.target) {
            setFormValue({
                ...formValue, [e.target.name]: e.target.value
            })
        }
        else {
            setFormValue(...formValue)
        }
    }
    const  submit = async() => {
        console.log(formValue)
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Accounts/Authenticate`,
            { userName: formValue.userName, password: formValue.password, rememberMe: true },
            config
        );
        if (data.isSuccessed) {
            let dt = JSON.stringify(data.resultObj);
            localStorage.setItem('user', dt)
            setUser(data.resultObj)
            console.log(dt)
            if (data.resultObj.role == 'user'){
                setTimeout(() => {
                    navigate('/user')

                }, 1000);
            }
            else if (data.resultObj.role == "company"){
                setTimeout(() => {
                navigate('/company')
                    
                }, 1000);
            }
            else{
                setTimeout(() => {
                navigate('/career')
                    
                }, 1000);
            }
        }
        else {
            message.error(data.message)
        }
    }
    return (
        <div className={styles.cover}>
            <div className={styles.wrapper}>
                <div className={styles.login}>
                    <p className={styles.title}>Đăng nhập</p>
                    <input type="text"
                        placeholder="Tài khoản"

                        name='userName'
                        onChange={(e) => { handleOnChange(e) }} />

                    <FaUserAlt className={styles.iconUser} />
                    <input type="password" placeholder="Mật khẩu"
                        name='password'
                        onChange={(e) => { handleOnChange(e) }} />
                    <IoKey className={styles.iconUser} />
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                    <button onClick={() => submit()}>
                        <i class="spinner"></i>
                        <span className={styles.state}>Đăng nhập</span>
                    </button>
                </div>
                <footer>bạn không có tài khoản? Đăng ký <Link to='/register-user'>user</Link > or <Link to='/register-company'>company</Link> tại đây</footer>

            </div >
        </div>
    )
}

export default Login
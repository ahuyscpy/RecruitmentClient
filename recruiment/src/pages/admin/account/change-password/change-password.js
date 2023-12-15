import { useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import NavbarAdmin from "../../../../layouts/navbar/navbar-admin";
import styles from './change-password.module.scss'


function ChangePassword() {
    
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { id } = useParams();
    function validateMessage(value) {
        console.log(value)
        var letter = document.getElementById("letter");
        var capital = document.getElementById("capital");
        var number = document.getElementById("number");
        var length = document.getElementById("length");
        var special = document.getElementById("special");
        var lowerCaseLetters = /[a-z]/g;
        if (value.match(lowerCaseLetters)) {
            letter.classList.remove(styles["invalid"]);
            letter.classList.add(styles["valid"]);
        } else {
            letter.classList.remove(styles["valid"]);
            letter.classList.add(styles["invalid"]);
        }

        var upperCaseLetters = /[A-Z]/g;
        if (value.match(upperCaseLetters)) {
            capital.classList.remove(styles["invalid"]);
            capital.classList.add(styles["valid"]);
        } else {
            capital.classList.remove(styles["valid"]);
            capital.classList.add(styles["invalid"]);
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (value.match(numbers)) {
            number.classList.remove(styles["invalid"]);
            number.classList.add(styles["valid"]);
        } else {
            number.classList.remove(styles["valid"]);
            number.classList.add(styles["invalid"]);
        }

        // Validate length
        if (value.length >= 8) {
            length.classList.remove(styles["invalid"]);
            length.classList.add(styles["valid"]);
        } else {
            length.classList.remove(styles["valid"]);
            length.classList.add(styles["invalid"]);
        }
        var speaials = /[!@#$%^&*(),.?":{}|<>]/g;
        if (value.match(speaials)) {
            special.classList.remove(styles["invalid"]);
            special.classList.add(styles["valid"]);
        } else {
            special.classList.remove(styles["valid"]);
            special.classList.add(styles["invalid"]);
        }
    }
    const onFinish = (values) => {
        const { newPassword } = values;
        changePassword(id, newPassword);
    };


    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };

    const changePassword = async (id, newPassword) => {

        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(
            `https://localhost:5001/api/accounts/changePassword`,
            { id, newPassword },
            config
        );
        console.log(data)
        if (data.isSuccessed) {
            message.success('Đổi mật khẩu thành công')
            navigate('/account');
        }
        else {
            message.error(data.message)
        }
    };

    function showErr() {
        document.getElementById("error").style.display = "block";
    }
    function hideErr() {
        document.getElementById("error").style.display = "none";

    }

    return (
        <>
            <NavbarAdmin />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Đổi mật khẩu</h1>
                <Form
                    name='basic'
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'

                >
                    <Form.Item
                        label='Mật khẩu mới'
                        name='newPassword'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        style={{ width: "1000px", }}>
                        <Input.Password
                            onFocus={() => showErr()}
                            onBlur={() => hideErr()}
                            onChange={(e) => validateMessage(e.target.value)}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                            title="Mật khẩu phải thõa mãn những điều kiện bên dưới"
                            placeholder='Nhập mật khẩu mới'
                        />

                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Thay đổi
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.message} id="error">
                    <h3>Mật khẩu phải thõa mãn những điều kiện sau:</h3>
                    <p className={clsx(styles.letter, styles.invalid)} id="letter">Chứa ít nhất một <b>chữ thường</b></p>
                    <p className={clsx(styles.capital, styles.invalid)} id="capital">Chứa ít nhất một <b>chữ hoa</b></p>
                    <p className={clsx(styles.number, styles.invalid)} id="number" >Chứa ít nhất một <b>số</b></p>
                    <p className={clsx(styles.length, styles.invalid)} id="length">Chứa ít nhất <b>8 ký tự</b></p>
                    <p className={clsx(styles.length, styles.invalid)} id="special">Chứa ít nhất một <b>ký tự đặc biệt</b></p>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
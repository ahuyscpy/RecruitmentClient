import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, InputNumber, Select } from 'antd';
import styles from './register-user.module.scss'

function RegisterUser() {
    const { TextArea } = Input;
    const { Option } = Select;
    const onFinish = async (values) => {
        console.log(values)
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;
        var specials = /[!@#$%^&*(),.?":{}|<>]/g;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
            message.error("vui lòng nhập email hợp lệ")
        }
        else if (values.userName.length < 4) {
            message.error("Tài khoản phải chứa ít nhất 4 ký tự")

        }
        else if (values.password != values.confirmPassword) {
            message.error("Xác nhận mật khẩu không chính xác")
        }
        else if (!values.password.match(lowerCaseLetters)) {
            message.error("Mật khẩu phải chứa ít nhất một chữ cái thường")
        }

        else if (!values.password.match(upperCaseLetters)) {
            message.error("Mật khẩu phải chứa ít nhất một chữ cái in hoa")
        }

        else if (!values.password.match(numbers)) {
            message.error("Mật khẩu phải chứa ít nhất một chữ số")
        }
        else if (values.password.length < 8) {
            message.error("Mật khẩu phải chứa ít nhất 8 ký tự")
        }

        else if (!values.password.match(specials)) {
            message.error("Mật khẩu phải chứa ít nhất một ký tự đặc biệt")
        }
        else {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post(
                `https://localhost:5001/api/Accounts/RegisterUser`,
                {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    age: values.age,
                    academicLevel: values.academicLevel,
                    sex: values.sex,
                    email: values.email,
                    address: values.address,
                    phoneNumber: values.phoneNumber,
                    userName: values.userName,
                    password: values.password,
                    confirmPassword: values.confirmPassword
                },
                config
            );
            if (data.isSuccessed) {
                message.success('tạo mới thành công')
                // nếu có admin đăng nhập thì navigate tới admin còn ko thì navigate về login
            }
            else {
                message.error(data.message)

            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };
    return (
        <>
            <div className={styles.cover}>
                <div className={styles.purdah}>
                    <div className={styles.wrapper}>
                        <h2>Đăng ký cho người dùng</h2>

                        <Form
                            name='basic'
                            layout='vertical'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete='off'

                        >
                            <Form.Item
                                label='Họ'
                                name='firstName'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input
                                    placeholder='Họ'
                                />

                            </Form.Item>
                            <Form.Item
                                label='tên'
                                name='lastName'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input
                                    placeholder='Tên'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Tuổi'
                                name='age'
                                rules={[{ required: true, message: 'Vui lòng không nhập chữ vào trường này' }]}>

                                <InputNumber min={0} defaultValue={0} placeholder='Tuổi' />

                            </Form.Item>

                            <Form.Item
                                label='Giới tính'
                                name='sex'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Select style={{ width: "100%" }}>
                                    <Option value={1}>Nam</Option>
                                    <Option value={2}>Nữ</Option>
                                    <Option value={3}>Khác</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label='Địa chỉ'
                                name='address'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input
                                    placeholder='Địa chỉ'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Trình độ học vấn'
                                name='academicLevel'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input
                                    placeholder='Trình độ học vấn'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input
                                    placeholder='Email'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Số điện thoại'
                                name='phoneNumber'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input
                                    placeholder='số điện thoại'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Tài khoản'
                                name='userName'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input
                                    placeholder='Tài khoản'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Mật khẩu'
                                name='password'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input.Password
                                    placeholder='Mật khẩu'
                                />

                            </Form.Item>
                            <Form.Item
                                label='Nhập lại mật khẩu'
                                name='confirmPassword'
                                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                                <Input.Password
                                    placeholder='Nhập lại mật khẩu'
                                />

                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 10, span: 24 }}>
                                <Button type='primary' htmlType='submit'>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                        <div>Bạn đã có tài khoản? <Link to='/login'>Đăng nhập</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterUser
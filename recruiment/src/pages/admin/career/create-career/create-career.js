import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavbarAdmin from "../../../../layouts/navbar/navbar-admin";
import styles from './create-career.module.scss'


function CreateCareer() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        const { name } = values;
        Submit(name);
    };

    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };
    const Submit = async (name) => {
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(
            `https://localhost:5001/api/Admins/CreateCareer`,
            { name },
            config,
        );
        if (data.isSuccessed){
            message.success('Tạo mới công việc thành công')
            navigate('/career');
        }
        else{
            message.error(data.message)
        }
        
    };
    return (
        <>
            <NavbarAdmin />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Tạo việc làm mới</h1>

                
                <Form
                    name='basic'
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                 
                    >
                    
                    <Form.Item
                        label='Tên'
                        name='name'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        style={{width: "1000px", }}>
                        <Input placeholder='Nhập tên công việc'/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default CreateCareer
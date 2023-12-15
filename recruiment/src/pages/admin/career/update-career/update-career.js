import { useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavbarAdmin from "../../../../layouts/navbar/navbar-admin";
import styles from './update-career.module.scss'


function UpdateCareer() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    
    const { id } = useParams();
    const onFinish = (values) => {
        const { name } = values;
        updateCareer(parseInt(id), name);
        
    };
    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };
    const getCareerById = async () => {
        const res = await axios.get(
            `https://localhost:5001/api/Admins/GetCareerById?id=${id}`
        );
        
        form.setFieldsValue({
            name: res.data.resultObj.name,
        });
    };

    const updateCareer = async (id, name) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const {data} = await axios.put(
        	`https://localhost:5001/api/Admins/UpdateCareer`,
        	{ id, name },
        	config
        );
        if (data.isSuccessed){
            message.success('cập nhật công việc thành công')
            navigate('/career');
        }
        else{
            message.error(data.message)
        }
    };
    useEffect(() => {
        getCareerById();
    },[]);
    return (
        <>
            <NavbarAdmin />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Cập nhật việc làm</h1>
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
                        label='Name'
                        name='name'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        style={{ width: "1000px", }}>
                        <Input 
                            name="name" 
                            placeholder='Nhập tên công việc'
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default UpdateCareer
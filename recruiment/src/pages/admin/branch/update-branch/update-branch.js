import { useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavbarAdmin from "../../../../layouts/navbar/navbar-admin";
import styles from './update-branch.module.scss'


function UpdateBranch() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    
    const { id } = useParams();
    const onFinish = (values) => {
        const { city } = values;
        updateBranch(parseInt(id), city);
        
    };
    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };
    const getBranchById = async () => {
        const res = await axios.get(
            `https://localhost:5001/api/Admins/GetBranchById?id=${id}`
        );
        
        form.setFieldsValue({
            city: res.data.resultObj.city,
        });
    };

    const updateBranch = async (id, city) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const {data} = await axios.put(
        	`https://localhost:5001/api/Admins/UpdateBranch`,
        	{ id, city },
        	config
        );
        if (data.isSuccessed){
            message.success('cập nhật thành công')
            navigate('/branch');
        }
        else{
            message.error(data.message)
        }
    };
    useEffect(() => {
        getBranchById();
    },[]);
    return (
        <>
            <NavbarAdmin />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Cập nhật tỉnh thành</h1>
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
                        label='Thành phố'
                        name='city'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        style={{ width: "1000px", }}>
                        <Input 
                            name="city" 
                            placeholder='Nhập tên tỉnh thành'
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

export default UpdateBranch
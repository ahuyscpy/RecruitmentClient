import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavbarAdmin from "../../../../layouts/navbar/navbar-admin";
import styles from './create-branch.module.scss'


function CreateBranch() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        const { city } = values;
        Submit(city);
    };

    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };
    const Submit = async (city) => {
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(
            `https://localhost:5001/api/Admins/CreateBranch`,
            { city },
            config,
        );
        if (data.isSuccessed){
            message.success('Tạo thành công tỉnh thành mới')
            navigate('/branch');
        }
        else{
            message.error(data.message)
        }
        
    };
    return (
        <>
            <NavbarAdmin />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Tạo tỉnh thành mới</h1>

                
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
                        label='Thành phố'
                        name='city'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        style={{width: "1000px", }}>
                        <Input placeholder='Nhập tên tỉnh thành'/>
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

export default CreateBranch
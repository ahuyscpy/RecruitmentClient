import React from 'react';
import { Form, Input, Button, message, Select,DatePicker, InputNumber } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import NavbarCompany from "../../../layouts/navbar/navbar-company";
import styles from './create-recruitment.module.scss'

function CreateRecruitment(){
    const {TextArea} = Input
    const { Option } = Select;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    // const user = {
    //     id: '0e0a6662-29fa-4178-f932-08da19f23ee9',
    //     role: 'company'
    // }
    const user = JSON.parse(localStorage.getItem('user'))


    const onFinish = (values) => {
        Submit(values)
    };

    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };
    const Submit = async (values) => {
        console.log(values)
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/CreateNewRecruiment`,
            { 
                name: values.name,
                rank: values.rank,
                experience: values.experience,
                detailedExperience: lineUp(values.detailedExperience),
                benefits: lineUp(values.benefit),
                salary: values.salary,
                education: values.education,
                type: values.type,
                description: lineUp(values.description),
                expirationDate: new Date(values.expirationDate._d).toISOString(),
                dateCreated: new Date().toISOString(),
                companyId: user.id
            },
            config,
        );
        if (data.isSuccessed){
            message.success('Tạo thành mới')
            navigate('/recruitment');
        }
        else{
            message.error(data.message)
        }
        
    };

    const lineUp = (string) => {
        string = string.replace('\n\n', '\n')
        var result = '';
        var newString = string.split('\n')
        for (var i = 0; i < newString.length; i++) {
            result = result + '||' + newString[i]
        }
        return result


    }


    const ranks = [
        {
            id: 1,
            name: 'Thực tập'
        },
        {
            id: 2,
            name: 'Mới đi làm'
        },
        {
            id: 1,
            name: 'Nhân viên'
        },
        {
            id: 1,
            name: 'Trưởng phòng / Quản lý'
        },
        {
            id: 1,
            name: 'Giám đốc'
        }
        
    ]
    
    const experiences = [
        {
            id: 1,
            name: 'Dưới 1 năm'
        },
        {
            id: 2,
            name: '1 - 2 năm'
        },
        {
            id: 3,
            name: '2 - 5 năm'
        },
        {
            id: 4,
            name: '5 - 10 năm'
        },
        {
            id: 5,
            name: 'Trên 10 năm'
        }

    ]
      
    const educations = [
        {
            id:1,
            name: 'Trung học phổ thông'
        },
        {
            id:2,
            name: 'Trung cấp'
        },
        {
            id:3,
            name: 'Cao đẳng / Đại học'
        },
        {
            id:4,
            name: 'Thạc sĩ'
        },
        {
            id:5,
            name: 'Tiến sĩ'
        }
    ]
    const types = [
        {
            id: 1,
            name: 'Toàn thời gian'
        },
        {
            id: 2,
            name: 'Bán thời gian'
        },
        {
            id: 3,
            name: 'Thời vụ'
        }
    ]
    return (
        <>
        <NavbarCompany />
        <div className={styles.wrapper}>
                <h1 className={styles.title}>Tạo bài tuyển dụng mới</h1>

                
                <Form
                    name='basic'
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                    form={form}
                    >
                    
                    <Form.Item
                        label='Tên'
                        name='name'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        >
                        <Input placeholder='Tên'/>
                    </Form.Item>
                    <Form.Item
                        label='Mô tả'
                        name='description'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        >
                        <TextArea autoSize placeholder='Mô tả'/>
                    </Form.Item>
                    <Form.Item
                        label='Quyền lợi được hưởng'
                        name='benefit'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        >
                        <TextArea autoSize placeholder='Quyền lợi'/>
                    </Form.Item>
                    <Form.Item
                        label='Yêu cầu kinh nghiệm'
                        name='experience'
                        rules={[{ required: true, message: 'Vui lòng chọn trường này' }]}
                        >
                        <Select placeholder='Yêu cầu kinh nghiệm'>
                            {experiences.map((experience,index) =>
                            (
                                <Option key={index} value={experience.name}>{experience.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Kinh nghiệm chi tiết'
                        name='detailedExperience'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        >
                        <TextArea autoSize placeholder='Kinh nghiệm chi tiết'/>
                    </Form.Item>
                    <Form.Item
                        label='Yêu cầu cấp bậc'
                        name='rank'
                        rules={[{ required: true, message: 'Vui lòng chọn trường này' }]}
                        >
                        <Select placeholder='Yêu cầu cấp bậc'>
                            {ranks.map((rank,index) =>
                            (
                                <Option key={index} value={rank.name}>{rank.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Lương'
                        name='salary'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        >
                        <InputNumber max={2147483647} placeholder='Lương' style={{width:'200px'}}/>
                    </Form.Item>
                    <Form.Item
                        label='Yêu cầu học vấn'
                        name='education'
                        rules={[{ required: true, message: 'Vui lòng chọn trường này' }]}
                        >
                        <Select placeholder='Yêu cầu học vấn'>
                            {educations.map((education,index) =>
                            (
                                <Option key={index} value={education.name}>{education.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Loại công việc'
                        name='type'
                        rules={[{ required: true, message: 'Vui lòng chọn trường này' }]}
                        >
                        <Select placeholder='Loại công việc'>
                            {types.map((type,index) =>
                            (
                                <Option key={index} value={type.name}>{type.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Ngày hết hạn'
                        name='expirationDate'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                        >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Button 
                            type='primary' 
                            htmlType='submit'>
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{height: '30px'}}>
            </div>
        </>
    )
}

export default CreateRecruitment
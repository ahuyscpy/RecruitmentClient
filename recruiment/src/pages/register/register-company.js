import styles from "./register-company.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Input, Button, message, Modal, InputNumber, Image } from "antd";
import Company from "../../assets/images/company.png";

function RegisterCompany() {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const onFinish = async (values) => {
    console.log(values);
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var specials = /[!@#$%^&*(),.?":{}|<>]/g;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      message.error("vui lòng nhập email hợp lệ");
    } else if (values.userName.length < 4) {
      message.error("Tài khoản phải chứa ít nhất 4 ký tự");
    } else if (values.password != values.confirmPassword) {
      message.error("Xác nhận mật khẩu không chính xác");
    } else if (!values.password.match(lowerCaseLetters)) {
      message.error("Mật khẩu phải chứa ít nhất một chữ cái thường");
    } else if (!values.password.match(upperCaseLetters)) {
      message.error("Mật khẩu phải chứa ít nhất một chữ cái in hoa");
    } else if (!values.password.match(numbers)) {
      message.error("Mật khẩu phải chứa ít nhất một chữ số");
    } else if (values.password.length < 8) {
      message.error("Mật khẩu phải chứa ít nhất 8 ký tự");
    } else if (!values.password.match(specials)) {
      message.error("Mật khẩu phải chứa ít nhất một ký tự đặc biệt");
    } else {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `https://localhost:5001/api/Accounts/RegisterCompany`,
        {
          name: values.name,
          description: values.description,
          workerNumber: parseInt(values.workerNumber),
          contactName: values.contactName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          userName: values.userName,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        config
      );
      if (data.isSuccessed) {
        navigate("/login");
        message.success("tạo mới thành công");
        // nếu có admin đăng nhập thì navigate tới admin còn ko thì navigate về login
      } else {
        message.error(data.message);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };
  return (
    <>
      <div className={styles.cover}>
        <div className={styles.purdah}>
          <div className={styles.wrapper}>
            <div className="flex justify-center">
            <Image preview={false} alt="" src={Company} width={80} height={80} />
            </div>
            <h2>Đăng ký cho công ty</h2>
            <Form
              name="basic"
              layout="vertical"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
              autoComplete="off"
              className={styles.form_register}
            >
              <Form.Item
                label="Tên công ty"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này" },
                ]}
              >
                <Input placeholder="Tên công ty" size="large" />
              </Form.Item>
              <Form.Item
                label="Mô tả công ty"
                name="description"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này" },
                ]}
              >
                <TextArea rows={3} placeholder="Mô tả công ty" size="large" />
              </Form.Item>
              <Form.Item
                label="Số lượng nhân viên"
                name="workerNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không nhập chữ vào trường này",
                  },
                ]}
              >
                <InputNumber
                 size="large"
                  min={1}
                  defaultValue={1}
                  placeholder="Số lượng nhân viên"
                />
              </Form.Item>
              <Form.Item
                label="Tên liên hệ"
                name="contactName"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này" },
                ]}
              >
                <Input size="large" placeholder="Tên liên hệ" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này" },
                  {
                    type: "email",
                    message: "Vui lòng nhập đúng định dạng Email",
                  },
                ]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này" },
                ]}
              >
                <Input size="large" placeholder="số điện thoại" />
              </Form.Item>
              <Form.Item
                label="Tài khoản"
                name="userName"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này" },
                ]}
              >
                <Input size="large" placeholder="Tài khoản" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này" },
                ]}
              >
                <Input.Password
                  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                  // title="Mật khẩu phải thõa mãn những điều kiện bên dưới"
                  placeholder="Mật khẩu"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                label="Nhập lại mật khẩu"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này" },
                ]}
              >
                <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 10, span: 24 }}>
                <Button
                  onClick={RegisterCompany}
                  type="primary"
                  htmlType="submit"
                  className="!px-10"
                  size="large" 
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <div>
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterCompany;

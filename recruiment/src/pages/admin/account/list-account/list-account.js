import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavbarAdmin from "../../../../layouts/navbar/navbar-admin";
import styles from './list-account.module.scss'
import { Button, Table, Modal, message } from "antd";
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { MdChangeCircle } from "react-icons/md";


function Account() {
    const [loading, setloading] = useState(true)
    const [accountList, setAccountList] = useState();
    const [accountSearchList, setAccountSearchList] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        getAccountList();
    }, []);
    const getAccountList = async () => {
        await axios.get(`https://localhost:5001/api/accounts/getAllAccount`).then(
            res => {
                setloading(false);
                setAccountList(
                    res.data.resultObj.map((row, index) => ({
                        key: index,
                        userName: row.userName,
                        email: row.email,
                        phoneNumber: row.phoneNumber,
                        dateCreated: row.dateCreated.slice(0, 10),
                        role: row.role,
                        id: row.id,
                    }))
                );
                setAccountSearchList(
                    res.data.resultObj.map((row, index) => ({
                        key: index,
                        userName: row.userName,
                        email: row.email,
                        phoneNumber: row.phoneNumber,
                        dateCreated: row.dateCreated.slice(0, 10),
                        role: row.role,
                        id: row.id,
                    }))
                );

            }
        );
    };
    const columns = [
        {
            title: "Tài khoản",
            dataIndex: "userName",
            width: 250
        },
        {
            title: "Email",
            dataIndex: "email",
            width: 250
        },
        {
            title: "Điện thoại",
            dataIndex: "phoneNumber",
            width: 220
        },
        {
            title: "Ngày tạo",
            dataIndex: "dateCreated",
            width: 150
        },
        {
            title: "Quyền",
            dataIndex: "role",
            width: 150
        },
        {
            title: "Hành động",
            width: 250,
            render: (key) => {
                return (
                    <>
                        <MdChangeCircle
                            onClick={() => navigate(`/account/change-password/${key.id}`)}
                            style={{ fontSize: "1.3rem" }}
                        />
                        <AiTwotoneDelete
                            onClick={() => {
                                onDeleteAccount(key.id);
                            }}
                            style={{ color: "red", marginLeft: 18, fontSize: "1.2rem" }}
                        />
                    </>
                );
            }
        }
    ];
    function handleSearch(keyword) {
        if (keyword) {
            const newData = accountSearchList.filter(function (item) {
                const account = item.userName ? item.userName.toUpperCase() : "".toUpperCase();
                const textData = keyword.toUpperCase();
                return account.indexOf(textData) > -1;
            });
            setAccountList(newData)
        } else {
            setAccountList(accountSearchList);
        }
    }
    const onDeleteAccount = (id) => {
        Modal.confirm({
            title: `Bạn có chắc chắn muốn xóa tài khoản này`,
            okText: "Có",
            cancelText: "Không",
            okType: "danger",
            onOk: () => {
                handleDelete(id);
            },
        });
    };


    const handleDelete = async (id) => {
        const { data } = await axios.delete(
            `https://localhost:5001/api/Account/DeleteAccount?id=${id}`
        )
        if (data.isSuccessed) {
            message.success('Xóa thành công')

        }
        else {
            message.error(data.message)
        }
        getAccountList();
        navigate('/branch');
    }
    return (
        <>
            <NavbarAdmin />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Quản lý tài khoản</h1>
                <div className={styles.search_bar}>
                    <div>
                        <Button type='primary' size='large' onClick={() => navigate('register-admin')}>
                            tạo mới
                        </Button>
                    </div>
                    <div className={styles.search}>
                        <input type="text" placeholder="Tìm kiếm" className={styles.search_input} onChange={e => handleSearch(e.target.value)} />
                    </div>
                </div>
                <div>
                    {loading ? (
                        "Loading"
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={accountList}
                            pagination={{ pageSize: 10 }}
                            scroll={{ y: 300 }}
                        />
                    )}
                </div>
            </div>

           
        </>
    )
}

export default Account;
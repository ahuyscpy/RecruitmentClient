import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Button, Table, Modal, Select, message, DatePicker } from "antd";
import fileDownload from 'js-file-download';

import NavbarCompany from "../../../layouts/navbar/navbar-company";
import styles from './list-cv.module.scss'
import 'antd/dist/antd.css';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";

function ListCV() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const user = {
        id: '767a99b6-3eca-4942-0b7f-08da23c12f17',
        role: 'company'
    }
    const [loading, setloading] = useState(true);
    const [cvList, setCvList] = useState();
    const [cvSearchList, setCvSearchList] = useState();

    useEffect(() => {
        getCVList();
    }, []);
    const getCVList = async () => {
        await axios.get(`https://localhost:5001/api/Companies/GetAllCV?id=${id}`).then(
            res => {
                setloading(false);
                setCvList(
                    res.data.resultObj.map((row, index) => ({
                        key: index,
                        dateSubit: GetFormattedDate(row.dateSubit),
                        filePath: row.filePath,
                        recruitmentId: row.recruitmentId,
                        userId: row.userId,
                        name: row.user.firstName + " " + row.user.lastName,
                        academicLevel: row.user.academicLevel,
                        recruitment: row.recruitmentName
                    }))
                );
                setCvSearchList(
                    res.data.resultObj.map((row, index) => ({
                        key: index,
                        dateSubit: GetFormattedDate(row.dateSubit),
                        filePath: row.filePath,
                        recruitmentId: row.recruitmentId,
                        userId: row.userId,
                        name: row.user.firstName + " " + row.user.lastName,
                        academicLevel: row.user.academicLevel,
                        recruitment: row.recruitmentName
                    }))
                );
            }
        );
    };

    function handleSearch(keyword) {
        if (keyword) {
            const newData = cvSearchList.filter(function (item) {
                const name = item.name ? item.name.toUpperCase() : "".toUpperCase();
                const textData = keyword.toUpperCase();
                return name.indexOf(textData) > -1;
            });
            setCvList(newData)
        } else {
            setCvList(cvSearchList);
        }
    }
    function GetFormattedDate(datetime) {
        if (datetime) {
            var month = datetime.substring(5, 7);
            var day = datetime.substring(8, 10);
            var year = datetime.substring(0, 4);
            return day + "-" + month + "-" + year;
        }
        else {
            return 'undefined'
        }
    }
    const columns = [
        {
            title: "Tên",
            dataIndex: "recruitment",
        },
        {
            title: "Tên ứng viên",
            dataIndex: "name",
        },
        {
            title: "Trình độ học vấn",
            dataIndex: "academicLevel",
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "dateSubit",
        },
        {
            title: "Hành động",
            width: 300,
            render: (key) => {
                return (
                    <>
                        <FiDownload
                            onClick={() => {
                                onDownloadCV(key.filePath);
                            }}
                            style={{ fontSize: "1.2rem" }}
                        />
                        <AiFillCheckCircle
                            onClick={() => {
                                onAcceptCV(key.recruitmentId, key.userId);
                            }}
                            style={{ marginLeft: 18, color: "green", fontSize: "1.3rem" }}
                        />
                        <AiFillCloseCircle
                            onClick={() => {
                                onRefuseCV(key.recruitmentId, key.userId);
                            }}
                            style={{ color: "red", marginLeft: 18, fontSize: "1.2rem" }}
                        />

                    </>
                );
            }
        }
    ];

    const onDownloadCV = async (filePath) => {
        try {
            await axios.get(`https://localhost:5001/api/Companies/DownloadCV?fileName=${filePath}`).then(
                res => {
                    fileDownload(res.data, 'fileDownload.zip');
                }
            );
        }
        catch (error) {
            console.log('Failed to fetch department list', error.message);
        }
    }

    const onAcceptCV = (recruitmentId, userId) => {
        Modal.confirm({
            title: `Bạn có chắc muốn duyệt ứng viên này?`,
            okText: "Có",
            cancelText: "Không",
            okType: "danger",
            onOk: () => {
                handleAccept(recruitmentId, userId);
            },
        });
    };

    const handleAccept = async (recruitmentId, userId) => {
        const { data } = await axios.delete(
           `https://localhost:5001/api/companies/acceptCV?recruitmentId=${recruitmentId}&userId=${userId}`
        )
        if (data.isSuccessed){
            message.success('Phê duyệt thành công')

        }
        else{
            message.error(data.message)
        }
        getCVList();
        
    }
    const onRefuseCV = (recruitmentId, userId) => {
        Modal.confirm({
            title: `Bạn có chắc muốn từ chối ứng viên này?`,
            okText: "Có",
            cancelText: "Không",
            okType: "danger",
            onOk: () => {
                handleRefuse(recruitmentId, userId);
            },
        });
    };

    const handleRefuse = async (recruitmentId, userId) => {
        const { data } = await axios.delete(
           `https://localhost:5001/api/companies/refuseCV?recruitmentId=${recruitmentId}&userId=${userId}`
        )
        if (data.isSuccessed){
            message.success('Từ chối thành công')

        }
        else{
            message.error(data.message)
        }
        getCVList();
        
    }

    return (
        <>
            <NavbarCompany />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Quản lý CV</h1>
                <div className={styles.search_bar}>
                    <div >

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
                            dataSource={cvList}
                            pagination={{ pageSize: 10 }}
                            scroll={{ y: 300 }}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default ListCV
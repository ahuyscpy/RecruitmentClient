import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavbarAdmin from "../../../../layouts/navbar/navbar-admin";
import styles from './list-career.module.scss'
import { Button, Table, Modal, message } from "antd";
import 'antd/dist/antd.css';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
function Career() {
    const [loading, setloading] = useState(true)
    const [careerList, setCareerList] = useState();;
    const [careerSearchList, setCareerSearchList] = useState();;
    const navigate = useNavigate();
    useEffect(() => {
        getCareerList();
    }, []);
    const getCareerList = async () => {
        await axios.get(`https://localhost:5001/api/Admins/GetAllCareer`).then(
            res => {
                setloading(false);
                setCareerList(
                    res.data.map((row, index) => ({
                        key: index,
                        name: row.name,
                        dateCreated: row.dateCreated.slice(0,10),
                        id: row.id,
                    }))
                );
                setCareerSearchList(
                    res.data.map((row, index) => ({
                        key: index,
                        name: row.name,
                        dateCreated: row.dateCreated.slice(0,10),
                        id: row.id,
                    }))
                );
            }
        );
    };
    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            width: 300
        },
        {
            title: "Ngày tạo",
            dataIndex: "dateCreated",
            width: 300
        },
        {
            title: "Hành động",
            width: 300,
            render: (key) => {
                return (
                    <>
                        <AiFillEdit
                          onClick={() => navigate(`update-career/${key.id}`)}
                          style={{ fontSize: "1.3rem" }}
                        />
                        <AiTwotoneDelete
                              onClick={() => {
                                onDeleteCareer(key.id);
                              }}
                            style={{ color: "red", marginLeft: 18 ,fontSize: "1.2rem"}}
                        />
                    </>
                );
            }
        }
    ];
    
    function handleSearch(keyword) {
        if (keyword) {
            const newData = careerSearchList.filter(function (item) {
              const name = item.name ? item.name.toUpperCase() : "".toUpperCase() ;
              const textData = keyword.toUpperCase();
              return name.indexOf(textData) > -1;
            });
            setCareerList(newData)
          } else {
            setCareerList(careerSearchList);
          }
    }
    const onDeleteCareer = (id) => {
        Modal.confirm({
          title: `Bạn có chắc chắn muốn xóa công việc này`,
          okText: "Có",
          cancelText:"Không",
          okType: "danger",
          onOk: () => {
            handleDelete(id);
          },
        });
      };

      const handleDelete = async (id) => {
        const { data } = await axios.delete(
           `https://localhost:5001/api/Admins/DeleteCareer?id=${id}`
        )
        if (data.isSuccessed){
            message.success('Xóa thành công')
            navigate('/career');
        }
        else{
            message.error(data.message)
        }
        getCareerList();
    }
    return (
        <>
            <NavbarAdmin />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Quản lý công việc</h1>
                <div className={styles.search_bar}>
                    <div>
                        <Button type='primary' size='large' onClick={()=> navigate('create-career')}>
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
                            dataSource={careerList}
                            pagination={{ pageSize: 10 }}
                            scroll={{ y: 300 }}
                        />
                    )}
                </div>
            </div>


        </>
    )
}

export default Career;
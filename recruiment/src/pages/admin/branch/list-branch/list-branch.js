import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavbarAdmin from "../../../../layouts/navbar/navbar-admin";
import styles from './list-branch.module.scss'
import { Button, Table, Modal, message } from "antd";
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

function Branch() {
    const [loading, setloading] = useState(true);
    const [branchList, setBranchList] = useState();
    const [branchSearchList, setBranchSearchList] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        getBranchList();
    }, []);
    const getBranchList = async () => {
        await axios.get(`https://localhost:5001/api/Admins/GetAllBranch`).then(
            res => {
                setloading(false);
                setBranchList(
                    res.data.map((row, index) => ({
                        key: index,
                        city: row.city,
                        id: row.id,
                    }))
                );
                setBranchSearchList(
                    res.data.map((row, index) => ({
                        key: index,
                        city: row.city,
                        id: row.id,
                    }))
                );
            }
        );
    };
    const columns = [
        {
            title: "Thành phố",
            dataIndex: "city",
            width: 300
        },
        {
            title: "Hành động",
            width: 300,
            render: (key) => {
                return (
                    <>
                        <AiFillEdit
                          onClick={() => navigate(`update-branch/${key.id}`)}
                          style={{ fontSize: "1.3rem" }}
                        />
                        <AiTwotoneDelete
                              onClick={() => {
                                onDeleteBranch(key.id, key.city);
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
            const newData = branchSearchList.filter(function (item) {
              const city = item.city ? item.city.toUpperCase() : "".toUpperCase() ;
              const textData = keyword.toUpperCase();
              return city.indexOf(textData) > -1;
            });
            setBranchList(newData)
          } else {
            setBranchList(branchSearchList);
          }
    }
    const onDeleteBranch = (id, city) => {
        Modal.confirm({
          title: `Bạn có chắc chắn muốn xóa ${city}`,
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
           `https://localhost:5001/api/Admins/DeleteBranch?id=${id}`
        )
        if (data.isSuccessed){
            message.success('Xóa thành công')
            
        }
        else{
            message.error(data.message)
        }
        getBranchList();
        navigate('/branch');
    }
    return (
        <>
            <NavbarAdmin />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Quản lý tỉnh thành</h1>
                <div className={styles.search_bar}>
                    <div >
                        <Button type='primary' size='large' onClick={()=> navigate('create-branch')}>
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
                            dataSource={branchList}
                            pagination={{ pageSize: 10 }}
                            scroll={{ y: 300 }}
                        />
                    )}
                </div>
            </div>


        </>
    )
}

export default Branch;
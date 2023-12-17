import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
  Modal,
  Select,
  Row,
  Col,
  Card,
  Image,
  Tag,
} from "antd";

import styles from "./search-user.module.scss";
import NavbarCompany from "../../../layouts/navbar/navbar-company";
import NavbarAdmin from "../../../layouts/navbar/navbar-admin";
import Navbar from "../../../layouts/navbar/navbar";
import Footer from "../../../layouts/footer/footer";
import NavbarUser from "../../../layouts/navbar/navbar-user";
import { GetAllUser } from "../../../mocks";
import addressUser from '../../../assets/images/address-user.png'

function SearchUser() {
  const { Option } = Select;
  const user = JSON.parse(localStorage.getItem("user"));
  // const user = {
  //     // id: 'f7b8188c-2807-456f-678d-08da19f68e9f',
  //     // role: 'user'

  //     id: '0E0A6662-29FA-4178-F932-08DA19F23EE9',
  //     role: 'company'
  // }
  const [userList, setUserList] = useState();
  const [userSearchList, setUserSearchList] = useState();
  useEffect(() => {
    getSearchInformation();
  }, []);
  const getSearchInformation = async () => {
    await axios.get(`https://localhost:5001/api/Users/GetAllUser`).then(
        res => {
            console.log(res.data.resultObj)
            setUserList(res.data.resultObj);
            setUserSearchList(res.data.resultObj);
        }
    );
    // setUserList(GetAllUser.data.resultObj);
    // setUserSearchList(GetAllUser.data.resultObj);
  };
  function handleSearch(keyword) {
    if (keyword) {
      const newData = userSearchList.filter(function (item) {
        const user = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = keyword.toUpperCase();
        return user.indexOf(textData) > -1;
      });
      setUserList(newData);
    } else {
      setUserList(userSearchList);
    }
  }
  return (
    <>
      {user?.role == "company" ? (
        <NavbarCompany />
      ) : user?.role == "user" ? (
        <NavbarUser />
      ) : (
        <Navbar />
      )}
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Kết quả tìm kiếm ứng viên</h3>
          <div className={styles.search}>
            <Input
              placeholder="Nhập tên ứng viên để tìm kiếm"
              className={styles.Input}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <p>{userList ? userList.length : 0} ứng viên</p>
        <div className={styles.recruitment_list}>
          <Row gutter={[30, 30]}>
            {userList &&
              userList.map((user) => (
                <Col key={user.id} span={12}>
                  <Link to={"/user/profile/information/" + user.id}>
                    <Card className="!rounded-[10px] hover:shadow-lg">
                      <div className="flex items-start justify-between space-x-2">
                        <Image
                          width={100}
                          height={100}
                          preview={false}
                          alt=""
                          className="!rounded-full border-[1px] border-solid"
                          src={'https://localhost:5001/avatars/' + user?.avatarPath}
                        />
                        <div className="flex flex-col flex-1 pt-2">
                          <span className="text-[18px] font-semibold truncate">
                            {user?.name}
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Image
                              preview={false}
                              width={20}
                              height={20}
                              src={addressUser}
                              alt=""
                            />
                            <span className="text-[14px] font-semibold">{user?.address}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-[#666] text-[13px] font-semibold mr-2">Học Vấn:</span>
                            <span className=" font-semibold text-[red]">{user?.academicLevel}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchUser;

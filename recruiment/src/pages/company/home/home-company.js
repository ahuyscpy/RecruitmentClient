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
} from "antd";
import addressUser from '../../../assets/images/address-user.png'

import styles from "./home-company.module.scss";
import NavbarCompany from "../../../layouts/navbar/navbar-company";
import banner from "../../../assets/images/employer-banner.png";
import Footer from "../../../layouts/footer/footer";
function HomeCompany() {
  const [userList, setUserList] = useState();
  useEffect(() => {
    getSearchInformation();
  }, []);
  const getSearchInformation = async () => {
    await axios
      .get(`https://localhost:5001/api/Users/GetAllUser`)
      .then((res) => {
        console.log(res.data.resultObj);
        setUserList(res.data.resultObj);
      });
  };

  return (
    <>
      <NavbarCompany />
      <div className={styles.container}>
        <h1>Nhà tuyển dụng</h1>
        <div className={styles.banner}>
          <img src={banner} className={styles.banner_image} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3>Các ứng viên gợi ý</h3>
          </div>

          <p>{userList ? userList.length : 0} ứng viên</p>
          <div className={styles.recruitment_list}>
            <Row gutter={[30, 30]}>
              {userList
                ? userList.map((user) => (
                    <Col span={12} key={user.id}>
                      <Link to={"/user/profile/information/" + user.id}>
                        <Card className="!rounded-[10px] hover:shadow-lg">
                          <div className="flex items-start justify-between space-x-2">
                            <Image
                              width={100}
                              height={100}
                              preview={false}
                              alt=""
                              className="!rounded-full border-[1px] border-solid"
                              src={
                                "https://localhost:5001/avatars/" +
                                user?.avatarPath
                              }
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
                                <span className="text-[14px] font-semibold">
                                  {user?.address}
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                <span className="text-[#666] text-[13px] font-semibold mr-2">
                                  Học Vấn:
                                </span>
                                <span className=" font-semibold text-[red]">
                                  {user?.academicLevel}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </Col>
                  ))
                : ""}
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeCompany;

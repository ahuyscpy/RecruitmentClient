import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Input,
  Row,
  Col,
  Image,
  Tag,
  Card,
} from "antd";

import styles from "./search-company.module.scss";
import NavbarAdmin from "../../../layouts/navbar/navbar-admin";
import NavbarCompany from "../../../layouts/navbar/navbar-company";
import NavbarUser from "../../../layouts/navbar/navbar-user";
import Navbar from "../../../layouts/navbar/navbar";
import Footer from "../../../layouts/footer/footer";
import address from "../../../assets/images/address.png";
import member from "../../../assets/images/member.png";
import { GetAllCompany } from "../../../mocks";

function SearchCompany() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [companyList, setCompanyList] = useState();
  const [companySearchList, setCompanySearchList] = useState();

  useEffect(() => {
    getSearchInformation();
  }, []);
  const getSearchInformation = async () => {
    await axios.get(`https://localhost:5001/api/Companies/GetAllCompany`).then(
        res => {
            console.log(res.data.resultObj)
            setCompanyList(res.data.resultObj)
            setCompanySearchList(res.data.resultObj)
        }
    );
    // setCompanyList(GetAllCompany.data.resultObj);
    // setCompanySearchList(GetAllCompany.data.resultObj);
  };
  function handleSearch(keyword) {
    if (keyword) {
      const newData = companySearchList.filter(function (item) {
        const company = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = keyword.toUpperCase();
        return company.indexOf(textData) > -1;
      });
      setCompanyList(newData);
    } else {
      setCompanyList(companySearchList);
    }
  }
  return (
    <>
      {user?.role == "company" ? (
        <NavbarCompany />
      ) : user?.role == "user" ? (
        <NavbarUser />
      ) : user?.role == "admin" ? (
        <NavbarAdmin />
      ) : (
        <Navbar />
      )}

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Kết quả tìm kiếm công ty</h3>
          <div className={styles.search}>
            <Input
              placeholder="Nhập tên công ty để tìm kiếm"
              className={styles.Input}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <p>{companyList ? companyList.length : 0} công ty</p>
        <div className={styles.recruitment_list}>
          <Row gutter={[30, 30]}>
            {companyList &&
              companyList.map((company) => (
                <Col span={12} key={company.id}>
                  <Link to={"/company/profile/" + company.id}>
                    <Card className="!rounded-[10px] hover:shadow-lg">
                      <div className="flex items-start justify-between space-x-2">
                        <div className="border-[1px] w-[100px] rounded-[6px] h-[100px] p-2 border-solid">
                          <Image
                            width={"100%"}
                            height={"100%"}
                            preview={false}
                            alt=""
                            src={'https://localhost:5001/avatars/' + company.avatarPath}
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-[18px] font-semibold truncate">
                            {company?.name}
                          </span>
                          <div className="text-[14px] font-semibold underline text-[#666] underline-offset-2">{company.countRecruitment ?? 0} việc đang tuyển</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Image
                              preview={false}
                              width={30}
                              height={30}
                              src={address}
                              alt=""
                            />
                            {company?.branches?.length && <Tag>
                              {company?.branches?.map((city, index) =>
                                index === 0 ? city.city : ", " + city.city
                              )}
                            </Tag>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Image src={member} width={20} height={20}/>
                            <span className="font-bold">{company?.workerNumber ?? 10} Nhân Viên</span>
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

export default SearchCompany;

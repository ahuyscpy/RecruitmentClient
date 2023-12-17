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
  Carousel,
  Image,
  Row,
  Col,
  Card,
  Tag,
} from "antd";
import { MdDateRange, MdDelete } from "react-icons/md";

import NavbarUser from "../../../layouts/navbar/navbar-user";
import Footer from "../../../layouts/footer/footer";
import styles from "./home-user.module.scss";
import bannerFirst from "../../../assets/images/banner1.png";
import bannerSecond from "../../../assets/images/banner2.png";
import bannerThird from "../../../assets/images/banner3.png";
const banner = [bannerFirst, bannerSecond, bannerThird];
function HomeUser() {
  const [listRecruitments, setListRecruitments] = useState();
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10
  });

  useEffect(() => {
    getSearchInformation();
  }, [pagination.page]);
  const getSearchInformation = async () => {
    await axios
      .get(
        `https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=${pagination.page}&PageSize=${[pagination.limit]}`
      )
      .then((res) => {
        console.log(res.data.resultObj);
        setListRecruitments(res.data.resultObj.items);
        setPagination({
            ...pagination,
            page: res.data.resultObj.pageIndex,
            total: res.data.resultObj.totalRecords
          })
      });
  };

  function tranferPrice(data) {
    if (data) {
      data = data.toString();
      var cut;
      for (var i = data.length - 3; i > 0; i -= 3) {
        cut = data.slice(i, data.length);
        data = data.slice(0, i);
        data = data.concat(".");
        data = data.concat(cut);
      }
      return data;
    } else {
      return "undefined";
    }
  }
  function timeCaculate(datetime) {
    var oneHour = 60 * 60 * 1000;
    var oneDate = 60 * 60 * 1000 * 24;
    var dateCreated = new Date(datetime);
    var currentDate = new Date();
    if (currentDate - dateCreated < oneHour) {
      var minuteCurent = currentDate.getMinutes();
      var minuteCreated = dateCreated.getMinutes();
      if (minuteCurent < minuteCreated) {
        minuteCurent += 60;
        return minuteCurent - minuteCreated + " phút trước";
      } else {
        if (minuteCreated - minuteCurent <= 1) {
          return "vừa xong";
        } else {
          return minuteCreated - minuteCurent + " phút trước";
        }
      }
    } else if (currentDate - dateCreated < oneDate) {
      var hourCurent = currentDate.getHours();
      var hourCreated = dateCreated.getHours();
      if (hourCurent < hourCreated) {
        hourCurent += 24;
        return hourCurent - hourCreated + " giờ trước";
      } else {
        return hourCurent - hourCreated + " giờ trước";
      }
    } else {
      var dayCurent = currentDate.getDate();
      var dayCreated = dateCreated.getDate();
      var preMonth = currentDate.getMonth() - 1;
      if (dayCurent < dayCreated) {
        if (
          preMonth == 1 ||
          preMonth == 3 ||
          preMonth == 5 ||
          preMonth == 7 ||
          preMonth == 8 ||
          preMonth == 10 ||
          preMonth == 12
        ) {
          dayCurent += 31;
        } else if (preMonth == 2) {
          dayCurent += 28;
        } else {
          dayCurent += 30;
        }
        return dayCurent - dayCreated + " ngày trước";
      } else {
        return dayCurent - dayCreated + " ngày trước";
      }
    }
  }
  return (
    <>
      <NavbarUser />
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <Carousel
            draggable
            autoplay
            autoplaySpeed={3000}
            dots
            pauseOnHover={false}
          >
            {banner.map((e, i) => (
              <Image
                src={e}
                key={i}
                width={"100%"}
                height={450}
                preview={false}
              />
            ))}
          </Carousel>
        </div>
        <h1>Việc làm gợi ý</h1>
        <div className={styles.recruitment_list}>
        <Row gutter={[30, 30]}>
            {listRecruitments
              ? listRecruitments.map((recruitment) => (
                  <Col span={8} key={recruitment.id}>
                    <Link to={"/recruitment/detail/" + recruitment.id}>
                      <Card
                        className="!rounded-[10px] hover:shadow-lg transition-all"
                        bodyStyle={{ padding: "10px" }}
                      >
                        <div className="flex items-start space-x-2">
                          <Image
                            preview={false}
                            width={60}
                            height={60}
                            className="!rounded-[6px]"
                            src={
                                "https://localhost:5001/avatars/" +
                                recruitment.avatarPath
                              }
                          />
                          <div>
                            <span className="block font-semibold text-[16px] truncate">
                              {recruitment.name}
                            </span>
                            <span className="text-[12px] font-semibold text-[#666] italic">
                              {recruitment.companyName}
                            </span>
                            <div className="flex items-center space-x-1 text-[#888]">
                              <MdDateRange className={styles.date_icon} />
                              <span className="text-[12px]">{timeCaculate(recruitment.dateCreated)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Tag>
                            {recruitment.branches.map((city, index) =>
                              index === 0 ? city : ", " + city
                            )}
                          </Tag>
                          <Tag color="red" className=" font-semibold">
                            {tranferPrice(recruitment.salary)} VND
                          </Tag>
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))
              : ""}
          </Row>
          <div className="flex justify-center mt-5">
            <Button size="large" onClick={()=>{
              setPagination({
                ...pagination,
                page: pagination.page + 1
              })
            }}>Xem Thêm</Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeUser;

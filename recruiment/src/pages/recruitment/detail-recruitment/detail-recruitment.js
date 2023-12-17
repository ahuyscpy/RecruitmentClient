import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
  Modal,
  Card,
  Row,
  Col,
  Image,
  Tag,
} from "antd";
import styles from "./detail-recruitment.module.scss";

import NavbarCompany from "../../../layouts/navbar/navbar-company";
import NavbarAdmin from "../../../layouts/navbar/navbar-admin";
import NavbarUser from "../../../layouts/navbar/navbar-user";
import Navbar from "../../../layouts/navbar/navbar";

import { MdOutlineAttachMoney, MdDateRange } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { FaPaperPlane } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { BiDetail } from "react-icons/bi";
import Footer from "../../../layouts/footer/footer";
import {
  GetCompanyInformation,
  GetRecruitmentById,
  GetUserInformation,
} from "../../../mocks";
import money from "../../../assets/images/money.gif";
import address from "../../../assets/images/address.png";
import detailUser from "../../../assets/images/detail-user.png";
import detailExperice from "../../../assets/images/detail-experience.png";
import detailBag from "../../../assets/images/detail-bag.png";
import ItemInfo from "../../../components/detail/ItemInfo";

function DetailRecruitment() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));

  const [recruitment, setRecruitment] = useState();
  const [userInformation, setUserInformation] = useState();
  const [companyInformation, setCompanyInformation] = useState();
  const [comment, setComment] = useState();
  const [isShowModalSubmitCV, setIsShowModalSubmitCV] = useState(false);
  const [cvFile, setCvFile] = useState();

  useEffect(() => {
    getRecruitment();
    if (user?.role === "user") {
      getUserInformation();
    } else if (user?.role === "company") {
      getCompanyInformation();
    } else {
      getRecruitment();
    }
  }, []);

  const getRecruitment = async () => {
    await axios.get(`https://localhost:5001/api/Companies/GetRecruitmentById?id=${id}`).then(
        res => {
            if (res.data.isSuccessed) {
                console.log(res.data.resultObj)
                setRecruitment(res.data.resultObj);

            }
        }
    );
    // setRecruitment(GetRecruitmentById.data.resultObj);
  };
  const getUserInformation = async () => {
    await axios.get(`https://localhost:5001/api/Users/GetUserInformation?userId=${user.id}`).then(
        res => {
            if (res.data.isSuccessed) {
                console.log(res.data.resultObj)

                setUserInformation(res.data.resultObj)
            }
        }
    );
    // setUserInformation(GetUserInformation.data.resultObj);
  };
  const getCompanyInformation = async () => {
    await axios.get(`https://localhost:5001/api/Companies/GetCompanyInformation?companyId=${user.id}`).then(
        res => {
            if (res.data.isSuccessed) {
                console.log(res.data.resultObj)
                setCompanyInformation(res.data.resultObj)
            }
        }
    );
    // setCompanyInformation(GetCompanyInformation.data.resultObj);
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

  const lineDown = (string) => {
    const descrip = [];
    var underline = string.indexOf("||");
    var index = 0;
    for (var i = underline; i != -1; i = underline) {
      var nextUnderline = string.indexOf("||", underline + 1);
      if (nextUnderline != -1) {
        var data = string.slice(underline + 2, nextUnderline);
        descrip[index] = data;
        index += 1;
        underline = nextUnderline;
      } else {
        var data = string.slice(underline + 2, string.length);
        descrip[index] = data;
        underline = -1;
      }
    }
    return descrip;
  };

  function GetFormattedDate(datetime) {
    if (datetime) {
      var month = datetime.substring(5, 7);
      var day = datetime.substring(8, 10);
      var year = datetime.substring(0, 4);
      return day + "-" + month + "-" + year;
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
        if (minuteCreated - minuteCurent < 1) {
          return "vừa xong";
        } else {
          return minuteCreated - minuteCurent + " phút trước";
        }
      }
    } else if (currentDate - dateCreated < oneDate) {
      var hourCurent = currentDate.getHours();
      var hourCreated = dateCreated.getHours();
      if (hourCurent <= hourCreated) {
        hourCurent += 24;
        return hourCurent - hourCreated + " giờ trước";
      } else {
        return hourCurent - hourCreated + " giờ trước";
      }
    } else {
      var dayCurent = currentDate.getDate();
      var dayCreated = dateCreated.getDate();
      var preMonth = currentDate.getMonth() - 1;
      if (dayCurent <= dayCreated) {
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

  const handleComment = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://localhost:5001/api/Companies/Comment`,
      {
        accountId: user.id,
        recruitmentId: recruitment.id,
        content: comment,
        subCommentId: null,
        role: user.role,
      },
      config
    );
    if (data.isSuccessed) {
      getRecruitment();
    } else {
      message.error(data.message);
    }
  };
  const handleSubmitChildInput = async (inputChild, id) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://localhost:5001/api/Companies/Comment`,
      {
        accountId: user.id,
        recruitmentId: recruitment.id,
        content: inputChild,
        subCommentId: id.toString(),
        role: user.role,
      },
      config
    );
    if (data.isSuccessed) {
      getRecruitment();
    } else {
      message.error(data.message);
    }
  };

  const RenderComment = ({ comment, index }) => {
    const [inputChild, setInputChild] = useState("");
    return (
      <div className={styles.comment_title} key={index}>
        <div className={styles.sub_title_wrapper}>
          <div className={styles.sub_image_wrapper}>
            <img
              src={"https://localhost:5001/avatars/" + comment.avatarPath}
              className={styles.sub_avatar}
            ></img>
          </div>
          <div className={styles.sub_name}>{comment.name}</div>
          <div className={styles.sub_date}>
            {timeCaculate(comment.dateCreated)}
          </div>
        </div>
        <div className={styles.sub_content}>{comment.content}</div>
        {comment.childComments.map((childComment, index) => (
          <div className={styles.child_title_wrapper} key={index}>
            <div className={styles.child_header}>
              <div className={styles.child_image_wrapper}>
                <img
                  src={
                    "https://localhost:5001/avatars/" + childComment.avatarPath
                  }
                  className={styles.child_avatar}
                ></img>
              </div>
              <div className={styles.child_name}>{childComment.name}</div>
              <div className={styles.child_date}>
                {timeCaculate(childComment.dateCreated)}
              </div>
            </div>
            <div className={styles.child_content}>{childComment.content}</div>
          </div>
        ))}
        <div className={styles.child_comment}>
          {user.role === "company" ? (
            <div className={styles.child_comment_image_wrapper}>
              <img
                src={
                  companyInformation
                    ? "https://localhost:5001/avatars/" +
                      companyInformation.companyAvatar.imagePath
                    : ""
                }
                className={styles.child_comment_image}
              ></img>
            </div>
          ) : (
            <div className={styles.child_comment_image_wrapper}>
              <img
                src={
                  userInformation
                    ? "https://localhost:5001/avatars/" +
                      userInformation.userAvatar.imagePath
                    : ""
                }
                className={styles.child_comment_image}
              ></img>
            </div>
          )}
          <div className={styles.input_child_comment_wrapper}>
            <TextArea
              value={inputChild}
              rows={1}
              autoSize
              onChange={(e) => setInputChild(e.target.value)}
              placeholder="Nhập bình luận"
            />
          </div>
          <Button
            type="primary"
            className={styles.btn__childcomment}
            onClick={() => handleSubmitChildInput(inputChild, comment.id)}
          >
            Bình luận
          </Button>
        </div>
      </div>
    );
  };

  const showModalSubmitCV = () => {
    setIsShowModalSubmitCV(true);
  };
  const handleCancelSubmitCV = () => {
    setIsShowModalSubmitCV(false);
  };
  const handleOkSubmitCV = () => {
    Modal.confirm({
      title: `Bạn có chắc chắn muốn nộp CV vào bài tuyển dụng này`,
      okText: "Có",
      cancelText: "Không",
      okType: "danger",
      onOk: () => {
        SubmitCV();
      },
    });
  };
  const SubmitCV = async () => {
    console.log(id, user.id, typeof cvFile);
    var bodyFormData = new FormData();
    bodyFormData.append("file", cvFile);
    bodyFormData.append("recruitmentId", id);
    bodyFormData.append("userId", user.id);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://localhost:5001/api/users/SubmitCV`,
      bodyFormData,
      config
    );
    if (data.isSuccessed) {
      message.success("Nộp đơn thành công");
      getRecruitment();
      setIsShowModalSubmitCV(false);
    } else {
      getRecruitment();
      message.error(data.message);
    }
  };

  console.log(companyInformation);

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
      <div className={styles.container}>
        <div className={styles.fluit}>
          <div className={styles.wrapper}>
            <Row gutter={[20, 20]}>
              {/* info job */}
              <Col span={16}>
                <Card className="!rounded-[10px]">
                  <div className="flex items-start space-x-2">
                    <Image
                      preview={false}
                      width={40}
                      height={40}
                      className="!rounded-[6px]"
                      src={
                          "https://localhost:5001/avatars/" +
                          recruitment?.userAvatar?.imagePath
                        }
                    />
                    <span className="block font-semibold text-[20px] truncate">
                      {recruitment?.name}
                    </span>
                  </div>
                  <Row className="mt-3">
                    <Col span={8}>
                      <ItemInfo
                        src={money}
                        title="Mức Lương"
                        text={
                          <span className="text-[15px]">{`${tranferPrice(
                            recruitment?.salary
                          )}VND`}</span>
                        }
                      />
                    </Col>
                    <Col span={8}>
                      <ItemInfo
                        src={address}
                        title="Địa Chỉ"
                        text={
                          <>
                            <Tag>
                              {recruitment?.branches?.map((city, index) =>
                                index === 0 ? city : ", " + city
                              )}
                            </Tag>
                          </>
                        }
                      />
                    </Col>
                  </Row>
                  {user?.role === "user" && (
                    <Button
                      size="large"
                      type="primary"
                      onClick={showModalSubmitCV}
                      className="w-full flex items-center mt-4"
                    >
                      <div className="flex items-center justify-center">
                        <FaPaperPlane className="mr-2" />
                        Ứng tuyển ngay
                      </div>
                    </Button>
                  )}
                </Card>
              </Col>
              {/* info company */}
              <Col span={8}>
                <Card className="!rounded-[10px]">
                  <span className="text-[22px] font-bold">Nhà Tuyển Dụng</span>
                  <div className="flex items-start space-x-2">
                    <div className="rounded-[15px] border-[1px] border-solid w-[100px] h-[100px] flex items-center justify-center">
                      <Image
                        width={"80%"}
                        height={"80%"}
                        src={"https://localhost:5001/avatars/" +
                        userInformation?.avatarPath}
                      />
                    </div>
                    <span className="font-bold">
                      {recruitment?.companyName}
                    </span>
                  </div>
                </Card>
              </Col>
              {/* description */}
              <Col span={16}>
                <Card className="!rounded-[10px]">
                  <div className="text-[22px] font-bold">
                    Chi Tiết Tuyển Dụng
                  </div>
                  <span className="text-[18px] font-semibold text-[#666]">
                    Mô tả công việc
                  </span>
                  {recruitment
                    ? lineDown(recruitment.description).map((item, index) => (
                        <p className="text-[#666]" key={index}>
                          {item}
                        </p>
                      ))
                    : ""}
                  <span className="text-[18px] font-semibold text-[#666]">
                    Quyền lợi được hưởng
                  </span>
                  {recruitment
                    ? lineDown(recruitment.benefits).map((item, index) => (
                        <p className="text-[#666]" key={index}>
                          {item}
                        </p>
                      ))
                    : ""}
                  <span className="text-[18px] font-semibold text-[#666]">
                    Kinh nghiệm / Kỹ năng chi tiết
                  </span>
                  {recruitment
                    ? lineDown(recruitment.detailedExperience).map(
                        (item, index) => (
                          <p className="text-[#666]" key={index}>
                            {item}
                          </p>
                        )
                      )
                    : ""}
                  <span className="text-[18px] font-semibold text-[#666]">Mô tả chi tiết</span>
                  <p>
                    Loại công việc:{" "}
                    <span>{recruitment ? recruitment.type : ""}</span>
                  </p>
                  <p>
                    Cấp bậc: <span>{recruitment ? recruitment.rank : ""}</span>
                  </p>
                  <p>
                    Yêu cầu kinh nghiệm:{" "}
                    <span>{recruitment ? recruitment.experience : ""}</span>
                  </p>
                  <p>
                    Yêu cầu học vấn:{" "}
                    <span>{recruitment ? recruitment.education : ""}</span>
                  </p>
                  <p>
                    Nghành nghề:{" "}
                    <span>
                      {recruitment
                        ? recruitment.careers.map((career, index) =>
                            index === 0 ? career : ", " + career
                          )
                        : ""}
                    </span>
                  </p>
                  <p>
                    Thời gian ứng tuyển:{" "}
                    <span>
                      {recruitment
                        ? GetFormattedDate(recruitment.dateCreated)
                        : ""}{" "}
                      -{" "}
                      {recruitment
                        ? GetFormattedDate(recruitment.expirationDate)
                        : ""}
                    </span>
                  </p>
                </Card>
              </Col>
              {/* info common */}
              <Col span={8}>
                <Card className="!rounded-[10px]">
                  <span className="text-[22px] font-bold">Thông Tin Chung</span>
                  <ItemInfo
                    src={detailUser}
                    title="Cấp Bậc"
                    text={recruitment?.rank}
                  />
                  <br />
                  <ItemInfo
                    src={detailExperice}
                    title="Kinh Nghiệm"
                    text={recruitment?.experience}
                  />
                  <br />
                  <ItemInfo
                    src={detailBag}
                    title="Hình Thức Làm Việc"
                    text={recruitment?.type}
                  />
                </Card>
              </Col>
            </Row>
            {user?.role === "user" || user?.role === "company" ? (
              <div>
                <div className={styles.comment}>
                  {user?.role === "company" ? (
                    <div className={styles.comment_image_wrapper}>
                      <img
                        src={
                          companyInformation
                            ? "https://localhost:5001/avatars/" +
                              companyInformation.companyAvatar.imagePath
                            : ""
                        }
                        className={styles.comment_image}
                      ></img>
                    </div>
                  ) : (
                    <div className={styles.comment_image_wrapper}>
                      <img
                        src={
                          userInformation
                            ? "https://localhost:5001/avatars/" +
                              userInformation.userAvatar.imagePath
                            : ""
                        }
                        className={styles.comment_image}
                      ></img>
                    </div>
                  )}
                  <div className={styles.input_comment_wrapper}>
                    <TextArea
                      value={comment}
                      rows={1}
                      autoSize
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Nhập bình luận"
                    />
                  </div>
                  <Button
                    type="primary"
                    className={styles.btn_comment}
                    onClick={handleComment}
                  >
                    Bình luận
                  </Button>
                </div>
                <div className={styles.comment_list}>
                  {recruitment
                    ? recruitment.listComment.map((comment, index) => {
                        return (
                          <RenderComment comment={comment} index={index} />
                        );
                      })
                    : ""}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Chọn file"
        visible={isShowModalSubmitCV}
        onCancel={handleCancelSubmitCV}
        footer={[
          <Button key="back" onClick={handleCancelSubmitCV}>
            quay lại
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkSubmitCV}>
            Nộp đơn
          </Button>,
        ]}
      >
        <Form.Item label="Chọn file">
          <input type="file" onChange={(e) => setCvFile(e.target.files[0])} />
        </Form.Item>
      </Modal>
      <Footer />
    </>
  );
}

export default DetailRecruitment;

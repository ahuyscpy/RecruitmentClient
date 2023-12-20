import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Table,
  Modal,
  Select,
  message,
  DatePicker,
  Tag,
  Image,
} from "antd";

import NavbarCompany from "../../../layouts/navbar/navbar-company";
import styles from "./list-recruitment.module.scss";
import "antd/dist/antd.css";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { MdOutlineAddAlarm } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import {
  IoIosRemoveCircleOutline,
  IoIosRemoveCircle,
  IoIosAddCircleOutline,
  IoIosAddCircle,
} from "react-icons/io";
import deleteIcon from "../../../assets/images/delete.png";
import { GetAllCompanyRecruitment } from "../../../mocks";

function ListRecruitment() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = {
    role: "company",
  };

  const { Option } = Select;
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [recruitmentList, setRecruitmentList] = useState();
  const [recruitmentSearchList, setRecruitmentSearchList] = useState();

  const [isShowModalAddCareer, setIsShowModalAddCareer] = useState(false);
  const [careerNotExist, setCareerNotExist] = useState();
  const [careerNotExistId, setCareerNotExistId] = useState();

  const [isShowModalRemoveCareer, setIsShowModalRemoveCareer] = useState(false);
  const [careerExist, setCareerExist] = useState();
  const [careerExistId, setCareerExistId] = useState();

  const [isShowModalAddBranch, setIsShowModalAddBranch] = useState(false);
  const [branchNotExist, setBranchNotExist] = useState();
  const [branchNotExistId, setBranchNotExistId] = useState();

  const [isShowModalRemoveBranch, setIsShowModalRemoveBranch] = useState(false);
  const [branchExist, setBranchExist] = useState();
  const [branchExistId, setBranchExistId] = useState();

  const [isShowModalExtend, setIsShowModalExtend] = useState(false);
  const [ExtendDate, setExtendDate] = useState();

  const [recruitmentId, setRecruitmentId] = useState();
  useEffect(() => {
    getRecruitmentList();
  }, []);
  const getRecruitmentList = async () => {
    await axios
      .get(
        `https://localhost:5001/api/Companies/GetAllCompanyRecruitment?companyId=${user.id}`
      )
      .then((res) => {
        setloading(false);
        setRecruitmentList(
          res.data.resultObj.map((row, index) => ({
            key: index,
            name: row.name,
            rank: row.rank,
            experience: row.experience,
            salary: tranferPrice(row.salary),
            education: row.education,
            type: row.type,
            date:
              GetFormattedDate(row.dateCreated) +
              " - " +
              GetFormattedDate(row.expirationDate),
            id: row.id,
            careers: row.careers,
            branches: row.branches,
          }))
        );
        setRecruitmentSearchList(
          res.data.resultObj.map((row, index) => ({
            key: index,
            name: row.name,
            rank: row.rank,
            experience: tranferPrice(row.experience),
            salary: row.salary,
            education: row.education,
            type: row.type,
            date:
              GetFormattedDate(row.dateCreated) +
              " - " +
              GetFormattedDate(row.expirationDate),
            id: row.id,
            careers: row.careers,
            branches: row.branches,
          }))
        );
      });

    // setRecruitmentList(
    //   GetAllCompanyRecruitment.data.resultObj.map((row, index) => ({
    //     key: index,
    //     name: row.name,
    //     rank: row.rank,
    //     experience: row.experience,
    //     salary: tranferPrice(row.salary),
    //     education: row.education,
    //     type: row.type,
    //     date:
    //       GetFormattedDate(row.dateCreated) +
    //       " - " +
    //       GetFormattedDate(row.expirationDate),
    //     id: row.id,
    //     careers: row.careers,
    //     branches: row.branches,
    //   }))
    // );
    // setRecruitmentSearchList(
    //   GetAllCompanyRecruitment.data.resultObj.map((row, index) => ({
    //     key: index,
    //     name: row.name,
    //     rank: row.rank,
    //     experience: tranferPrice(row.experience),
    //     salary: row.salary,
    //     education: row.education,
    //     type: row.type,
    //     date:
    //       GetFormattedDate(row.dateCreated) +
    //       " - " +
    //       GetFormattedDate(row.expirationDate),
    //     id: row.id,
    //     careers: row.careers,
    //     branches: row.branches,
    //   }))
    // );
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      width: 150,
      fixed: "left",
    },
    {
      title: "Nghành nghề",
      dataIndex: "careers",
      width: 200,
      fixed: "left",
      render: (careers, record) => {
        console.log('careers', careers, record);
        return (
          <div className="flex">
            <div className="mr-2 flex-1">
              {careers.map((career, index) => {
                return (
                  <span key={index} className=" font-semibold">
                    {index === careers.length - 1 ? career : career + ", "}{" "}
                  </span>
                );
              })}
            </div>
  
            <div className="flex items-center space-x-1">
              <IoIosAddCircleOutline
                className="text-[18px]"
                onClick={() => showModalAddCareer(careers.id)}
              />
              <IoIosRemoveCircleOutline
                className="text-[18px]"
                onClick={() => showModalRemoveCareer(careers.id)}
              />
            </div>
          </div>
        )
      },
    },
    {
      title: "Cấp bậc",
      dataIndex: "rank",
      width: 150,
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience",
      width: 300,
    },
    {
      title: "Mức Lương",
      render: (key) => <Tag color="red">{key.salary} VND</Tag>,
      width: 160,
    },
    {
      title: "Học Vấn",
      render: (key) => <Tag color="cyan">{key.education}</Tag>,
      width: 200,
    },
    {
      title: "Loại công việc",
      dataIndex: "type",
      width: 180,
    },
    {
      title: "Chi nhánh",
      dataIndex: "branches",
      width: 200,
      render: (branches) => {
        console.log('branches', branches)
        return (
          <div className="flex">
            <div className="mr-2 flex-1">
              {branches.map((branch, index) => {
                return (
                  <Tag index={index}>
                    {index === branches.length - 1 ? branch : branch + ", "}{" "}
                  </Tag>
                );
              })}
            </div>
            <div className="flex items-center space-x-1">
              <IoIosAddCircle
                style={{ fontSize: "1.3rem" }}
                onClick={() => showModalAddBranch(branches.id)}
              />
              <IoIosRemoveCircle
                style={{ fontSize: "1.3rem" }}
                onClick={() => showModalRemoveBranch(branches.id)}
              />
            </div>
          </div>
        )
      },
    },
    {
      title: "Thời hạn ứng tuyển",
      render: (key) => (
        <div className="flex items-center space-x-2">
          <span>{key.date}</span>

          <MdOutlineAddAlarm
            style={{ fontSize: "1.3rem", marginLeft: 18 }}
            onClick={() => showModalExtenddDate(key.id)}
          />
        </div>
      ),
      width: 250,
    },
    {
      title: "Danh sách CV",
      render: (key) => (
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate(`list-cv/${key.id}`)}
        >
          <Button className="!flex items-center">
            <span>Danh sách</span>
            <GoListOrdered style={{ fontSize: "1.3rem", marginLeft: 18 }} />
          </Button>
        </div>
      ),
      width: 200,
    },
    {
      title: "Hành động",
      width: 150,
      fixed: "right",
      render: (key) => {
        return (
          <div className="flex items-center space-x-4">
            <CgMoreO
              style={{ fontSize: "1.2rem" }}
              onClick={() => navigate(`detail/${key.id}`)}
            />
            <Image
              src={deleteIcon}
              preview={false}
              onClick={() => {
                onDeleteRecruitment(key.id);
              }}
              width={30}
              height={30}
            />
          </div>
        );
      },
    },
  ];
  const onDeleteRecruitment = (id) => {
    Modal.confirm({
      title: `Bạn có chắc chắn muốn xóa bài tuyển dụng này`,
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
      `https://localhost:5001/api/companies/DeleteRecruitment?id=${id}`
    );
    if (data.isSuccessed) {
      message.success("Xóa thành công");
      navigate("/recruitment");
    } else {
      message.error(data.message);
    }
    getRecruitmentList();
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
  function handleSearch(keyword) {
    if (keyword) {
      const newData = recruitmentSearchList.filter(function (item) {
        const name = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = keyword.toUpperCase();
        return name.indexOf(textData) > -1;
      });
      setRecruitmentList(newData);
    } else {
      setRecruitmentList(recruitmentSearchList);
    }
  }

  const showModalAddCareer = async (id) => {
    setIsShowModalAddCareer(true);
    setRecruitmentId(id);
    await axios
      .get(
        `https://localhost:5001/api/Companies/GetCareerRecruitmentNotExist?id=${id}`
      )
      .then((res) => {
        setCareerNotExist(res.data);
        console.log(res.data);
      });
  };
  const handleCancelAddCareer = () => {
    setIsShowModalAddCareer(false);
  };
  const handleOkAddCareer = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://localhost:5001/api/Companies/AddCareerToRecruitment?recruimentId=${recruitmentId}&careerId=${careerNotExistId}`,
      config
    );
    if (data.isSuccessed) {
      message.success("Thêm thành công");
      getRecruitmentList();

      setIsShowModalAddCareer(false);
    } else {
      message.error(data.message);
    }
  };

  const showModalRemoveCareer = async (id) => {
    console.log(id);
    setIsShowModalRemoveCareer(true);
    setRecruitmentId(id);
    await axios
      .get(
        `https://localhost:5001/api/Companies/GetCareerRecruitmentExist?id=${id}`
      )
      .then((res) => {
        setCareerExist(res.data);
        console.log(res.data);
      });
  };
  const handleCancelRemoveCareer = () => {
    setIsShowModalRemoveCareer(false);
  };
  const handleOkRemoveCareer = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://localhost:5001/api/Companies/RemoveCareerFromRecruitment?recruitmentId=${recruitmentId}&careerId=${careerExistId}`,
      config
    );
    if (data.isSuccessed) {
      message.success("Xóa thành công");
      getRecruitmentList();

      setIsShowModalRemoveCareer(false);
    } else {
      message.error(data.message);
    }
  };

  const showModalAddBranch = async (id) => {
    setIsShowModalAddBranch(true);
    setRecruitmentId(id);
    await axios
      .get(
        `https://localhost:5001/api/Companies/GetBranchesRecruitmentNotExist?id=${id}`
      )
      .then((res) => {
        setBranchNotExist(res.data);
        console.log(res.data);
      });
  };
  const handleCancelAddBranch = () => {
    setIsShowModalAddBranch(false);
  };
  const handleOkAddBranch = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://localhost:5001/api/Companies/AddBranchToRecruitment?recruimentId=${recruitmentId}&branchId=${branchNotExistId}`,
      config
    );
    if (data.isSuccessed) {
      message.success("Thêm thành công");
      getRecruitmentList();

      setIsShowModalAddBranch(false);
    } else {
      message.error(data.message);
    }
  };

  const showModalRemoveBranch = async (id) => {
    setIsShowModalRemoveBranch(true);
    setRecruitmentId(id);
    await axios
      .get(
        `https://localhost:5001/api/Companies/GetBranchesRecruitmentExist?id=${id}`
      )
      .then((res) => {
        setBranchExist(res.data);
        console.log(res.data);
      });
  };
  const handleCancelRemoveBranch = () => {
    setIsShowModalRemoveBranch(false);
  };
  const handleOkRemoveBranch = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://localhost:5001/api/Companies/RemoveBranchFromRecruitment?recruitmentId=${recruitmentId}&branchId=${branchExistId}`,
      config
    );
    if (data.isSuccessed) {
      message.success("Xóa thành công");
      getRecruitmentList();

      setIsShowModalRemoveBranch(false);
    } else {
      message.error(data.message);
    }
  };

  const showModalExtenddDate = async (id) => {
    setIsShowModalExtend(true);
    setRecruitmentId(id);
  };
  const handleCancelExtenddDate = () => {
    setIsShowModalExtend(false);
  };
  const handleOkExtenddDate = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://localhost:5001/api/Companies/ExtendRecruitment`,
      { id: recruitmentId, newExpirationDate: ExtendDate },
      config
    );
    if (data.isSuccessed) {
      message.success("Gia hạn thành công thành công");
      getRecruitmentList();

      setIsShowModalExtend(false);
    } else {
      message.error(data.message);
    }
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

  return (
    <>
      <NavbarCompany />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Quản lý Tuyển dụng</h1>
        <div className={styles.search_bar}>
          <div>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("create")}
            >
              tạo mới
            </Button>
          </div>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className={styles.search_input}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
          {loading ? (
            "Loading"
          ) : (
            <Table
              columns={columns}
              dataSource={recruitmentList}
              pagination={{ pageSize: 5 }}
              scroll={{ y: 300, x: 800 }}
            />
          )}
        </div>
      </div>

      <Modal
        title="Thêm Nghành nghề"
        visible={isShowModalAddCareer}
        onCancel={handleCancelAddCareer}
        footer={[
          <Button key="back" onClick={handleCancelAddCareer}>
            quay lại
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkAddCareer}>
            Thêm
          </Button>,
        ]}
      >
        <Form.Item label="Chọn ngành nghề">
          <Select
            style={{ width: "100%" }}
            onChange={(value) => setCareerNotExistId(value)}
          >
            {careerNotExist
              ? careerNotExist.map((career, index) => (
                  <Option key={index} value={career.id}>
                    {career.name}
                  </Option>
                ))
              : ""}
          </Select>
        </Form.Item>
      </Modal>

      <Modal
        title="Loại bỏ nghành nghề"
        visible={isShowModalRemoveCareer}
        onCancel={handleCancelRemoveCareer}
        footer={[
          <Button key="back" onClick={handleCancelRemoveCareer}>
            quay lại
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkRemoveCareer}>
            Loại bỏ
          </Button>,
        ]}
      >
        <Form.Item label="Chọn ngành nghề">
          <Select
            style={{ width: "100%" }}
            onChange={(value) => setCareerExistId(value)}
          >
            {careerExist
              ? careerExist.map((career, index) => (
                  <Option key={index} value={career.id}>
                    {career.name}
                  </Option>
                ))
              : ""}
          </Select>
        </Form.Item>
      </Modal>

      <Modal
        title="Thêm chi nhánh"
        visible={isShowModalAddBranch}
        onCancel={handleCancelAddBranch}
        footer={[
          <Button key="back" onClick={handleCancelAddBranch}>
            quay lại
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkAddBranch}>
            Thêm
          </Button>,
        ]}
      >
        <Form.Item label="Chọn chi nhánh">
          <Select
            style={{ width: "100%" }}
            onChange={(value) => setBranchNotExistId(value)}
          >
            {branchNotExist
              ? branchNotExist.map((branch, index) => (
                  <Option key={index} value={branch.id}>
                    {branch.city}
                  </Option>
                ))
              : ""}
          </Select>
        </Form.Item>
      </Modal>
      <Modal
        title="Loại bỏ chi nhánh"
        visible={isShowModalRemoveBranch}
        onCancel={handleCancelRemoveBranch}
        footer={[
          <Button key="back" onClick={handleCancelRemoveBranch}>
            quay lại
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkRemoveBranch}>
            Loại bỏ
          </Button>,
        ]}
      >
        <Form.Item label="Chọn Chi nhánh">
          <Select
            style={{ width: "100%" }}
            onChange={(value) => setBranchExistId(value)}
          >
            {branchExist
              ? branchExist.map((branch, index) => (
                  <Option key={index} value={branch.id}>
                    {branch.city}
                  </Option>
                ))
              : ""}
          </Select>
        </Form.Item>
      </Modal>
      <Modal
        title="Gia hạn ngày"
        visible={isShowModalExtend}
        onCancel={handleCancelExtenddDate}
        footer={[
          <Button key="back" onClick={handleCancelExtenddDate}>
            quay lại
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkExtenddDate}>
            Gia hạn
          </Button>,
        ]}
      >
        <Form.Item label="Chọn ngày">
          <DatePicker
            onChange={(value) => setExtendDate(value._d.toISOString())}
          />
        </Form.Item>
      </Modal>
    </>
  );
}

export default ListRecruitment;

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';

import NavbarCompany from '../../../layouts/navbar/navbar-company';
import Navbar from '../../../layouts/navbar/navbar';
import NavbarAdmin from '../../../layouts/navbar/navbar-admin';
import NavbarUser from '../../../layouts/navbar/navbar-user';
import styles from './profile-company.module.scss'
import { TiGroup, TiDelete } from "react-icons/ti"
import { RiContactsFill } from "react-icons/ri";
import { MdDateRange, MdDelete } from "react-icons/md";
import { ImLocation } from "react-icons/im";
import { FcEditImage, FcAddImage, FcNext, FcPrevious } from "react-icons/fc";
import { BsPlusCircle, BsCardImage } from "react-icons/bs"
import Footer from '../../../layouts/footer/footer';

function ProfileCompany() {
    const navigate = useNavigate();
    const { TextArea } = Input
    const { Option } = Select;
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))
    const [companyInformation, setCompanyInformation] = useState();
    const [branches, setBranches] = useState();

    const [editName, setEditName] = useState(false)
    const [name, setName] = useState()
    const [editDescription, setEditDescription] = useState(false)
    const [description, setDescription] = useState()
    const [editWorkerNumber, setEditWorkerNumber] = useState(false)
    const [workerNumber, setWorkerNumber] = useState()
    const [editContactName, setEditContactName] = useState(false)
    const [contactName, setContactName] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [address, setAddress] = useState();
    const [branchId, setBranchId] = useState();
    const [isFollow, SetIsFollow] = useState(false);

    const inputAvatar = useRef(null)
    const inputCoverImage = useRef(null)
    const addCoverImage = useRef(null)
    const addImages = useRef(null)
    const scrollY = useRef(null);

    useEffect(() => {
        getCompanyInformation();
        GetFollowCompany();
    }, []);

    const getCompanyInformation = async () => {
        var companyId
        await axios.get(`https://localhost:5001/api/Companies/GetCompanyInformation?companyId=${id}`).then(
            res => {
                if (res.data.isSuccessed) {
                    companyId = res.data.resultObj.companyId;
                    setCompanyInformation(res.data.resultObj)
                    setName(res.data.resultObj.name)
                    setDescription(res.data.resultObj.description)
                    setWorkerNumber(res.data.resultObj.workerNumber)
                    setContactName(res.data.resultObj.contactName)
                }
            }
        );
        // const userId = user.id;
        // const config = { headers: { 'Content-Type': 'application/json' } };
        // const { data } = await axios.post(
        //     `https://localhost:5001/api/Users/FollowResponse`,
        //     { userId, companyId },
        //     config
        // );
        // if (data.isSuccessed) {
        //     SetIsFollow(true)
        // }
    };

    const GetFollowCompany = async () => {
        const userId = user.id;
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Users/FollowResponse`,
            { userId, companyId: id },
            config
        );
        if (data.resultObj) {
            SetIsFollow(true)
        }

    }

    const handleFollowCompany = async () => {
        const userId = user.id;
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Users/FollowCompany`,
            { userId: userId, companyId: id },
            config
        );

        if (data.isSuccessed) {
            SetIsFollow(true)
            message.success('Follow thành công !')
        }
        else {
            message.error(data.message)
        }
    }

    const handleUnFollowCompany = async () => {
        const userId = user.id;
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Users/UnFollowCompany`,
            { userId: userId, companyId: id },
            config
        );

        if (data.isSuccessed) {
            SetIsFollow(false)
            message.success('UnFollow thành công !')
        }
        else {
            message.error(data.message)
        }
    }

    const openAvatar = () => {
        inputAvatar.current.click()
    }
    const editAvatar = async (event) => {
        const file = event.target.files[0]
        var bodyFormData = new FormData();
        bodyFormData.append('ThumnailImage', file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(
            `https://localhost:5001/api/Companies/UpdateAvatar?id=${companyInformation.companyAvatar.id}`,
            bodyFormData,
            config
        );
        if (data.isSuccessed) {
            message.success('Thay đổi ảnh đại diện thành công')
            getCompanyInformation()
            navigate('/company/profile')
        }
        else {
            message.error(data.message)
        }
    }

    const openCoverImage = () => {
        inputCoverImage.current.click()
    }
    const openAddCoverImage = () => {
        addCoverImage.current.click()
    }
    const editCoverImage = async (event) => {
        const file = event.target.files[0]
        var bodyFormData = new FormData();
        bodyFormData.append('ThumnailImage', file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(
            `https://localhost:5001/api/Companies/UpdateCoverImage?id=${companyInformation.companyCoverImage.id}`,
            bodyFormData,
            config
        );
        if (data.isSuccessed) {
            message.success('Thay đổi ảnh bìa thành công')
            getCompanyInformation()
            navigate('/company/profile')
        }
        else {
            message.error(data.message)
        }
    }
    const addCompanyCoverImage = async (event) => {
        const file = event.target.files[0]
        console.log(file)
        var bodyFormData = new FormData();
        bodyFormData.append('ThumnailImage', file);
        bodyFormData.append('companyId', companyInformation.companyId);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/CreateCoverImages`,
            bodyFormData,
            config
        );
        if (data.isSuccessed) {
            message.success('Thêm ảnh bìa thành công')
            getCompanyInformation()
            navigate('/company/profile')
        }
        else {
            message.error(data.message)
        }
    }

    function handleChangeName(value) {
        setName(value)
    }
    const handleSubmitName = async () => {
        if (name.trimEnd() == companyInformation.name.trimEnd()) {
            message.error("vui lòng thay đổi dữ liệu")
        }
        else {
            const id = companyInformation.companyId
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/Companies/UpdateCompanyName`,
                { id, name },
                config
            );
            if (data.isSuccessed) {
                message.success('cập nhật thành công')
                getCompanyInformation();
                setEditName(false)
            }
            else {
                message.error(data.message)
            }
        }

    }

    function handleChangeDescription(value) {
        setDescription(value)
    }
    const handleSubmitDescription = async () => {
        if (description.trimEnd() == companyInformation.description.trimEnd()) {
            message.error("vui lòng thay đổi dữ liệu")
        }
        else {
            const id = companyInformation.companyId
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/Companies/UpdateCompanyDescription`,
                { id, description },
                config
            );
            if (data.isSuccessed) {
                message.success('cập nhật thành công')
                getCompanyInformation();
                setEditDescription(false)
            }
            else {
                message.error(data.message)
            }
        }
    }

    function handleChangeWorkerNumber(value) {
        setWorkerNumber(value)
    }
    const handleSubmitWorkerNumber = async () => {
        if (parseInt(workerNumber) == companyInformation.workerNumber) {
            message.error("vui lòng thay đổi dữ liệu")
        }
        else {
            const id = companyInformation.companyId
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/Companies/UpdateCompanyWorkerNumber`,
                { id, workerNumber: parseInt(workerNumber) },
                config
            );
            if (data.isSuccessed) {
                message.success('cập nhật thành công')
                getCompanyInformation();
                setEditWorkerNumber(false)
            }
            else {
                message.error(data.message)
            }

        }
    }

    function handleChangeContactName(value) {
        setContactName(value)
    }
    const handleSubmitContactName = async () => {
        if (contactName.trimEnd() == companyInformation.contactName.trimEnd()) {
            message.error("vui lòng thay đổi dữ liệu")
        }
        else {
            const id = companyInformation.companyId
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/Companies/UpdateCompanyContactName`,
                { id, contactName },
                config
            );
            if (data.isSuccessed) {
                message.success('cập nhật thành công')
                getCompanyInformation();
                setEditContactName(false)
            }
            else {
                message.error(data.message)
            }

        }
    }



    const showModal = async () => {
        setIsModalVisible(true);
        await axios.get(`https://localhost:5001/api/Companies/GetBranchesNotExist?companyId=${companyInformation.companyId}`).then(
            res => {
                setBranches(res.data)
            }
        );
    };
    const handleCancelBranch = () => {
        setIsModalVisible(false);
    };
    const handleOkBranch = async () => {

        const companyId = companyInformation.companyId
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/AddBranchToCompany`,
            { companyId, branchId, address },
            config
        );
        if (data.isSuccessed) {
            message.success('Tạo mới thành công')
            getCompanyInformation();

            setIsModalVisible(false);
        }
        else {
            message.error(data.message)
        }

    };
    const onDeleteBranch = (id) => {
        Modal.confirm({
            title: `Bạn có chắc chắn muốn xóa trường này`,
            okText: "Có",
            cancelText: "Không",
            okType: "danger",
            onOk: () => {
                handleDeleteBranch(id);
            },
        });
    };
    const handleDeleteBranch = async (id) => {
        const { data } = await axios.delete(
            `https://localhost:5001/api/Companies/RemoveBranch?id=${id}&companyId=${companyInformation.companyId}`
        )
        if (data.isSuccessed) {
            message.success('Xóa thành công')

        }
        else {
            message.error(data.message)
        }
        getCompanyInformation();

    }
    const openAddCompanyImage = () => {
        addImages.current.click()
    }
    const addCompanyImages = async (event) => {

        const file = event.target.files[0]
        var bodyFormData = new FormData();
        bodyFormData.append('Image', file);
        bodyFormData.append('companyId', companyInformation.companyId);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/createCompanyImages`,
            bodyFormData,
            config
        );
        if (data.isSuccessed) {
            message.success('Thêm ảnh thành công')
            getCompanyInformation()
        }
        else {
            message.error(data.message)
        }
    }
    const onDeleteImage = (id) => {
        Modal.confirm({
            title: `Bạn có chắc chắn muốn xóa ảnh này?`,
            okText: "Có",
            cancelText: "Không",
            okType: "danger",
            onOk: () => {
                handleDeleteImage(id);
            },
        });
    };
    const handleDeleteImage = async (id) => {
        const { data } = await axios.delete(
            `https://localhost:5001/api/Companies/DeleteImages?id=${id}`
        )
        if (data.isSuccessed) {
            message.success('Xóa thành công')

        }
        else {
            message.error(data.message)
        }
        getCompanyInformation();

    }
    function scroll(scrollOffset) {

        scrollY.current.scrollLeft += scrollOffset;
    }
    function tranferPrice(data) {
        if (data) {
            data = data.toString();
            var cut;
            for (var i = data.length - 3; i > 0; i -= 3) {
                cut = data.slice(i, data.length);
                data = data.slice(0, i);
                data = data.concat('.')
                data = data.concat(cut)
            }
            return data
        } else {
            return 'undefined'
        }

    }
    return (
        <>
            {user?.role == 'company' ? <NavbarCompany /> : user?.role == "user" ? <NavbarUser /> : user?.role == "admin" ? <NavbarAdmin /> : <Navbar />}

            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <div className={styles.coverimage}>
                        <img className={styles.coverimage_image}
                            src={companyInformation ? companyInformation.companyCoverImage ?
                                'https://localhost:5001/coverImages/' + companyInformation.companyCoverImage.imagePath : ''
                                : ''}
                        />
                        {user?.role == "company" ? companyInformation ? companyInformation.companyCoverImage ?
                            <FcEditImage className={styles.coverimage_icon} onClick={openCoverImage} /> :
                            <FcAddImage className={styles.coverimage_icon} onClick={openAddCoverImage} /> : '' : null}
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={editCoverImage}
                            ref={inputCoverImage}
                            style={{ display: "none" }}
                        />
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={addCompanyCoverImage}
                            ref={addCoverImage}
                            style={{ display: "none" }}
                        />

                    </div>
                    <div className={styles.avatar}>
                        <img src={companyInformation ? 'https://localhost:5001/avatars/' + companyInformation.companyAvatar.imagePath : ''}
                            className={styles.avatar_image} />
                        {user?.role == "company" ? <FcEditImage className={styles.avatar_icon} onClick={openAvatar} /> : null}


                        <input
                            type="file"
                            id="avatar" name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={editAvatar}
                            ref={inputAvatar}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                {/* <div className={styles.follow}>

                </div> */}
                {user?.role == 'user' && isFollow == false ?
                    <div className={styles.follow}>
                        <Button onClick={handleFollowCompany} type='primary' style={styles.button}>Follow</Button>
                    </div>
                    :  
                    <div className={styles.follow}>
                    <Button onClick={handleUnFollowCompany} type='primary' style={styles.button}>UnFollow</Button>
                </div>
                }


                {user?.role == 'company' ? !editName ? <div className={styles.name} onDoubleClick={() => setEditName(true)}>{companyInformation ? companyInformation.name : ""}</div>
                    :
                    <div className={styles.editName}>
                        <Input value={name} onChange={(e) => handleChangeName(e.target.value)} className={styles.editName_input} />
                        <Button type='primary' onClick={handleSubmitName}>Thay đổi</Button>
                    </div>
                    :
                    <div className={styles.name}>{companyInformation ? companyInformation.name : ""}</div>
                }


                <div className={styles.description}>
                    {user?.role == 'company' ? !editDescription ? <div className={styles.content} onDoubleClick={() => setEditDescription(true)}>{companyInformation ? companyInformation.description : ""}</div>
                        :
                        <div className={styles.editDescription}>
                            <TextArea rows={6} value={description} onChange={(e) => handleChangeDescription(e.target.value)} />
                            <Button type='primary' onClick={handleSubmitDescription}>Thay đổi</Button>
                        </div>
                        :
                        <div className={styles.content} >{companyInformation ? companyInformation.description : ""}</div>
                    }

                    <div className={styles.scale}>
                        <TiGroup className={styles.scale_icon} />
                        <div className={styles.scale_title}>
                            Số lượng nhân viên: {user?.role == 'company' ? !editWorkerNumber ? <span onDoubleClick={() => setEditWorkerNumber(true)}>{companyInformation ? companyInformation.workerNumber : 0} nhân viên</span>
                                :
                                <div >
                                    <Input value={workerNumber} onChange={(e) => handleChangeWorkerNumber(e.target.value)} />
                                    <Button type='primary' onClick={handleSubmitWorkerNumber}>Thay đổi</Button>
                                </div>
                                :
                                <span>{companyInformation ? companyInformation.workerNumber : 0} nhân viên</span>
                            }


                        </div>
                    </div>
                    <div className={styles.contact}>
                        <RiContactsFill className={styles.contact_icon} />
                        <div className={styles.contact_title}>
                            Tên liên hệ:  {user?.role == 'company' ? !editContactName ? <span onDoubleClick={() => setEditContactName(true)}>{companyInformation ? companyInformation.contactName : 0}</span>
                                :
                                <div >
                                    <Input value={contactName} onChange={(e) => handleChangeContactName(e.target.value)} />
                                    <Button type='primary' onClick={handleSubmitContactName}>Thay đổi</Button>
                                </div>
                                :
                                <span >{companyInformation ? companyInformation.contactName : 0}</span>
                            }
                        </div>
                    </div>
                    <div className={styles.images}>
                        <div className={styles.images_title}>
                            Hình ảnh công ty
                        </div>
                        <BsCardImage className={styles.images_icon} />
                        {user?.role == 'company' ?
                            <BsPlusCircle className={styles.add_images} onClick={openAddCompanyImage} />

                            : null}
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={addCompanyImages}
                            ref={addImages}
                            style={{ display: "none" }}
                        />
                        <ul className={styles.images_list} ref={scrollY}>

                            {
                                companyInformation ? (
                                    <div className={styles.next_image}>
                                        <FcNext id='next-icon' className={styles.icon_next} onClick={() => scroll(200)} />

                                    </div>) : ''
                            }
                            {
                                companyInformation && companyInformation.companyImages?.length > 6 ? (
                                    <div className={styles.prev_image}>
                                        <FcPrevious id='prev-icon' className={styles.icon_prev} onClick={() => scroll(-200)} />

                                    </div>) : ''
                            }
                            {companyInformation ? companyInformation.companyImages.map((image) => (
                                <li key={image.id} className={styles.item}>
                                    <img src={'https://localhost:5001/images/' + image.imagePath}
                                        className={styles.item_image} />
                                    {user?.role == 'company' ?
                                        <TiDelete className={styles.images_delete} onClick={() => onDeleteImage(image.id)} />
                                        : null}
                                </li>
                            ))
                                : ''}


                        </ul>

                    </div>
                    <div className={styles.location}>
                        <div className={styles.title}>
                            Nơi làm việc
                        </div>
                        <ImLocation className={styles.icon} />
                        {user?.role == 'company' ?
                            <BsPlusCircle className={styles.icon_plus} onClick={showModal} />
                            : null}
                        <ul>
                            {companyInformation ? companyInformation.companyBranches.map((branch) =>
                            (
                                <li className={styles.content} key={branch.branchId}>
                                    <h2>{branch.city}</h2>
                                    <p>{branch.address}</p>
                                    {user?.role == 'company' ?
                                        <MdDelete className={styles.icon_delete_branch}
                                            onClick={() => { onDeleteBranch(branch.branchId) }} />
                                        : null}

                                </li>
                            )) : ""}
                        </ul>

                    </div>

                    <div className={styles.recruiments}>
                        <h3>Kết quả tìm kiếm việc làm</h3>
                        <p>{companyInformation ? companyInformation.companyRecruitments.length : 0} việc làm</p>
                        <ul className={styles.job_list}>
                            {companyInformation ? companyInformation.companyRecruitments.map((recruitment) =>
                            (
                                <Link to={'/recruitment/detail/' + recruitment.id}>
                                    <li className={styles.job}>
                                        <div className={styles.job_image}>
                                            <img src={'https://localhost:5001/avatars/' + companyInformation.companyAvatar.imagePath} className={styles.image} />
                                        </div>

                                        <div className={styles.job_content}>
                                            <div className={styles.title}>
                                                <h2>{recruitment.name}</h2>
                                                <div className={styles.date}>
                                                    <MdDateRange className={styles.date_icon} />
                                                    {recruitment.startDay.slice(0, 10)} - {recruitment.endDate.slice(0, 10)}
                                                </div>
                                            </div>
                                            <div className={styles.company}>
                                                {companyInformation.name}
                                            </div>
                                            <div className={styles.branch}>
                                                {recruitment.recruitmentBranches.map((city, index) => (
                                                    index == 0 ? city : ', ' + city

                                                ))}
                                            </div>
                                            <div className={styles.salary}>
                                                {tranferPrice(recruitment.salary)} VND
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            )) : ""}
                        </ul>
                    </div>
                </div>

                <Modal
                    title="Thêm chi nhánh"
                    visible={isModalVisible}
                    onCancel={handleCancelBranch}
                    footer={[
                        <Button key="back" onClick={handleCancelBranch}>
                            quay lại
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleOkBranch}>
                            Tạo mới
                        </Button>

                    ]}>
                    <Form.Item
                        label='Thành phố'
                    >
                        <Select style={{ width: '100%' }} onChange={(value) => setBranchId(value)}>
                            {branches ? branches.map((branch) =>
                            (
                                <Option key={branch.id} value={branch.id}>{branch.city}</Option>
                            )) : ""}
                        </Select>

                    </Form.Item>

                    <Form.Item
                        label='Địa chỉ'
                    >
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} />

                    </Form.Item>
                </Modal>

            </div>
            <Footer />
        </>
    )
}

export default ProfileCompany
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Input, Button, message, Modal, Select, Image } from "antd";
import NavbarCompany from "../../layouts/navbar/navbar-company";

import styles from "./chat.module.scss";
import logo from "../../assets/images/logo-facebook.png";
import clsx from "clsx";
import NavbarUser from "../../layouts/navbar/navbar-user";
import { GetAllChat, GetAllPersonChatChat } from "../../mocks";
import cty1 from "../../assets/images/cty1.jpeg";
import cty2 from "../../assets/images/cty2.jpeg";
import cty3 from "../../assets/images/cty3.jpeg";
import cty4 from "../../assets/images/cty4.png";

const listCompany = [
  {
    id: 432,
    img: cty1,
    name: "Lisod",
    lastContent: "Hôm nay",
    dateCreated: "2023-03-03T00:00:00",
  },
  {
    id: 434,
    img: cty2,
    name: "Tomosia",
    lastContent: "Hôm nay",
    dateCreated: "2023-03-03T00:00:00",
  },
  {
    id: 436,
    img: cty3,
    name: "Alaki",
    lastContent: "Hôm nay",
    dateCreated: "2023-03-03T00:00:00",
  },
  {
    id: 438,
    img: cty4,
    name: "FPT",
    lastContent: "Hôm nay",
    dateCreated: "2023-03-03T00:00:00",
  },
];
function Chat() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [personId, setPersonId] = useState();
  const [personChatList, setPersonChatList] = useState();
  const [personChatSearchList, setPersonChatSearchList] = useState();
  const [chatList, setChatList] = useState();
  const [chatContent, setChatContent] = useState();

  useEffect(() => {
    getPersonChat();
  }, []);
  const getPersonChat = async () => {
    await axios
      .get(
        `https://localhost:5001/api/Companies/GetAllPersonChatChat?id=${user.id}&role=${user.role}`
      )
      .then((res) => {
        setPersonId(res.data.resultObj[0].id);
        setPersonChatList(res.data.resultObj);
        setPersonChatSearchList(res.data.resultObj);
        getChatList(res.data.resultObj[0].id);
      });

    // setPersonId(GetAllPersonChatChat.data.resultObj[0].id);
    // setPersonChatList(GetAllPersonChatChat.data.resultObj);
    // setPersonChatSearchList(GetAllPersonChatChat.data.resultObj);
    // getChatList(GetAllPersonChatChat.data.resultObj[0].id);
  };
  const getChatList = async (id) => {
    if (user.role == "company") {
      await axios
        .get(
          `https://localhost:5001/api/Companies/GetAllChat?userId=${id}&companyId=${user.id}&role=${user.role}`
        )
        .then((res) => {
          setChatList(res.data.resultObj);
        });
      // setChatList(GetAllChat.data.resultObj);
    } else {
      await axios
      .get(
        `https://localhost:5001/api/Companies/GetAllChat?userId=${user.id}&companyId=${id}&role=${user.role}`
      )
      .then((res) => {
        setChatList(res.data.resultObj);
      });
      // setChatList(GetAllChat.data.resultObj);
    }
  };
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

  function ChangeChatPerson(id, event) {
    getChatList(id);
    setPersonId(id);
  }
  function handleSearch(keyword) {
    if (keyword) {
      const newData = personChatSearchList.filter(function (item) {
        const name = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = keyword.toUpperCase();
        return name.indexOf(textData) > -1;
      });
      setPersonChatList(newData);
    } else {
      setPersonChatList(personChatSearchList);
    }
  }
  const SubmitChat = async () => {
    console.log(chatContent);
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `https://localhost:5001/api/Companies/Chat`,
      {
        userId: user.role == "company" ? personId : user.id,
        companyId: user.role == "company" ? user.id : personId,
        content: chatContent,
        performer: user.role,
      },
      config
    );
    if (data.isSuccessed) {
      setChatContent("");
      getPersonChat();
      getChatList(personId);
    } else {
      message.error(data.message);
    }
  };
  return (
    <>
      {user.role === "user" ? <NavbarUser /> : <NavbarCompany />}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.persons}>
            <div className={styles.search}>
              <Input
                placeholder="Tìm kiếm"
                className={styles.search_input}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {[...(personChatList ?? []), ...listCompany].map(
              (person, index) => (
                <a
                  className={clsx(
                    styles.person_wrapper,
                    person.id == personId ? styles.active : styles.invalid
                  )}
                  key={index}
                  onClick={(e) => ChangeChatPerson(person.id, e)}
                >
                  <div
                    className={`${styles.person_image_wrapper} !rounded-full overflow-hidden`}
                  >
                    <Image
                      preview={false}
                      src={
                        person.img ??
                        "https://localhost:5001/avatars/" + person.avatarPath
                      }
                    />
                  </div>
                  <div className={styles.info}>
                    <h2>{person.name}</h2>
                    <div className={styles.info_wrapper}>
                      <p>{person.lastContent}</p>
                      <span>{timeCaculate(person.dateCreated)}</span>
                    </div>
                  </div>
                </a>
              )
            )}
          </div>
          <div className={styles.chatbox}>
            <div className={styles.header}>
              <img
                className={styles.header_image}
                src={
                  chatList
                    ? "https://localhost:5001/avatars/" + chatList.avatarPath
                    : ""
                }
              />
              <h2>{chatList ? chatList.name : ""}</h2>
            </div>
            <div className={styles.content}>
              {chatList
                ? chatList.content.map((content, index) =>
                    !(content.performer == user.role) ? (
                      <div className={styles.content_des_left} key={index}>
                        <p>{content.content}</p>
                      </div>
                    ) : (
                      <div className={styles.content_right_wrapper} key={index}>
                        <div className={styles.content_des_right}>
                          <p>
                            <span>{content.content}</span>
                          </p>
                        </div>
                      </div>
                    )
                  )
                : ""}
            </div>
            <div className={styles.message}>
              <Input
                placeholder="Aa"
                value={chatContent}
                className={styles.message_input}
                onChange={(e) => setChatContent(e.target.value)}
              />
              <Button
                type="primary"
                className={styles.message_btn}
                onClick={SubmitChat}
              >
                Gửi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;

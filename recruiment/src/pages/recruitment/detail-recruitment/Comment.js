import { Button, message, Input } from "antd";
import React, { useState } from "react";
import styles from "./detail-recruitment.module.scss";
import { timeCaculate } from "../../../utils/common";
import axios from "axios";
const { TextArea } = Input;

function Comment({
  comment,
  user,
  companyInformation,
  recruitment,
  getRecruitment,
  userInformation,
}) {
  const [inputChild, setInputChild] = useState("");
  const [rep, setRep] = useState(false);
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
  return (
    <>
      <div
        className="pl-[50px] mb-1 font-semibold text-[12px] !text-[#777] cursor-pointer"
        onClick={() => setRep(!rep)}
      >
        {!rep ? "Trả lời" : "Đóng bình luận"}
      </div>
      {rep && (
        <>
          {comment.childComments.map((childComment, index) => (
            <div className={styles.child_title_wrapper} key={index}>
              <div className={styles.child_header}>
                <div className={styles.child_image_wrapper}>
                  <img
                    src={
                      "https://localhost:5001/avatars/" +
                      childComment.avatarPath
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
            <div className="flex items-center space-x-2">
              <Input
                value={inputChild}
                autoSize
                size="large"
                onChange={(e) => setInputChild(e.target.value)}
                placeholder="Nhập bình luận"
                className="!min-w-[500px] !max-w-[500px]"
              />
              <Button
                size="large"
                type="primary"
                onClick={() => handleSubmitChildInput(inputChild, comment.id)}
              >
                Bình luận
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Comment;

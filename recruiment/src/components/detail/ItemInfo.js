import { Image } from "antd";
import React from "react";

function ItemInfo({ src, title, text }) {
  return (
    <div className="flex items-center space-x-2">
      <Image width={40} height={40} preview={false} src={src ?? ""} />
      <div className="flex flex-col items-start">
        <span className="text-[14px] text-[#666]">{title}</span>
        <span className="text-[16px] font-semibold">{text}</span>
      </div>
    </div>
  );
}

export default ItemInfo;

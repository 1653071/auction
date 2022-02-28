import React from "react";
import { Area } from "./SuccessJoinSeller.style";
import image from "./Success.jpg";
import { Image } from "antd";

export default function SuccessJoinSeller() {
  return (
    <Area>
      <p className="success-title">Đăng ký thành công chờ được duyệt .....</p>
      <Image
        width={200}
        src={image}
      />
      <p className="introduction">
        Cảm ơn bạn đã quan tâm đến cơ hội đăng ký cùng hệ thống đấu giá. Đây là
        trang đăng ký chính thức từ . Bạn vui lòng xem qua quy trình đăng ký đối
        tác theo hình bên dưới và thường xuyên kiểm tra email để nhận thông báo
        mới nhất từ phòng tuyển dụng đối tác bán hàng
      </p>
      
    </Area>
  );
}

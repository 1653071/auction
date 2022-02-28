import React,{useState} from "react";
import { ProfileWrapper } from "./Profile.style";
import { Descriptions, Button,Modal } from "antd";
import { Title } from "../Invidual.style";
import ChangePassForm from "./ChangePassForm/ChangePassForm";
import ChangeProfile from "./ChangeProfile/ChangeProfile";
export default function Profile() {
  const [visibleChangepass, setVisibleChangepass] = useState(false);
  const [visibleInfo, setVisibleChangeInfo] = useState(false);
  return (
    <ProfileWrapper>
      <Descriptions
        title="Thông tin"
        extra={
          <>
            <Button type="primary" onClick={() => setVisibleChangepass(true)}>Edit Password</Button>
            <Button type="primary" onClick={() => setVisibleChangeInfo(true)}>Edit Name</Button>
          </>
        }
      >
        <Descriptions.Item label="Tên đăng nhập">
          {localStorage.username}
        </Descriptions.Item>
        <Descriptions.Item label="Tên">{localStorage.name}</Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {localStorage.birthdate}
        </Descriptions.Item>
        <Descriptions.Item label="Mail">{localStorage.mail}</Descriptions.Item>
      </Descriptions>
      <Modal
        title="Thay đổi thông tin "
        centered
        visible={visibleInfo}
        onOk={() => setVisibleChangeInfo(false)}
        onCancel={() => setVisibleChangeInfo(false)}
        width={1000}
      >
        <ChangeProfile />
      </Modal>
      <Modal
        title="Change Password"
        centered
        visible={visibleChangepass}
        onOk={() => setVisibleChangepass(false)}
        onCancel={() => setVisibleChangepass(false)}
        width={1000}
      >
        <ChangePassForm />
      </Modal>
    </ProfileWrapper>
  );
}

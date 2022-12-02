import React from "react";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { signUpAction } from "../../../action/user.action";

export default function RegisterForm({ handleChangeTab }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (formData) => {
    dispatch(signUpAction(formData));
  };

  return (
    <>
      <h1 style={{ color: "white", fontWeight: "bold", marginBottom: 0 }}>
        Memory Dump
      </h1>
      <h6
        style={{
          color: "white",
          fontWeight: "normal",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        Register your new memory dump account!
      </h6>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        requiredMark={false}
        colon={false}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="email"
          label={<label style={{ color: "white" }}>Email</label>}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label={<label style={{ color: "white" }}>Password</label>}
          rules={[{ required: true, message: "Please input your password!" }]}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input.Password
            placeholder="Input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Register
        </Button>
      </Form>
      <h6
        style={{
          color: "white",
          fontWeight: "normal",
          marginBottom: 20,
          marginTop: 20,
          textDecorationLine: "underline",
          cursor: "pointer",
        }}
        onClick={handleChangeTab}
      >
        Already have an account? Login now
      </h6>
    </>
  );
}

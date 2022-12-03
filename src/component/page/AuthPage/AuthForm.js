import React from "react";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ChangeTabButton, TagLine, Title } from "./CustomStyles";

export default function AuthForm({
  handleChangeTab,
  handleSubmit,
  tagline,
  changeTabButtonText,
  submitButtonText,
}) {
  const [form] = Form.useForm();

  const onFinish = (formData) => {
    handleSubmit(formData);
  };

  return (
    <>
      <Title>Memory Dump</Title>
      <TagLine>{tagline}</TagLine>
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
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          {submitButtonText}
        </Button>
      </Form>
      <ChangeTabButton onClick={handleChangeTab}>
        {changeTabButtonText}
      </ChangeTabButton>
    </>
  );
}

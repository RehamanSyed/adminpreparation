import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { createStack, useCreateStack } from "../hooks/useStack";

const StackForm = ({ setIsModalOpen }) => {
  const [api, contextHolder] = notification.useNotification();
  const { createMutation } = useCreateStack();
  const onFinish = (formData) => {
    createMutation.mutate(formData.techname);
    setIsModalOpen(false);
    api.info({
      message: `Added Successfully`,
      description: "Item added",
      placement: "bottom",
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="techname"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input placeholder="sadfdsf" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Add Stack
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default StackForm;

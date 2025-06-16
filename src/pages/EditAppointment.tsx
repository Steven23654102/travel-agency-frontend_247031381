// src/pages/EditAppointment.tsx
import React, { useEffect, useState } from "react";
import {
  Form, Input, Button, DatePicker, Select, TimePicker, Card, message
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAppointmentById,
  updateAppointment
} from "../api/appointments";
import dayjs from "dayjs";

const { Option } = Select;

export default function EditAppointment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!id) return;
  getAppointmentById(Number(id))
    .then((data) => {
      form.setFieldsValue({
        ...data,                      // data 現在已經是物件
        dob:  data.dob  ? dayjs(data.dob)           : undefined,
        date: data.date ? dayjs(data.date)          : undefined,
        time: data.time ? dayjs(data.time, 'HH:mm') : undefined,
      });
      setLoading(false);             // ← 放到 then 裡最安全
    })
    .catch(() => {
      message.error('載入失敗');
      setLoading(false);             // 失敗也要關骨架
    });
}, [id]);


  const onFinish = async (values: any) => {
    try {
      await updateAppointment(Number(id), {
        ...values,
        dob: values.dob?.format("YYYY-MM-DD"),
        date: values.date?.format("YYYY-MM-DD"),
        time: values.time?.format("HH:mm"),
      });
      message.success("更新成功");
      navigate("/appointments");
    } catch {
      message.error("更新失敗");
    }
  };

  return (
    <Card title="編輯預約" loading={loading} style={{ margin: 32 }}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="English Name" name="name_en" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Chinese Name" name="name_zh">
          <Input />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select>
            <Option value="M">Male</Option>
            <Option value="F">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date of Birth" name="dob">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Appointment Date" name="date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Appointment Time" name="time">
          <TimePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">更新預約</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

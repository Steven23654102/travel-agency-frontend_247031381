// src/pages/AppointmentForm.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  TimePicker,
  Row,
  Col,
  Card,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { createAppointment } from '../api/appointments';
import type { Appointment } from '../api/appointments';

const { Option } = Select;

/* ---------- 自訂驗證 ---------- */
const hkidRule = {
  validator(_: unknown, value: string) {
    return !value || /^[A-Z]\d{6}\(\d\)$/.test(value)
      ? Promise.resolve()
      : Promise.reject(new Error('請輸入有效 HKID (如 A123456(7))'));
  },
};

const phoneRule = {
  validator(_: unknown, value: string) {
    return !value || /^\d{8}$/.test(value)
      ? Promise.resolve()
      : Promise.reject(new Error('電話必須是 8 位數字'));
  },
};
/* -------------------------------- */

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  /* 送出表單 -------------------------------------------------------- */
  const onFinish = async (values: any /** AntD 回傳的原始值 */) => {
    /** 把 dayjs 轉成字串再送到後端 ---------------------------------- */
    const payload: Appointment = {
      ...values,
      dob:  values.dob  ? dayjs(values.dob).format('YYYY-MM-DD') : undefined,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
      time: values.time ? dayjs(values.time).format('HH:mm')      : undefined,
    };

    try {
      setSubmitting(true);
      await createAppointment(payload);
      message.success('預約成功！');
      navigate('/appointments');
    } catch (err) {
      message.error('預約失敗，請稍後再試');
    } finally {
      setSubmitting(false);
    }
  };
  /* ----------------------------------------------------------------- */

  return (
    <Row justify="center" style={{ marginTop: 32 }}>
      <Col xs={24} sm={20} md={16} lg={10}>
        <Card title="Create Appointment" bordered>
          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            {/* English Name */}
            <Form.Item
              label="English Name"
              name="name_en"
              rules={[{ required: true, message: 'English name is required' }]}
            >
              <Input placeholder="Chan Tai Man" />
            </Form.Item>

            {/* Chinese Name */}
            <Form.Item label="Chinese Name" name="name_zh">
              <Input placeholder="陳大文" />
            </Form.Item>

            {/* Gender */}
            <Form.Item label="Gender" name="gender">
              <Select placeholder="Select Gender" allowClear>
                <Option value="M">Male</Option>
                <Option value="F">Female</Option>
              </Select>
            </Form.Item>

            {/* DOB */}
            <Form.Item label="Date of Birth" name="dob">
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>

            {/* Address */}
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>

            {/* HKID */}
            <Form.Item
              label="HKID"
              name="hkid"
              rules={[hkidRule]}
              tooltip="格式：A123456(7)"
            >
              <Input />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              label="Phone"
              name="phone"
              rules={[phoneRule]}
              tooltip="8 位數字"
            >
              <Input />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Invalid email' },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Date + Time */}
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Appointment Date" name="date">
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Appointment Time" name="time">
                  <TimePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>
              </Col>
            </Row>

            {/* Location */}
            <Form.Item label="Location" name="location">
              <Input />
            </Form.Item>

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitting}
              >
                提交預約
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

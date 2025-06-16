// src/pages/AppointmentList.tsx
import React, { useEffect, useState } from "react";
import {
  getAppointments,
  deleteAppointment,
  Appointment,
} from "../api/appointments";
import { List, message, Empty, Card, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function AppointmentList() {
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); //  搜尋文字
  const navigate = useNavigate();

  const loadData = () => {
    setLoading(true);
    getAppointments()
      .then((res) => setData(res))
      .catch(() => message.error("載入預約資料失敗"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteAppointment(id);
      message.success("刪除成功");
      loadData(); // 重新載入
    } catch {
      message.error("刪除失敗");
    }
  };

  //  過濾後資料
  const filteredData = data.filter(
    (item) =>
      item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card title="預約列表" style={{ margin: 32 }}>
      <Input.Search
        placeholder="搜尋英文姓名或 Email"
        allowClear
        enterButton
        onSearch={(value) => setSearchTerm(value)}
        style={{ marginBottom: 16 }}
      />

      {filteredData.length === 0 ? (
        <Empty description="目前尚無符合的預約資料" />
      ) : (
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={filteredData}
          renderItem={(item, idx) => (
            <List.Item
              actions={[
                <Button
                  danger
                  size="small"
                  onClick={() => handleDelete(item.id)}
                >
                  刪除
                </Button>,
                <Button
                  type="link"
                  size="small"
                  onClick={() => navigate(`/appointments/${item.id}/edit`)}
                >
                  編輯
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`${idx + 1}. ${item.name_en}`}
                description={`${item.email} ｜ ${item.date} ${item.time}`}
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}

import { Layout, Table, notification, theme } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDataOrdersAPI } from "../../apis/handleDataAPI";

const { Content } = Layout;

function ImportAndDeliveryGoods() {
  const [dataValue, setDataValue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await getDataOrdersAPI(token, 1, 10);
      console.log(res);
      const orders = res.data.data;

      // Lọc các order có order_status = 2
      const filteredOrders = orders.filter((order) => order.order_status == 7);

      const transformedData = filteredOrders.map((item) => ({
        key: item.order_id,
        id: item.order_id,
        revenue: item.total,
        datetime: formatDate(item.order_date),
        datetime1: formatDate(item.estimated_delivery_date),
        actprocessing_staffion: item.processing_employee,
        file_processing_design: item.design_confirm_employee,
        status: "Đang giao",
        vat: "Xem hóa đơn",
      }));
      setDataValue(transformedData);
      console.log("Orders with status 2: ", filteredOrders);
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "Không xác định";
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return "Định dạng ngày không hợp lệ";
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetchData();
    if (location.state?.message) {
      api.success({
        message: "Thông báo",
        description: location.state.message,
      });
    }
  }, [location.state]);

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
      render: (text, record) => {
        return (
          <Link to={`/nhap-va-giao-hang/edit-nhap-va-giao-hang/${record.id}`}>
            #{text}
          </Link>
        );
      },
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (text) => (
        <div style={{ whiteSpace: "normal" }}>
          {text.split("  ").map((item, index) => (
            <div key={index}>
              {" "}
              {new Intl.NumberFormat("vi-VN").format(item)} đ{" "}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Ngày nhận",
      dataIndex: "datetime1",
      key: "datetime1",
    },
    {
      title: "Tình trạng",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "1":
            color = "orange";
            break;
          case "2":
            color = "blue";
            break;
          case "3":
            color = "green";
            break;
          case "4":
            color = "red";
            break;
          default:
            color = "black";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Nhân viên xử lý",
      key: "actprocessing_staffion",
      dataIndex: "actprocessing_staffion",
    },
    {
      title: "Thiết kế xử lý file",
      key: "file_processing_design",
      dataIndex: "file_processing_design",
    },
    {
      title: "Hóa đơn VAT",
      key: "vat",
      dataIndex: "vat",
      render: (text, record) => (
        <Link
          to={{
            pathname: `/nhap-va-giao-hang/bill`,
          }}
          state={{
            orderId: record.id,
          }}
        >
          {text}
        </Link>
      ),
    },
  ];

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        overflow: "auto",
      }}
    >
      {contextHolder}
      <Table
        columns={columns}
        dataSource={dataValue} // Chỉ dữ liệu đã lọc
        pagination={{
          current: currentPage, // Trang hiện tại
          pageSize: 15, // Số bản ghi trên mỗi trang
          total: dataValue.length, // Sử dụng số lượng bản ghi đã lọc
          position: ["bottomCenter"],
          onChange: (page) => {
            setCurrentPage(page); // Cập nhật trang hiện tại
          },
        }}
      />
    </Content>
  );
}

export default ImportAndDeliveryGoods;

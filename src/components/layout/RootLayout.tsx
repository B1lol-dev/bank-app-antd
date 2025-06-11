import { Layout, Menu, Avatar, Space } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  TransactionOutlined,
  SendOutlined,
  UserOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../stores/auth.store";

const { Header, Sider, Content } = Layout;

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/transactions",
      icon: <TransactionOutlined />,
      label: "Transactions",
    },
    {
      key: "/transfer",
      icon: <SendOutlined />,
      label: "Transfer",
    },
  ];

  return (
    <Layout className="min-h-screen!">
      <Sider theme="light" width={250} className="shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <BankOutlined className="text-2xl text-blue-600" />
            <span className="text-xl font-bold text-gray-800">SecureBank</span>
          </div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="border-r-0"
        />
      </Sider>
      <Layout>
        <Header className="bg-white shadow-sm px-6 flex justify-between items-center">
          <div className="text-lg font-semibold text-white">
            Welcome, {user?.name}
          </div>
          <Space>
            <span className="text-sm text-white">
              Account: {user?.accountNumber}
            </span>
            <Avatar size="small" icon={<UserOutlined />} />
          </Space>
        </Header>
        <Content className="p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

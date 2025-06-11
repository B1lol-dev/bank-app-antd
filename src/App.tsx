import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import { ConfigProvider } from "antd";
import DashboardPage from "./pages/Dashboard";
import TransactionsPage from "./pages/Transactions";
import TransferPage from "./pages/Transfer";

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 8,
          },
        }}
      >
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route element={<RootLayout />} path="/">
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/transfer" element={<TransferPage />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </div>
      </ConfigProvider>
    </>
  );
};

export default App;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Row, Col, Statistic, List, Tag, Button } from "antd";
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SendOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { useBankStore } from "../stores/bank.store";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { transactions } = useBankStore();

  const userTransactions = transactions
    .filter((t: { userId: any }) => t.userId === user?.id)
    .slice(0, 5);

  const totalIncome = transactions
    .filter(
      (t: { userId: any; type: string }) =>
        t.userId === user?.id && t.type === "deposit"
    )
    .reduce((sum: any, t: { amount: any }) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(
      (t: { userId: any; type: string }) =>
        t.userId === user?.id &&
        (t.type === "withdrawal" || t.type === "transfer")
    )
    .reduce((sum: any, t: { amount: any }) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Current Balance"
              value={user?.balance || 0}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Income"
              value={totalIncome}
              precision={2}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Expenses"
              value={totalExpenses}
              precision={2}
              prefix={<ArrowDownOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="Recent Transactions"
            extra={
              <Button type="link" onClick={() => navigate("/transactions")}>
                View All
              </Button>
            }
          >
            <List
              dataSource={userTransactions}
              renderItem={(transaction: any) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div className="flex justify-between items-center">
                        <span>{transaction.description}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold ${
                              transaction.type === "deposit"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "deposit" ? "+" : "-"}$
                            {transaction.amount.toFixed(2)}
                          </span>
                          <Tag
                            color={
                              transaction.status === "completed"
                                ? "green"
                                : transaction.status === "pending"
                                ? "orange"
                                : "red"
                            }
                          >
                            {transaction.status}
                          </Tag>
                        </div>
                      </div>
                    }
                    description={new Date(
                      transaction.createdAt
                    ).toLocaleDateString()}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Button
                type="primary"
                icon={<SendOutlined />}
                block
                onClick={() => navigate("/transfer")}
              >
                Send Money
              </Button>
              <Button
                icon={<PlusOutlined />}
                block
                onClick={() => navigate("/transactions")}
              >
                View Transactions
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

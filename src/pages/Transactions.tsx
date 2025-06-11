/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Table, Tag, Input, Select, DatePicker, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAuthStore } from "../stores/auth.store";
import { useBankStore } from "../stores/bank.store";

const { RangePicker } = DatePicker;

export default function TransactionsPage() {
  const { user } = useAuthStore();
  const { transactions } = useBankStore();

  const userTransactions = transactions.filter(
    (t: any) => t.userId === user?.id
  );

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag
          color={
            type === "deposit"
              ? "green"
              : type === "withdrawal"
              ? "red"
              : "blue"
          }
        >
          {type.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Deposit", value: "deposit" },
        { text: "Withdrawal", value: "withdrawal" },
        { text: "Transfer", value: "transfer" },
      ],
      onFilter: (value: any, record: any) => record.type === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number, record: any) => (
        <span
          className={`font-semibold ${
            record.type === "deposit" ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.type === "deposit" ? "+" : "-"}${amount.toFixed(2)}
        </span>
      ),
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "completed"
              ? "green"
              : status === "pending"
              ? "orange"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Completed", value: "completed" },
        { text: "Pending", value: "pending" },
        { text: "Failed", value: "failed" },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Transaction History
        </h1>
        <p className="text-gray-600">View all your account transactions</p>
      </div>

      <Card>
        <div className="mb-4">
          <Space wrap>
            <Input
              placeholder="Search transactions..."
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
            />
            <Select
              placeholder="Filter by type"
              style={{ width: 150 }}
              allowClear
            >
              <Select.Option value="deposit">Deposit</Select.Option>
              <Select.Option value="withdrawal">Withdrawal</Select.Option>
              <Select.Option value="transfer">Transfer</Select.Option>
            </Select>
            <RangePicker />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={userTransactions}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} transactions`,
          }}
        />
      </Card>
    </div>
  );
}

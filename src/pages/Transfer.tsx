/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Form, Input, Button, InputNumber, message, Divider } from "antd";
import { SendOutlined, DollarOutlined } from "@ant-design/icons";
import { useAuthStore } from "../stores/auth.store";
import { useBankStore } from "../stores/bank.store";

export default function TransferPage() {
  const [form] = Form.useForm();
  const { user } = useAuthStore();
  const { transfer, isLoading } = useBankStore();

  const onFinish = async (values: any) => {
    if (!user) return;

    if (values.amount > user.balance) {
      message.error("Insufficient balance!");
      return;
    }

    const success = await transfer({
      fromUserId: user.id,
      toAccountNumber: values.accountNumber,
      amount: values.amount,
      description: values.description,
    });

    if (success) {
      message.success("Transfer completed successfully!");
      form.resetFields();
    } else {
      message.error(
        "Transfer failed. Please check the account number and try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Send Money</h1>
        <p className="text-gray-600">Transfer money to another account</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${user?.balance?.toFixed(2) || "0.00"}
                </p>
              </div>
              <DollarOutlined className="text-3xl text-blue-600" />
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish} size="large">
            <Form.Item
              name="accountNumber"
              label="Recipient Account Number"
              rules={[
                {
                  required: true,
                  message: "Please enter the recipient account number!",
                },
                {
                  min: 6,
                  message: "Account number must be at least 6 characters!",
                },
              ]}
            >
              <Input placeholder="Enter account number (e.g., ACC002)" />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                { required: true, message: "Please enter the amount!" },
                {
                  type: "number",
                  min: 0.01,
                  message: "Amount must be greater than 0!",
                },
              ]}
            >
              <InputNumber
                className="w-full"
                placeholder="0.00"
                prefix="$"
                precision={2}
                max={user?.balance || 0}
              />
            </Form.Item>

            <Form.Item name="description" label="Description (Optional)">
              <Input.TextArea
                placeholder="Enter transfer description..."
                rows={3}
              />
            </Form.Item>

            <Divider />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
                loading={isLoading}
                size="large"
                className="w-full"
              >
                Send Money
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Demo Account Numbers:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• ACC002 - Jane Smith</li>
              <li>• ACC001 - John Doe</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

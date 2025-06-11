export interface ITransaction {
  id: string;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  description: string;
  userId: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export interface ITransferRequest {
  fromUserId: string;
  toAccountNumber: string;
  amount: number;
  description?: string;
}

import { create } from "zustand";
import type { ITransaction, ITransferRequest } from "../types/transactions";
import type { IUser } from "../types/user";

interface IBankState {
  transactions: ITransaction[];
  users: IUser[];
  isLoading: boolean;
  addTransaction: (transaction: Omit<ITransaction, "id" | "createdAt">) => void;
  transfer: (transferData: ITransferRequest) => Promise<boolean>;
}

export const useBankStore = create<IBankState>((set, get) => ({
  transactions: [
    {
      id: "1",
      type: "deposit",
      amount: 1000,
      description: "Welcome bonus",
      userId: "2",
      createdAt: new Date().toISOString(),
      status: "completed",
    },
    {
      id: "2",
      type: "transfer",
      amount: 500,
      description: "Transfer to John Smith",
      userId: "2",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: "completed",
    },
  ],
  users: [
    {
      id: "2",
      email: "user@bank.com",
      name: "John Doe",
      role: "user",
      accountNumber: "ACC001",
      balance: 5000,
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      email: "jane@bank.com",
      name: "Jane Smith",
      role: "user",
      accountNumber: "ACC002",
      balance: 3200,
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ],
  isLoading: false,

  addTransaction: (transaction) => {
    const newTransaction: ITransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },

  transfer: async (transferData) => {
    set({ isLoading: true });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { users } = get();
    const fromUser = users.find((u) => u.id === transferData.fromUserId);
    const toUser = users.find(
      (u) => u.accountNumber === transferData.toAccountNumber
    );

    if (!fromUser || !toUser || fromUser.balance < transferData.amount) {
      set({ isLoading: false });
      return false;
    }

    set((state) => ({
      users: state.users.map((user) => {
        if (user.id === transferData.fromUserId) {
          return { ...user, balance: user.balance - transferData.amount };
        }
        if (user.accountNumber === transferData.toAccountNumber) {
          return { ...user, balance: user.balance + transferData.amount };
        }
        return user;
      }),
      isLoading: false,
    }));

    get().addTransaction({
      type: "transfer",
      amount: transferData.amount,
      description: `Transfer to ${toUser.name}`,
      userId: transferData.fromUserId,
      status: "completed",
    });

    return true;
  },
}));

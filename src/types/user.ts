export interface IUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  accountNumber: string;
  balance: number;
  status?: "active" | "suspended";
  createdAt: string;
}

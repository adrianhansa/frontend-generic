"use client";
import { useUserStore } from "./store/auth";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  return (
    <div>
      <h1>{user?.lastName}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;

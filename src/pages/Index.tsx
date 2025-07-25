import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  const handleLogin = (username: string, role: string) => {
    setUser({ username, role });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn || !user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      username={user.username}
      role={user.role}
      onLogout={handleLogout}
    />
  );
};

export default Index;

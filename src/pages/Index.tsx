import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";
import { Navigation } from "@/components/Navigation";
import { StudentManagement } from "@/components/StudentManagement";
import { TeacherManagement } from "@/components/TeacherManagement";
import { AttendanceManagement } from "@/components/AttendanceManagement";
import { GradesManagement } from "@/components/GradesManagement";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [currentView, setCurrentView] = useState("dashboard");

  const handleLogin = (username: string, role: string) => {
    setUser({ username, role });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentView("dashboard");
  };

  if (!isLoggedIn || !user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'grades':
        return <GradesManagement />;
      default:
        return <Dashboard username={user.username} role={user.role} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'dashboard' ? (
        <Dashboard username={user.username} role={user.role} onLogout={handleLogout} />
      ) : (
        <>
          <header className="bg-card border-b shadow-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-xl font-semibold text-arabic">نظام إدارة المدرسة</h1>
                <button onClick={handleLogout} className="text-primary hover:text-primary-glow">
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </header>
          <Navigation 
            currentView={currentView} 
            onViewChange={setCurrentView} 
            userRole={user.role} 
          />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderCurrentView()}
          </main>
        </>
      )}
    </div>
  );
};

export default Index;

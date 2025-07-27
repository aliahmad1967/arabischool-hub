import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";
import { Navigation } from "@/components/Navigation";
import { StudentManagement } from "@/components/StudentManagement";
import { TeacherManagement } from "@/components/TeacherManagement";
import { AttendanceManagement } from "@/components/AttendanceManagement";
import { GradesManagement } from "@/components/GradesManagement";
import { Student, Teacher, AttendanceRecord, Grade } from "@/types";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [currentView, setCurrentView] = useState("dashboard");

  // Initialize data from localStorage or use defaults
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('school-students');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: 'أحمد محمد علي',
        studentId: 'STD001',
        grade: 'الصف السادس',
        class: 'أ',
        dateOfBirth: '2012-05-15',
        parentName: 'محمد علي أحمد',
        parentPhone: '0501234567',
        address: 'الرياض، حي النزهة',
        enrollmentDate: '2023-09-01'
      },
      {
        id: '2',
        name: 'فاطمة أحمد حسن',
        studentId: 'STD002',
        grade: 'الصف الخامس',
        class: 'ب',
        dateOfBirth: '2013-08-22',
        parentName: 'أحمد حسن محمد',
        parentPhone: '0507654321',
        address: 'جدة، حي الصفا',
        enrollmentDate: '2023-09-01'
      },
      {
        id: '3',
        name: 'محمد عبدالله سالم',
        studentId: 'STD003',
        grade: 'الصف السادس',
        class: 'أ',
        dateOfBirth: '2012-12-10',
        parentName: 'عبدالله سالم أحمد',
        parentPhone: '0551122334',
        address: 'الدمام، حي الفيصلية',
        enrollmentDate: '2023-09-01'
      }
    ];
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('school-teachers');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: 'أستاذ محمد أحمد',
        teacherId: 'TCH001',
        subject: 'الرياضيات',
        phone: '0501234567',
        email: 'mohamed.ahmed@school.edu',
        hireDate: '2020-09-01',
        salary: 8000,
        classes: ['الصف السادس أ', 'الصف السادس ب']
      },
      {
        id: '2',
        name: 'أستاذة فاطمة سالم',
        teacherId: 'TCH002',
        subject: 'اللغة العربية',
        phone: '0507654321',
        email: 'fatima.salem@school.edu',
        hireDate: '2019-09-01',
        salary: 7500,
        classes: ['الصف الخامس أ', 'الصف الخامس ب']
      },
      {
        id: '3',
        name: 'أستاذ عبدالله محمد',
        teacherId: 'TCH003',
        subject: 'العلوم',
        phone: '0551122334',
        email: 'abdullah.mohamed@school.edu',
        hireDate: '2021-09-01',
        salary: 7000,
        classes: ['الصف الرابع أ']
      }
    ];
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('school-attendance');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        studentId: 'STD001',
        studentName: 'أحمد محمد علي',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        grade: 'الصف السادس',
        class: 'أ',
        notes: ''
      },
      {
        id: '2',
        studentId: 'STD002',
        studentName: 'فاطمة أحمد حسن',
        date: new Date().toISOString().split('T')[0],
        status: 'absent',
        grade: 'الصف الخامس',
        class: 'ب',
        notes: 'مرض'
      },
      {
        id: '3',
        studentId: 'STD003',
        studentName: 'محمد عبدالله سالم',
        date: new Date().toISOString().split('T')[0],
        status: 'late',
        grade: 'الصف السادس',
        class: 'أ',
        notes: 'تأخر في المواصلات'
      }
    ];
  });

  const [grades, setGrades] = useState<Grade[]>(() => {
    const saved = localStorage.getItem('school-grades');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('school-students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('school-teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('school-attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('school-grades', JSON.stringify(grades));
  }, [grades]);

  // Calculate dynamic stats
  const stats = {
    totalStudents: students.length,
    totalTeachers: teachers.length,
    attendanceRate: attendanceRecords.length > 0 ? 
      `${Math.round((attendanceRecords.filter(r => r.status === 'present').length / attendanceRecords.length) * 100)}%` : "0%",
    avgGrade: grades.length > 0 ? 
      `${Math.round(grades.reduce((sum, grade) => sum + (grade.score / grade.maxScore * 100), 0) / grades.length)}%` : "0%"
  };

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
      case 'dashboard':
        return <Dashboard username={user.username} role={user.role} onLogout={handleLogout} onNavigate={setCurrentView} stats={stats} />;
      case 'students':
        return <StudentManagement students={students} setStudents={setStudents} />;
      case 'teachers':
        return <TeacherManagement teachers={teachers} setTeachers={setTeachers} />;
      case 'attendance':
        return <AttendanceManagement 
          students={students} 
          attendanceRecords={attendanceRecords} 
          setAttendanceRecords={setAttendanceRecords} 
        />;
      case 'grades':
        return <GradesManagement students={students} grades={grades} setGrades={setGrades} />;
      default:
        return <Dashboard username={user.username} role={user.role} onLogout={handleLogout} onNavigate={setCurrentView} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'dashboard' ? (
        <Dashboard username={user.username} role={user.role} onLogout={handleLogout} onNavigate={setCurrentView} stats={stats} />
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

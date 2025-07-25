import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  BookOpen,
  Home,
  ChevronRight
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: string;
}

export const Navigation = ({ currentView, onViewChange, userRole }: NavigationProps) => {
  const menuItems = [
    {
      id: 'dashboard',
      title: 'الرئيسية',
      icon: Home,
      roles: ['admin', 'teacher', 'student', 'parent']
    },
    {
      id: 'students',
      title: 'إدارة الطلاب',
      icon: Users,
      roles: ['admin', 'teacher']
    },
    {
      id: 'teachers',
      title: 'إدارة المعلمين',
      icon: GraduationCap,
      roles: ['admin']
    },
    {
      id: 'attendance',
      title: 'الحضور والغياب',
      icon: CalendarCheck,
      roles: ['admin', 'teacher']
    },
    {
      id: 'grades',
      title: 'الدرجات والتقييم',
      icon: BookOpen,
      roles: ['admin', 'teacher', 'student', 'parent']
    }
  ];

  const availableItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <nav className="bg-card border-b shadow-card sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 space-x-reverse overflow-x-auto py-2">
          {availableItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className="flex items-center space-x-2 space-x-reverse whitespace-nowrap text-arabic min-w-fit"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
                {isActive && <ChevronRight className="w-3 h-3 rotate-180" />}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
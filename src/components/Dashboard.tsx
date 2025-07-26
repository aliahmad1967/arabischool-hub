import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  TrendingUp,
  BookOpen,
  DollarSign,
  Bell,
  MessageSquare
} from "lucide-react";

interface DashboardProps {
  username: string;
  role: string;
  onLogout: () => void;
  onNavigate?: (view: string) => void;
}

export const Dashboard = ({ username, role, onLogout, onNavigate }: DashboardProps) => {
  const getRoleInArabic = (role: string) => {
    switch (role) {
      case "admin": return "مدير";
      case "teacher": return "معلم";
      case "student": return "طالب";
      case "parent": return "ولي أمر";
      default: return "مستخدم";
    }
  };

  const stats = [
    {
      title: "عدد الطلاب الكلي",
      value: "1,247",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "عدد المعلمين",
      value: "89",
      icon: GraduationCap,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "نسبة الحضور اليومي",
      value: "94.2%",
      icon: CalendarCheck,
      color: "text-primary-glow",
      bgColor: "bg-primary-glow/10"
    },
    {
      title: "الأداء الأسبوعي",
      value: "87.5%",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const quickActions = [
    {
      title: "إدارة الطلاب",
      description: "عرض وإدارة بيانات الطلاب",
      icon: Users,
      color: "bg-gradient-primary",
      action: "students"
    },
    {
      title: "إدارة المعلمين",
      description: "عرض وإدارة بيانات المعلمين",
      icon: GraduationCap,
      color: "bg-gradient-success",
      action: "teachers"
    },
    {
      title: "تسجيل الحضور",
      description: "متابعة حضور وغياب الطلاب",
      icon: CalendarCheck,
      color: "bg-gradient-warm",
      action: "attendance"
    },
    {
      title: "إدارة الدرجات",
      description: "إدخال ومتابعة درجات الطلاب",
      icon: BookOpen,
      color: "bg-gradient-primary",
      action: "grades"
    }
  ];

  const handleQuickAction = (actionType: string) => {
    if (onNavigate) {
      onNavigate(actionType);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-arabic">
                <h1 className="text-xl font-semibold">نظام إدارة المدرسة</h1>
                <p className="text-sm text-muted-foreground">
                  مرحباً {getRoleInArabic(role)} {username}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="text-arabic">
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card border-0 transition-smooth hover:shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-arabic">
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-arabic text-xl">الإجراءات السريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-lg border border-border hover:border-primary/50 transition-smooth cursor-pointer hover:shadow-card"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center transition-smooth group-hover:scale-110`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-arabic">
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-arabic">النشاط الأخير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: "تم تسجيل حضور الصف السادس أ", time: "منذ 10 دقائق", type: "attendance" },
                { action: "تم إضافة درجات امتحان الرياضيات", time: "منذ 30 دقيقة", type: "grades" },
                { action: "تم إرسال إشعار لأولياء الأمور", time: "منذ ساعة", type: "notification" },
                { action: "تم تحديث بيانات طالب جديد", time: "منذ ساعتين", type: "student" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div className="flex-1 text-arabic">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-arabic">الإشعارات الجديدة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "اجتماع أولياء الأمور", message: "يوم الخميس الساعة 3:00 مساءً", urgent: false },
                { title: "امتحان نهاية الفصل", message: "سيبدأ امتحان الرياضيات يوم الأحد", urgent: true },
                { title: "رحلة مدرسية", message: "رحلة إلى المتحف العلمي يوم الجمعة", urgent: false },
                { title: "إجازة رسمية", message: "المدرسة مغلقة يوم الثلاثاء القادم", urgent: true }
              ].map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.urgent ? 'bg-destructive' : 'bg-accent'}`}></div>
                  <div className="flex-1 text-arabic">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
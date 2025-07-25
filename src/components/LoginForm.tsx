import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (username: string, role: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "خطأ في البيانات",
        description: "يرجى إدخال اسم المستخدم وكلمة المرور",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo logic: determine role based on username
      let role = "student";
      if (username.includes("admin")) role = "admin";
      else if (username.includes("teacher")) role = "teacher";
      else if (username.includes("parent")) role = "parent";
      
      onLogin(username, role);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-secondary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-arabic">
            نظام إدارة المدرسة
          </CardTitle>
          <p className="text-muted-foreground text-arabic">
            مرحباً بك في نظام إدارة المدرسة الذكي
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-arabic">
                اسم المستخدم
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="text-arabic h-12"
                dir="rtl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-arabic">
                كلمة المرور
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="text-arabic h-12 pr-12"
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full text-arabic"
              disabled={loading}
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-arabic text-primary"
            >
              نسيت كلمة المرور؟
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground text-arabic mb-4">
              تسجيل دخول تجريبي:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-arabic">
                <p><strong>مدير:</strong> admin</p>
                <p><strong>معلم:</strong> teacher</p>
              </div>
              <div className="text-arabic">
                <p><strong>طالب:</strong> student</p>
                <p><strong>ولي أمر:</strong> parent</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
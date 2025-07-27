import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Teacher } from "@/types";
import { Plus, Edit, Trash2, Search, GraduationCap, Phone, Mail } from "lucide-react";

interface TeacherManagementProps {
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

export const TeacherManagement = ({ teachers, setTeachers }: TeacherManagementProps) => {

  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    teacherId: '',
    subject: '',
    phone: '',
    email: '',
    hireDate: '',
    salary: 0,
    classes: []
  });

  const resetForm = () => {
    setFormData({
      name: '',
      teacherId: '',
      subject: '',
      phone: '',
      email: '',
      hireDate: '',
      salary: 0,
      classes: []
    });
    setEditingTeacher(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.teacherId || !formData.subject) {
      toast({
        variant: "destructive",
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return;
    }

    if (editingTeacher) {
      // تحديث معلم موجود
      setTeachers(prev => prev.map(teacher => 
        teacher.id === editingTeacher.id 
          ? { ...teacher, ...formData } as Teacher
          : teacher
      ));
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات المعلم بنجاح",
      });
    } else {
      // إضافة معلم جديد
      const newTeacher: Teacher = {
        id: Date.now().toString(),
        ...formData
      } as Teacher;
      
      setTeachers(prev => [...prev, newTeacher]);
      toast({
        title: "تم الإضافة بنجاح",
        description: "تم إضافة المعلم الجديد بنجاح",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData(teacher);
    setIsDialogOpen(true);
  };

  const handleDelete = (teacherId: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف المعلم بنجاح",
    });
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-card border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-arabic text-xl">إدارة المعلمين</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient" className="text-arabic" onClick={resetForm}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة معلم جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-arabic">
                    {editingTeacher ? 'تعديل بيانات المعلم' : 'إضافة معلم جديد'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-arabic">الاسم الكامل *</Label>
                      <Input
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="أدخل الاسم الكامل"
                        className="text-arabic"
                        dir="rtl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">رقم المعلم *</Label>
                      <Input
                        value={formData.teacherId || ''}
                        onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                        placeholder="TCH001"
                        className="text-arabic"
                        dir="rtl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">المادة *</Label>
                      <Input
                        value={formData.subject || ''}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="الرياضيات"
                        className="text-arabic"
                        dir="rtl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">رقم الهاتف</Label>
                      <Input
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="0501234567"
                        className="text-arabic"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">البريد الإلكتروني</Label>
                      <Input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="teacher@school.edu"
                        className="text-arabic"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">تاريخ التوظيف</Label>
                      <Input
                        type="date"
                        value={formData.hireDate || ''}
                        onChange={(e) => setFormData({...formData, hireDate: e.target.value})}
                        className="text-arabic"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">الراتب (ريال)</Label>
                      <Input
                        type="number"
                        value={formData.salary || ''}
                        onChange={(e) => setFormData({...formData, salary: parseInt(e.target.value) || 0})}
                        placeholder="7500"
                        className="text-arabic"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">الصفوف المُدرسة</Label>
                      <Input
                        value={formData.classes?.join(', ') || ''}
                        onChange={(e) => setFormData({...formData, classes: e.target.value.split(', ').filter(c => c.trim())})}
                        placeholder="الصف السادس أ, الصف السادس ب"
                        className="text-arabic"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 space-x-reverse pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="text-arabic"
                    >
                      إلغاء
                    </Button>
                    <Button type="submit" variant="gradient" className="text-arabic">
                      {editingTeacher ? 'حفظ التغييرات' : 'إضافة المعلم'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 space-x-reverse mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث عن معلم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-arabic"
                dir="rtl"
              />
            </div>
            <Badge variant="secondary" className="text-arabic">
              العدد الكلي: {teachers.length}
            </Badge>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-arabic text-right">رقم المعلم</TableHead>
                  <TableHead className="text-arabic text-right">الاسم</TableHead>
                  <TableHead className="text-arabic text-right">المادة</TableHead>
                  <TableHead className="text-arabic text-right">الهاتف</TableHead>
                  <TableHead className="text-arabic text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="text-arabic text-right">الراتب</TableHead>
                  <TableHead className="text-arabic text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.teacherId}</TableCell>
                    <TableCell className="text-arabic">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-accent" />
                        </div>
                        <span>{teacher.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-arabic">{teacher.subject}</TableCell>
                    <TableCell className="text-arabic">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span>{teacher.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-arabic">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{teacher.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-arabic">
                      <Badge variant="secondary">
                        {teacher.salary.toLocaleString()} ريال
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(teacher)}
                          className="text-primary hover:text-primary-glow"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(teacher.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
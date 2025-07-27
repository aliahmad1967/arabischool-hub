import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/types";
import { Plus, Edit, Trash2, Search, User } from "lucide-react";

interface StudentManagementProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const StudentManagement = ({ students, setStudents }: StudentManagementProps) => {

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    studentId: '',
    grade: '',
    class: '',
    dateOfBirth: '',
    parentName: '',
    parentPhone: '',
    address: '',
    enrollmentDate: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      studentId: '',
      grade: '',
      class: '',
      dateOfBirth: '',
      parentName: '',
      parentPhone: '',
      address: '',
      enrollmentDate: ''
    });
    setEditingStudent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.studentId || !formData.grade) {
      toast({
        variant: "destructive",
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return;
    }

    if (editingStudent) {
      // تحديث طالب موجود
      setStudents(prev => prev.map(student => 
        student.id === editingStudent.id 
          ? { ...student, ...formData } as Student
          : student
      ));
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات الطالب بنجاح",
      });
    } else {
      // إضافة طالب جديد
      const newStudent: Student = {
        id: Date.now().toString(),
        ...formData
      } as Student;
      
      setStudents(prev => [...prev, newStudent]);
      toast({
        title: "تم الإضافة بنجاح",
        description: "تم إضافة الطالب الجديد بنجاح",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData(student);
    setIsDialogOpen(true);
  };

  const handleDelete = (studentId: string) => {
    setStudents(prev => prev.filter(student => student.id !== studentId));
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف الطالب بنجاح",
    });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-card border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-arabic text-xl">إدارة الطلاب</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient" className="text-arabic" onClick={resetForm}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة طالب جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-arabic">
                    {editingStudent ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد'}
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
                      <Label className="text-arabic">الرقم التعريفي *</Label>
                      <Input
                        value={formData.studentId || ''}
                        onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                        placeholder="STD001"
                        className="text-arabic"
                        dir="rtl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">الصف *</Label>
                      <Input
                        value={formData.grade || ''}
                        onChange={(e) => setFormData({...formData, grade: e.target.value})}
                        placeholder="الصف السادس"
                        className="text-arabic"
                        dir="rtl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">الشعبة</Label>
                      <Input
                        value={formData.class || ''}
                        onChange={(e) => setFormData({...formData, class: e.target.value})}
                        placeholder="أ"
                        className="text-arabic"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">تاريخ الميلاد</Label>
                      <Input
                        type="date"
                        value={formData.dateOfBirth || ''}
                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                        className="text-arabic"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">تاريخ التسجيل</Label>
                      <Input
                        type="date"
                        value={formData.enrollmentDate || ''}
                        onChange={(e) => setFormData({...formData, enrollmentDate: e.target.value})}
                        className="text-arabic"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">اسم ولي الأمر</Label>
                      <Input
                        value={formData.parentName || ''}
                        onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                        placeholder="أدخل اسم ولي الأمر"
                        className="text-arabic"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">هاتف ولي الأمر</Label>
                      <Input
                        value={formData.parentPhone || ''}
                        onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                        placeholder="0501234567"
                        className="text-arabic"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-arabic">العنوان</Label>
                    <Input
                      value={formData.address || ''}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="أدخل العنوان"
                      className="text-arabic"
                      dir="rtl"
                    />
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
                      {editingStudent ? 'حفظ التغييرات' : 'إضافة الطالب'}
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
                placeholder="البحث عن طالب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-arabic"
                dir="rtl"
              />
            </div>
            <Badge variant="secondary" className="text-arabic">
              العدد الكلي: {students.length}
            </Badge>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-arabic text-right">الرقم التعريفي</TableHead>
                  <TableHead className="text-arabic text-right">الاسم</TableHead>
                  <TableHead className="text-arabic text-right">الصف</TableHead>
                  <TableHead className="text-arabic text-right">الشعبة</TableHead>
                  <TableHead className="text-arabic text-right">ولي الأمر</TableHead>
                  <TableHead className="text-arabic text-right">الهاتف</TableHead>
                  <TableHead className="text-arabic text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.studentId}</TableCell>
                    <TableCell className="text-arabic">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span>{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-arabic">{student.grade}</TableCell>
                    <TableCell className="text-arabic">{student.class}</TableCell>
                    <TableCell className="text-arabic">{student.parentName}</TableCell>
                    <TableCell className="text-arabic">{student.parentPhone}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(student)}
                          className="text-primary hover:text-primary-glow"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(student.id)}
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
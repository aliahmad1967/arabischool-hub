import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Grade, ExamType } from "@/types";
import { Plus, Edit, Trash2, Search, BookOpen, TrendingUp, Award } from "lucide-react";

export const GradesManagement = () => {
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: '1',
      studentId: 'STD001',
      studentName: 'أحمد محمد علي',
      subject: 'الرياضيات',
      examType: 'midterm',
      score: 85,
      maxScore: 100,
      date: '2024-01-15',
      grade: 'الصف السادس',
      class: 'أ',
      teacherId: 'TCH001',
      notes: 'أداء ممتاز'
    },
    {
      id: '2',
      studentId: 'STD002',
      studentName: 'فاطمة أحمد حسن',
      subject: 'اللغة العربية',
      examType: 'final',
      score: 92,
      maxScore: 100,
      date: '2024-01-20',
      grade: 'الصف الخامس',
      class: 'ب',
      teacherId: 'TCH002',
      notes: 'متفوقة'
    },
    {
      id: '3',
      studentId: 'STD003',
      studentName: 'محمد عبدالله سالم',
      subject: 'العلوم',
      examType: 'quiz',
      score: 78,
      maxScore: 100,
      date: '2024-01-10',
      grade: 'الصف السادس',
      class: 'أ',
      teacherId: 'TCH003',
      notes: 'يحتاج لمزيد من المراجعة'
    }
  ]);

  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedExamType, setSelectedExamType] = useState("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Grade>>({
    studentId: '',
    studentName: '',
    subject: '',
    examType: 'quiz',
    score: 0,
    maxScore: 100,
    date: '',
    grade: '',
    class: '',
    teacherId: '',
    notes: ''
  });

  // بيانات الطلاب والمعلمين المتاحة
  const students = [
    { id: 'STD001', name: 'أحمد محمد علي', grade: 'الصف السادس', class: 'أ' },
    { id: 'STD002', name: 'فاطمة أحمد حسن', grade: 'الصف الخامس', class: 'ب' },
    { id: 'STD003', name: 'محمد عبدالله سالم', grade: 'الصف السادس', class: 'أ' }
  ];

  const subjects = ['الرياضيات', 'اللغة العربية', 'العلوم', 'التاريخ', 'الجغرافيا', 'اللغة الإنجليزية'];

  const resetForm = () => {
    setFormData({
      studentId: '',
      studentName: '',
      subject: '',
      examType: 'quiz',
      score: 0,
      maxScore: 100,
      date: '',
      grade: '',
      class: '',
      teacherId: '',
      notes: ''
    });
    setEditingGrade(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentId || !formData.subject || !formData.score) {
      toast({
        variant: "destructive",
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return;
    }

    if (editingGrade) {
      // تحديث درجة موجودة
      setGrades(prev => prev.map(grade => 
        grade.id === editingGrade.id 
          ? { ...grade, ...formData } as Grade
          : grade
      ));
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث الدرجة بنجاح",
      });
    } else {
      // إضافة درجة جديدة
      const selectedStudent = students.find(s => s.id === formData.studentId);
      if (!selectedStudent) return;

      const newGrade: Grade = {
        id: Date.now().toString(),
        studentName: selectedStudent.name,
        grade: selectedStudent.grade,
        class: selectedStudent.class,
        teacherId: 'TCH001', // يمكن تحديد المعلم حسب السياق
        ...formData
      } as Grade;
      
      setGrades(prev => [...prev, newGrade]);
      toast({
        title: "تم الإضافة بنجاح",
        description: "تم إضافة الدرجة الجديدة بنجاح",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (grade: Grade) => {
    setEditingGrade(grade);
    setFormData(grade);
    setIsDialogOpen(true);
  };

  const handleDelete = (gradeId: string) => {
    setGrades(prev => prev.filter(grade => grade.id !== gradeId));
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف الدرجة بنجاح",
    });
  };

  const getExamTypeText = (type: ExamType) => {
    switch (type) {
      case 'midterm': return 'امتحان نصف الفصل';
      case 'final': return 'امتحان نهائي';
      case 'quiz': return 'اختبار قصير';
      case 'assignment': return 'واجب';
      case 'participation': return 'مشاركة';
      default: return type;
    }
  };

  const getGradeLevel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { level: 'ممتاز', color: 'text-accent' };
    if (percentage >= 80) return { level: 'جيد جداً', color: 'text-primary' };
    if (percentage >= 70) return { level: 'جيد', color: 'text-blue-500' };
    if (percentage >= 60) return { level: 'مقبول', color: 'text-orange-500' };
    return { level: 'ضعيف', color: 'text-destructive' };
  };

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || grade.subject === selectedSubject;
    const matchesExamType = selectedExamType === 'all' || grade.examType === selectedExamType;
    
    return matchesSearch && matchesSubject && matchesExamType;
  });

  // حساب الإحصائيات
  const averageScore = filteredGrades.length > 0 
    ? filteredGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0) / filteredGrades.length 
    : 0;

  const excellentCount = filteredGrades.filter(g => (g.score / g.maxScore) * 100 >= 90).length;
  const passCount = filteredGrades.filter(g => (g.score / g.maxScore) * 100 >= 60).length;

  return (
    <div className="space-y-6">
      {/* إحصائيات الدرجات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-arabic">
                <p className="text-sm text-muted-foreground">المتوسط العام</p>
                <p className="text-2xl font-bold text-primary">{averageScore.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-arabic">
                <p className="text-sm text-muted-foreground">المتفوقون</p>
                <p className="text-2xl font-bold text-accent">{excellentCount}</p>
              </div>
              <Award className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-arabic">
                <p className="text-sm text-muted-foreground">الناجحون</p>
                <p className="text-2xl font-bold text-blue-500">{passCount}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-arabic">
                <p className="text-sm text-muted-foreground">إجمالي الدرجات</p>
                <p className="text-2xl font-bold text-orange-500">{filteredGrades.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-arabic text-xl">إدارة الدرجات والتقييم</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient" className="text-arabic" onClick={resetForm}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة درجة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-arabic">
                    {editingGrade ? 'تعديل الدرجة' : 'إضافة درجة جديدة'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-arabic">الطالب *</Label>
                      <Select 
                        value={formData.studentId || ''} 
                        onValueChange={(value) => {
                          const student = students.find(s => s.id === value);
                          setFormData({
                            ...formData, 
                            studentId: value,
                            studentName: student?.name || '',
                            grade: student?.grade || '',
                            class: student?.class || ''
                          });
                        }}
                      >
                        <SelectTrigger className="text-arabic">
                          <SelectValue placeholder="اختر الطالب" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map(student => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} - {student.grade} {student.class}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">المادة *</Label>
                      <Select value={formData.subject || ''} onValueChange={(value) => setFormData({...formData, subject: value})}>
                        <SelectTrigger className="text-arabic">
                          <SelectValue placeholder="اختر المادة" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">نوع الامتحان *</Label>
                      <Select value={formData.examType || 'quiz'} onValueChange={(value) => setFormData({...formData, examType: value as ExamType})}>
                        <SelectTrigger className="text-arabic">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quiz">اختبار قصير</SelectItem>
                          <SelectItem value="midterm">امتحان نصف الفصل</SelectItem>
                          <SelectItem value="final">امتحان نهائي</SelectItem>
                          <SelectItem value="assignment">واجب</SelectItem>
                          <SelectItem value="participation">مشاركة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">تاريخ الامتحان</Label>
                      <Input
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="text-arabic"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">الدرجة المحصلة *</Label>
                      <Input
                        type="number"
                        value={formData.score || ''}
                        onChange={(e) => setFormData({...formData, score: parseInt(e.target.value) || 0})}
                        placeholder="85"
                        className="text-arabic"
                        min="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-arabic">الدرجة الكاملة</Label>
                      <Input
                        type="number"
                        value={formData.maxScore || 100}
                        onChange={(e) => setFormData({...formData, maxScore: parseInt(e.target.value) || 100})}
                        placeholder="100"
                        className="text-arabic"
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-arabic">ملاحظات</Label>
                    <Textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="أدخل ملاحظات حول الأداء..."
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
                      {editingGrade ? 'حفظ التغييرات' : 'إضافة الدرجة'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* فلاتر البحث */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث عن طالب أو مادة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-arabic"
                dir="rtl"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="text-arabic">
                <SelectValue placeholder="اختر المادة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المواد</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedExamType} onValueChange={setSelectedExamType}>
              <SelectTrigger className="text-arabic">
                <SelectValue placeholder="نوع الامتحان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="quiz">اختبار قصير</SelectItem>
                <SelectItem value="midterm">امتحان نصف الفصل</SelectItem>
                <SelectItem value="final">امتحان نهائي</SelectItem>
                <SelectItem value="assignment">واجب</SelectItem>
                <SelectItem value="participation">مشاركة</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="text-arabic justify-center">
              العدد: {filteredGrades.length}
            </Badge>
          </div>

          {/* جدول الدرجات */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-arabic text-right">الطالب</TableHead>
                  <TableHead className="text-arabic text-right">المادة</TableHead>
                  <TableHead className="text-arabic text-right">نوع الامتحان</TableHead>
                  <TableHead className="text-arabic text-right">الدرجة</TableHead>
                  <TableHead className="text-arabic text-right">النسبة</TableHead>
                  <TableHead className="text-arabic text-right">التقدير</TableHead>
                  <TableHead className="text-arabic text-right">التاريخ</TableHead>
                  <TableHead className="text-arabic text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((grade) => {
                  const percentage = (grade.score / grade.maxScore) * 100;
                  const gradeLevel = getGradeLevel(grade.score, grade.maxScore);
                  
                  return (
                    <TableRow key={grade.id}>
                      <TableCell className="text-arabic">
                        <div>
                          <p className="font-medium">{grade.studentName}</p>
                          <p className="text-sm text-muted-foreground">{grade.grade} {grade.class}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-arabic">{grade.subject}</TableCell>
                      <TableCell className="text-arabic">
                        <Badge variant="outline">
                          {getExamTypeText(grade.examType)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {grade.score}/{grade.maxScore}
                      </TableCell>
                      <TableCell>
                        <Badge variant={percentage >= 60 ? 'default' : 'destructive'}>
                          {percentage.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-arabic">
                        <span className={gradeLevel.color + ' font-medium'}>
                          {gradeLevel.level}
                        </span>
                      </TableCell>
                      <TableCell>{grade.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(grade)}
                            className="text-primary hover:text-primary-glow"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(grade.id)}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
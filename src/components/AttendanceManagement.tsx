import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AttendanceRecord, AttendanceStatus, Student } from "@/types";
import { CalendarCheck, Search, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface AttendanceManagementProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  setAttendanceRecords: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
}

export const AttendanceManagement = ({ students, attendanceRecords, setAttendanceRecords }: AttendanceManagementProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();


  const updateAttendance = (studentId: string, status: AttendanceStatus, notes?: string) => {
    setAttendanceRecords(prev => {
      const existingRecord = prev.find(record => 
        record.studentId === studentId && record.date === selectedDate
      );
      
      if (existingRecord) {
        return prev.map(record => 
          record.id === existingRecord.id 
            ? { ...record, status, notes: notes || '' }
            : record
        );
      } else {
        const student = students.find(s => s.studentId === studentId);
        if (!student) return prev;
        
        const newRecord: AttendanceRecord = {
          id: Date.now().toString() + studentId,
          studentId,
          studentName: student.name,
          date: selectedDate,
          status,
          grade: student.grade,
          class: student.class,
          notes: notes || ''
        };
        return [...prev, newRecord];
      }
    });

    toast({
      title: "تم التحديث",
      description: `تم تحديث حالة الحضور بنجاح`,
    });
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'late':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'excused':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return 'حاضر';
      case 'absent': return 'غائب';
      case 'late': return 'متأخر';
      case 'excused': return 'غياب بعذر';
      default: return '';
    }
  };

  const getStatusBadgeVariant = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return 'default';
      case 'absent': return 'destructive';
      case 'late': return 'secondary';
      case 'excused': return 'outline';
      default: return 'secondary';
    }
  };

  // فلترة الطلاب حسب الخيارات المحددة
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    
    return matchesSearch && matchesGrade && matchesClass;
  });

  // احصائيات الحضور لليوم المحدد
  const todayRecords = attendanceRecords.filter(record => record.date === selectedDate);
  const presentCount = todayRecords.filter(r => r.status === 'present').length;
  const absentCount = todayRecords.filter(r => r.status === 'absent').length;
  const lateCount = todayRecords.filter(r => r.status === 'late').length;
  const excusedCount = todayRecords.filter(r => r.status === 'excused').length;

  return (
    <div className="space-y-6">
      {/* إحصائيات الحضور */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-arabic">
                <p className="text-sm text-muted-foreground">الحضور</p>
                <p className="text-2xl font-bold text-accent">{presentCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-arabic">
                <p className="text-sm text-muted-foreground">الغياب</p>
                <p className="text-2xl font-bold text-destructive">{absentCount}</p>
              </div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-arabic">
                <p className="text-sm text-muted-foreground">التأخير</p>
                <p className="text-2xl font-bold text-orange-500">{lateCount}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-arabic">
                <p className="text-sm text-muted-foreground">غياب بعذر</p>
                <p className="text-2xl font-bold text-blue-500">{excusedCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-arabic text-xl flex items-center space-x-2 space-x-reverse">
            <CalendarCheck className="w-5 h-5" />
            <span>تسجيل الحضور والغياب</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* فلاتر البحث */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="space-y-2">
              <Label className="text-arabic">التاريخ</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-arabic"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-arabic">الصف</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="text-arabic">
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الصفوف</SelectItem>
                  <SelectItem value="الصف السادس">الصف السادس</SelectItem>
                  <SelectItem value="الصف الخامس">الصف الخامس</SelectItem>
                  <SelectItem value="الصف الرابع">الصف الرابع</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-arabic">الشعبة</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="text-arabic">
                  <SelectValue placeholder="اختر الشعبة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الشعب</SelectItem>
                  <SelectItem value="أ">أ</SelectItem>
                  <SelectItem value="ب">ب</SelectItem>
                  <SelectItem value="ج">ج</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-arabic">البحث</Label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث عن طالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-arabic"
                  dir="rtl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-arabic">إجراءات سريعة</Label>
              <div className="flex space-x-2 space-x-reverse">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => {
                   filteredStudents.forEach(student => 
                     updateAttendance(student.studentId, 'present')
                   );
                  }}
                  className="text-arabic text-xs"
                >
                  الكل حاضر
                </Button>
              </div>
            </div>
          </div>

          {/* جدول الحضور */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-arabic text-right">الرقم التعريفي</TableHead>
                  <TableHead className="text-arabic text-right">اسم الطالب</TableHead>
                  <TableHead className="text-arabic text-right">الصف</TableHead>
                  <TableHead className="text-arabic text-right">الشعبة</TableHead>
                  <TableHead className="text-arabic text-right">الحالة</TableHead>
                  <TableHead className="text-arabic text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 {filteredStudents.map((student) => {
                   const attendanceRecord = todayRecords.find(r => r.studentId === student.studentId);
                   const currentStatus = attendanceRecord?.status;
                   
                   return (
                     <TableRow key={student.id}>
                       <TableCell className="font-medium">{student.studentId}</TableCell>
                      <TableCell className="text-arabic">{student.name}</TableCell>
                      <TableCell className="text-arabic">{student.grade}</TableCell>
                      <TableCell className="text-arabic">{student.class}</TableCell>
                      <TableCell>
                        {currentStatus ? (
                          <Badge variant={getStatusBadgeVariant(currentStatus)} className="text-arabic">
                            <div className="flex items-center space-x-1 space-x-reverse">
                              {getStatusIcon(currentStatus)}
                              <span>{getStatusText(currentStatus)}</span>
                            </div>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-arabic">
                            لم يتم التسجيل
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Button
                            variant={currentStatus === 'present' ? 'default' : 'outline'}
                            size="sm"
                           onClick={() => updateAttendance(student.studentId, 'present')}
                           className="text-xs"
                         >
                           <CheckCircle className="w-3 h-3" />
                         </Button>
                         <Button
                           variant={currentStatus === 'absent' ? 'destructive' : 'outline'}
                           size="sm"
                           onClick={() => updateAttendance(student.studentId, 'absent')}
                           className="text-xs"
                         >
                           <XCircle className="w-3 h-3" />
                         </Button>
                         <Button
                           variant={currentStatus === 'late' ? 'secondary' : 'outline'}
                           size="sm"
                           onClick={() => updateAttendance(student.studentId, 'late')}
                           className="text-xs"
                         >
                           <Clock className="w-3 h-3" />
                         </Button>
                         <Button
                           variant={currentStatus === 'excused' ? 'default' : 'outline'}
                           size="sm"
                           onClick={() => updateAttendance(student.studentId, 'excused')}
                           className="text-xs"
                          >
                            <AlertCircle className="w-3 h-3" />
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
// تعريف أنواع البيانات للنظام المدرسي

export interface Student {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  class: string;
  dateOfBirth: string;
  parentName: string;
  parentPhone: string;
  address: string;
  photo?: string;
  enrollmentDate: string;
}

export interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  subject: string;
  phone: string;
  email: string;
  hireDate: string;
  salary: number;
  classes: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  grade: string;
  class: string;
  notes?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment' | 'participation';
  score: number;
  maxScore: number;
  date: string;
  grade: string;
  class: string;
  teacherId: string;
  notes?: string;
}

export interface User {
  username: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  name?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type ExamType = 'midterm' | 'final' | 'quiz' | 'assignment' | 'participation';
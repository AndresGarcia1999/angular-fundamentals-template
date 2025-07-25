export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export interface CourseFormData {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

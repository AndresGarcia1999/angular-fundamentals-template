import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export interface Author {
  id: string;
  name: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

export interface EditCourseRequest {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

export interface CreateAuthorRequest {
  name: string;
}

export interface CoursesResponse {
  successful: boolean;
  result: Course[];
}

export interface CourseResponse {
  successful: boolean;
  result: Course;
}

export interface AuthorsResponse {
  successful: boolean;
  result: Author[];
}

export interface AuthorResponse {
  successful: boolean;
  result: Author;
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private readonly API_URL = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  /**
   * Get all courses
   */
  getAll(): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>(`${this.API_URL}/courses/all`);
  }

  /**
   * Create a new course
   */
  createCourse(courseData: CreateCourseRequest): Observable<CourseResponse> {
    return this.http.post<CourseResponse>(
      `${this.API_URL}/courses/add`,
      courseData
    );
  }

  /**
   * Edit an existing course
   */
  editCourse(
    courseId: string,
    courseData: EditCourseRequest
  ): Observable<CourseResponse> {
    return this.http.put<CourseResponse>(
      `${this.API_URL}/courses/${courseId}`,
      courseData
    );
  }

  /**
   * Get a specific course by ID
   */
  getCourse(courseId: string): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.API_URL}/courses/${courseId}`);
  }

  /**
   * Delete a course
   */
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/courses/${courseId}`);
  }

  /**
   * Filter courses (search functionality)
   */
  filterCourses(searchTerm: string): Observable<CoursesResponse> {
    const params = new HttpParams().set("title", searchTerm);
    return this.http.get<CoursesResponse>(`${this.API_URL}/courses/filter`, {
      params,
    });
  }

  /**
   * Get all authors
   */
  getAllAuthors(): Observable<AuthorsResponse> {
    return this.http.get<AuthorsResponse>(`${this.API_URL}/authors/all`);
  }

  /**
   * Create a new author
   */
  createAuthor(authorData: CreateAuthorRequest): Observable<AuthorResponse> {
    return this.http.post<AuthorResponse>(
      `${this.API_URL}/authors/add`,
      authorData
    );
  }

  /**
   * Get author by ID
   */
  getAuthorById(authorId: string): Observable<AuthorResponse> {
    return this.http.get<AuthorResponse>(`${this.API_URL}/authors/${authorId}`);
  }
}

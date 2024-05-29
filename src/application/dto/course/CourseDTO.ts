import { Course } from "../../../domain/models";

export interface CourseDTO {
  id: number;
  name: string;
  category: string;
  active: boolean;
  description: string;
  teacher: string | null;
}

export function mapCourseToDTO(course: Course): CourseDTO {
  return {
    id: course.id,
    name: course.name,
    category: course.category,
    active: course.active,
    description: course.description,
    teacher: course.teacher?.id ? course.teacher.person.name : null,
  };
}

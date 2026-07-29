// core/use-cases/courses/GetCourseUseCase.ts
import { ICourseRepository } from '@/core/interfaces/repositories/ICourseRepository'
import { Course } from '@/core/entities/Course'

export class GetCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(slug: string): Promise<Course | null> {
    const course = await this.courseRepository.findBySlug(slug)
    
    if (!course || !course.isPublished) {
      return null
    }

    return course
  }
}

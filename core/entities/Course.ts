// core/entities/Course.ts
export interface Course {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  level: CourseLevel
  category: string
  price: number
  duration: string
  lessonsCount: number
  createdAt: Date
  updatedAt: Date
  author: Author
  lessons: Lesson[]
  tags: string[]
  isPublished: boolean
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
  isFree: boolean
  createdAt: Date
}

export interface UserProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  progress: number
  lastAccessedAt: Date
  startedAt: Date
  completedAt?: Date
}

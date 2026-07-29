// infrastructure/repositories/CourseRepository.ts
import { ICourseRepository } from '@/core/interfaces/repositories/ICourseRepository'
import { Course } from '@/core/entities/Course'
import { createServerClient } from '@/infrastructure/databases/supabase/server'

export class CourseRepository implements ICourseRepository {
  async findById(id: string): Promise<Course | null> {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        author:users (
          id,
          name,
          avatar,
          bio
        ),
        lessons (
          id,
          title,
          description,
          video_url,
          duration,
          order,
          is_free
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return this.mapToCourse(data)
  }

  async findBySlug(slug: string): Promise<Course | null> {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        author:users (
          id,
          name,
          avatar,
          bio
        ),
        lessons (
          id,
          title,
          description,
          video_url,
          duration,
          order,
          is_free
        )
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error
    return this.mapToCourse(data)
  }

  async findAll(): Promise<Course[]> {
    const supabase = await createServerClient()
    
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        author:users (
          id,
          name,
          avatar
        )
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data.map(this.mapToCourse)
  }

  private mapToCourse(data: any): Course {
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      thumbnail: data.thumbnail,
      level: data.level,
      category: data.category,
      price: data.price,
      duration: data.duration,
      lessonsCount: data.lessons_count,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      author: {
        id: data.author.id,
        name: data.author.name,
        avatar: data.author.avatar,
        bio: data.author.bio,
      },
      lessons: data.lessons?.map((lesson: any) => ({
        id: lesson.id,
        courseId: lesson.course_id,
        title: lesson.title,
        description: lesson.description,
        videoUrl: lesson.video_url,
        duration: lesson.duration,
        order: lesson.order,
        isFree: lesson.is_free,
        createdAt: new Date(lesson.created_at),
      })) || [],
      tags: data.tags || [],
      isPublished: data.is_published,
    }
  }
}

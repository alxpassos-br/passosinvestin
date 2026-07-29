// shared/hooks/useCourses.ts
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Course } from '@/core/entities/Course'
import { courseService } from '@/features/courses/services/courseService'

export function useCourses() {
  const queryClient = useQueryClient()

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getAll(),
  })

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => courseService.enroll(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['user-progress'] })
    },
  })

  return {
    courses,
    isLoading,
    enroll: enrollMutation.mutateAsync,
    isEnrolling: enrollMutation.isPending,
  }
}

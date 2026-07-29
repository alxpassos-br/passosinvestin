// presentation/molecules/CourseCard/CourseCard.tsx
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../Card'
import { Badge } from '../../atoms/Badge'
import { Button } from '../../atoms/Button'
import { Text } from '../../atoms/Text'
import { BookOpen, Clock, Award, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface CourseCardProps {
  id: string
  title: string
  description: string
  thumbnail: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessonsCount: number
  progress?: number
  price: number
  isEnrolled?: boolean
  category: string
  onClick?: () => void
}

const CourseCard = ({
  title,
  description,
  thumbnail,
  level,
  duration,
  lessonsCount,
  progress = 0,
  price,
  isEnrolled = false,
  category,
  onClick,
}: CourseCardProps) => {
  const levelConfig = {
    beginner: { label: 'Iniciante', color: 'bg-success/10 text-success' },
    intermediate: { label: 'Intermediário', color: 'bg-warning/10 text-warning' },
    advanced: { label: 'Avançado', color: 'bg-primary-600/10 text-primary-600' },
  }

  return (
    <Card
      variant="elevated"
      padding="none"
      hover="lift"
      className="overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Categoria */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="backdrop-blur-md bg-white/90">
            {category}
          </Badge>
        </div>

        {/* Nível */}
        <div className="absolute bottom-4 left-4">
          <span className={cn('px-3 py-1 rounded-full text-xs font-medium', levelConfig[level].color)}>
            {levelConfig[level].label}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </CardTitle>
        <Text variant="small" color="muted" className="line-clamp-2">
          {description}
        </Text>
      </CardHeader>

      {/* Meta-info */}
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>{lessonsCount} aulas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Barra de progresso */}
        {isEnrolled && progress > 0 && (
          <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-600">Progresso</span>
              <span className="font-medium text-primary-600">{progress}%</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-600 to-primary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </CardContent>

      {/* Footer com preço/CTA */}
      <CardFooter className="border-t border-neutral-100 pt-4">
        {isEnrolled ? (
          <Button variant="primary" className="w-full group" size="lg">
            Continuar Estudo
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div>
              <Text variant="small" color="muted">
                Investimento
              </Text>
              <Text variant="h4" color="gold" className="font-bold">
                {price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>
            </div>
            <Button variant="gold" size="lg">
              Matricular
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export { CourseCard }
export type { CourseCardProps }

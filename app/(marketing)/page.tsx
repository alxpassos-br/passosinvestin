// app/(marketing)/page.tsx
import { Hero } from '@/features/home/components/Hero'
import { Features } from '@/features/home/components/Features'
import { Courses } from '@/features/home/components/Courses'
import { Testimonials } from '@/features/home/components/Testimonials'
import { CTA } from '@/features/home/components/CTA'
import { FadeIn, Stagger } from '@/shared/components/animations'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <CTA />
    </div>
  )
}

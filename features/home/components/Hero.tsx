// features/home/components/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/presentation/atoms/Button'
import { Text } from '@/presentation/atoms/Text'
import { Container } from '@/shared/components/layout/Container'
import { ArrowRight, TrendingUp, Shield, Award } from 'lucide-react'
import Link from 'next/link'
import { FadeIn, Stagger } from '@/shared/components/animations'

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-gold-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary-500/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <Stagger staggerDelay={0.1}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Educação Financeira de Elite</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
            >
              Conhecimento que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-gold-500">
                Gera Resultados
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Plataforma premium de preparação para o mercado financeiro. 
              Aprenda com estratégias comprovadas, disciplina e tecnologia 
              de ponta.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button variant="gold" size="xl" asChild>
                <Link href="/register">
                  Começar Jornada
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="secondary" size="xl" asChild>
                <Link href="/courses">
                  Explorar Cursos
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <Text variant="small" weight="semibold">
                  Conteúdo Premium
                </Text>
                <Text variant="caption">
                  Material de alta qualidade
                </Text>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <Text variant="small" weight="semibold">
                  Educação Responsável
                </Text>
                <Text variant="caption">
                  Sem promessas irreais
                </Text>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <TrendingUp className="h-6 w-6 text-primary-600" />
                </div>
                <Text variant="small" weight="semibold">
                  Resultados Reais
                </Text>
                <Text variant="caption">
                  Baseado em conhecimento
                </Text>
              </div>
            </motion.div>
          </Stagger>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-neutral-400 flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-neutral-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}

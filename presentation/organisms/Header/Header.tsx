// presentation/organisms/Header/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../../atoms/Button'
import { NavLink } from '../../molecules/NavLink'
import { Container } from '@/shared/components/layout/Container'
import { Menu, X, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/shared/hooks/useAuth'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, loading } = useAuth()
  
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  )
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 4px 6px -1px rgb(0 0 0 / 0.1)']
  )

  useEffect(() => {
    const unsubscribe = scrollY.onChange((value) => {
      setIsScrolled(value > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const navLinks = [
    { href: '/courses', label: 'Cursos' },
    { href: '/library', label: 'Biblioteca' },
    { href: '/about', label: 'Sobre' },
    { href: '/contact', label: 'Contato' },
  ]

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-sticky transition-all duration-300',
          isScrolled && 'backdrop-blur-xl bg-white/95 shadow-md'
        )}
        style={{ backgroundColor, boxShadow }}
      >
        <Container className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/images/logo.svg"
                  alt="Passos Invest In"
                  width={180}
                  height={40}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {!loading && !user && (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Entrar
                    </Link>
                  </Button>
                  <Button variant="gold" size="sm" asChild>
                    <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Começar Agora
                    </Link>
                  </Button>
                </>
              )}
              
              {user && (
                <Button variant="primary" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden fixed top-[73px] left-0 right-0 bg-white border-b border-neutral-200 overflow-hidden z-sticky"
      >
        <Container className="py-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Link>
              </Button>
              <Button variant="gold" size="lg" asChild>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Começar Agora
                </Link>
              </Button>
            </div>
          </nav>
        </Container>
      </motion.div>
    </>
  )
}

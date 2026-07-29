// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Cal_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/shared/components/providers/ThemeProvider'
import { AuthProvider } from '@/shared/components/providers/AuthProvider'
import { ToastProvider } from '@/shared/components/providers/ToastProvider'
import { Header } from '@/presentation/organisms/Header'
import { Footer } from '@/presentation/organisms/Footer'

// Fontes premium (Apple/Stripe style)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const calSans = Cal_Sans({
  subsets: ['latin'],
  variable: '--font-cal-sans',
  weight: '400',
  display: 'swap',
})

// SEO Metadata [[6]]
export const metadata: Metadata = {
  metadataBase: new URL('https://passosinvest.in'),
  title: {
    default: 'Passos Invest In | Conhecimento que Gera Resultados',
    template: '%s | Passos Invest In',
  },
  description:
    'Plataforma premium de educação financeira. Aprenda a operar no mercado financeiro com confiança, disciplina e estratégias comprovadas.',
  keywords: [
    'educação financeira',
    'mercado financeiro',
    'investimentos',
    'trading',
    'ADX',
    'análise técnica',
  ],
  authors: [{ name: 'Passos Invest In' }],
  creator: 'Passos Invest In',
  publisher: 'Passos Invest In',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://passosinvest.in',
    siteName: 'Passos Invest In',
    title: 'Passos Invest In | Educação Financeira Premium',
    description:
      'Transforme seu conhecimento em resultados no mercado financeiro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Passos Invest In',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passos Invest In | Educação Financeira Premium',
    description: 'Conhecimento que gera resultados',
    images: ['/og-image.png'],
  },
  verification: {
    // Adicionar quando tiver domínio
    // google: 'verification-code',
  },
}

// Structured Data para SEO
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Passos Invest In',
  description: 'Plataforma de educação financeira',
  url: 'https://passosinvest.in',
  logo: 'https://passosinvest.in/logo.svg',
  sameAs: [
    // Redes sociais
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${calSans.variable} font-sans antialiased bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ToastProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

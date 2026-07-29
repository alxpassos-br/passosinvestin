// shared/lib/seo.ts
import { Metadata } from 'next'

interface SEOMetadata {
  title: string
  description: string
  image?: string
  url?: string
}

export function generateSEOMetadata({
  title,
  description,
  image = '/og-image.png',
  url = 'https://passosinvest.in',
}: SEOMetadata): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'pt_BR',
      siteName: 'Passos Invest In',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

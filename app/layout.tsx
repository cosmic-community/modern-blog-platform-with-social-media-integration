import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PageTransition } from '@/components/PageTransition'
import { CosmicBadge } from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog Platform - Social Media Integrated',
  description: 'A cinematic blog platform with integrated Facebook, YouTube, Telegram, and WhatsApp sharing',
  keywords: ['blog', 'social media', 'facebook', 'youtube', 'telegram', 'whatsapp', 'cinematic'],
  authors: [{ name: 'Blog Author' }],
  openGraph: {
    title: 'Modern Blog Platform',
    description: 'A cinematic blog platform with integrated social media sharing',
    type: 'website',
    images: ['https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630&fit=crop'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog Platform',
    description: 'A cinematic blog platform with integrated social media sharing',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
        
        {/* Social media meta tags */}
        <meta property="og:site_name" content="Modern Blog Platform" />
        <meta name="twitter:creator" content="@yourusername" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.cosmicjs.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            
            <main className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            
            <Footer />
          </div>
          
          <CosmicBadge bucketSlug={bucketSlug} />
        </ThemeProvider>
      </body>
    </html>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon, Facebook, Youtube, MessageCircle, Phone } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { AnimatedSection } from './AnimatedSection'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <AnimatedSection variant="slide">
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'glass border-b border-border/50 backdrop-blur-xl' 
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-cinematic-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="hidden sm:block">Modern Blog</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link 
                href="/" 
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Social Icons & Theme Toggle */}
            <div className="flex items-center gap-4">
              {/* Social Media Icons */}
              <div className="hidden md:flex items-center gap-2">
                <a
                  href="https://facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 facebook-brand rounded-lg flex items-center justify-center text-white social-hover"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 youtube-brand rounded-lg flex items-center justify-center text-white social-hover"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="https://t.me/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 telegram-brand rounded-lg flex items-center justify-center text-white social-hover"
                  aria-label="Telegram"
                >
                  <MessageCircle size={16} />
                </a>
                <a
                  href="https://wa.me/yourphonenumber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 whatsapp-brand rounded-lg flex items-center justify-center text-white social-hover"
                  aria-label="WhatsApp"
                >
                  <Phone size={16} />
                </a>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border glass">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/categories"
                  className="py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>

                {/* Mobile Social Links */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <a
                    href="https://facebook.com/yourpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 facebook-brand rounded-lg flex items-center justify-center text-white social-hover"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="https://youtube.com/yourchannel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 youtube-brand rounded-lg flex items-center justify-center text-white social-hover"
                    aria-label="YouTube"
                  >
                    <Youtube size={16} />
                  </a>
                  <a
                    href="https://t.me/yourchannel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 telegram-brand rounded-lg flex items-center justify-center text-white social-hover"
                    aria-label="Telegram"
                  >
                    <MessageCircle size={16} />
                  </a>
                  <a
                    href="https://wa.me/yourphonenumber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 whatsapp-brand rounded-lg flex items-center justify-center text-white social-hover"
                    aria-label="WhatsApp"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </AnimatedSection>
  )
}
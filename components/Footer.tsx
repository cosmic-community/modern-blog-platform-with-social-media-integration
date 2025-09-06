import Link from 'next/link'
import { Facebook, Youtube, MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cinematic-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="font-bold text-xl">Modern Blog</span>
            </div>
            <p className="text-muted-foreground">
              A cinematic blog platform connecting stories across Facebook, YouTube, 
              Telegram, and WhatsApp with seamless social integration.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 facebook-brand rounded-lg flex items-center justify-center text-white social-hover"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 youtube-brand rounded-lg flex items-center justify-center text-white social-hover"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://t.me/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 telegram-brand rounded-lg flex items-center justify-center text-white social-hover"
                aria-label="Telegram"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 whatsapp-brand rounded-lg flex items-center justify-center text-white social-hover"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/categories/technology" className="text-muted-foreground hover:text-foreground transition-colors">
                Technology
              </Link>
              <Link href="/categories/lifestyle" className="text-muted-foreground hover:text-foreground transition-colors">
                Lifestyle
              </Link>
              <Link href="/categories/business" className="text-muted-foreground hover:text-foreground transition-colors">
                Business
              </Link>
              <Link href="/categories/design" className="text-muted-foreground hover:text-foreground transition-colors">
                Design
              </Link>
              <Link href="/categories/travel" className="text-muted-foreground hover:text-foreground transition-colors">
                Travel
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <a href="mailto:hello@modernblog.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    hello@modernblog.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  123 Blog Street<br />
                  Digital City, DC 12345
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  Mon - Fri: 9AM - 6PM<br />
                  Weekend: 10AM - 4PM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Modern Blog Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
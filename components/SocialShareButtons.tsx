'use client'

import { Facebook, Youtube, MessageCircle, Phone, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { Post } from '@/types'

interface SocialShareButtonsProps {
  post: Post
}

export function SocialShareButtons({ post }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  const postUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/posts/${post.slug}`
  const shareText = `Check out this blog post: ${post.title}`

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} - ${postUrl}`)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Facebook */}
      <button
        onClick={() => handleShare(socialLinks.facebook)}
        className="inline-flex items-center gap-3 facebook-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
        aria-label="Share on Facebook"
      >
        <Facebook size={20} />
        <span className="hidden sm:inline">Facebook</span>
      </button>

      {/* Twitter */}
      <button
        onClick={() => handleShare(socialLinks.twitter)}
        className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg social-hover font-medium"
        aria-label="Share on Twitter"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <span className="hidden sm:inline">Twitter</span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => handleShare(socialLinks.linkedin)}
        className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg social-hover font-medium"
        aria-label="Share on LinkedIn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      {/* Telegram */}
      <button
        onClick={() => handleShare(socialLinks.telegram)}
        className="inline-flex items-center gap-3 telegram-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
        aria-label="Share on Telegram"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">Telegram</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => handleShare(socialLinks.whatsapp)}
        className="inline-flex items-center gap-3 whatsapp-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
        aria-label="Share on WhatsApp"
      >
        <Phone size={20} />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center gap-3 bg-muted text-muted-foreground hover:bg-muted/80 px-6 py-3 rounded-lg transition-all duration-300 font-medium"
        aria-label="Copy link"
      >
        {copied ? <Check size={20} /> : <Copy size={20} />}
        <span className="hidden sm:inline">
          {copied ? 'Copied!' : 'Copy Link'}
        </span>
      </button>
    </div>
  )
}
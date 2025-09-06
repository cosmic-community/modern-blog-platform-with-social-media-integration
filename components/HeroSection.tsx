'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import type { Post } from '@/types'

interface HeroSectionProps {
  featuredPost?: Post
}

export function HeroSection({ featuredPost }: HeroSectionProps) {
  if (!featuredPost) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
        <div className="text-center">
          <motion.h1 
            className="text-6xl font-bold mb-6 text-glow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Welcome to Modern Blog
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            A cinematic blogging experience with seamless social media integration
          </motion.p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {featuredPost.metadata?.featured_image && (
          <img
            src={`${featuredPost.metadata.featured_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {featuredPost.metadata?.category && (
              <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-6">
                {featuredPost.metadata.category.title}
              </span>
            )}
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 text-glow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {featuredPost.title}
          </motion.h1>

          {featuredPost.metadata?.summary && (
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {featuredPost.metadata.summary}
            </motion.p>
          )}

          <motion.div 
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link
              href={`/posts/${featuredPost.slug}`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 social-hover"
            >
              Read Full Story
              <ArrowRight size={20} />
            </Link>

            <button className="inline-flex items-center gap-2 glass text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-300">
              <Play size={20} />
              Watch Video
            </button>
          </motion.div>

          {/* Author Info */}
          {featuredPost.metadata?.author && (
            <motion.div 
              className="flex items-center gap-4 mt-12 text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              {featuredPost.metadata.author.metadata?.avatar && (
                <img
                  src={`${featuredPost.metadata.author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={featuredPost.metadata.author.title}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">By {featuredPost.metadata.author.title}</p>
                <p className="text-sm text-white/60">
                  {new Date(featuredPost.metadata?.published_date || featuredPost.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
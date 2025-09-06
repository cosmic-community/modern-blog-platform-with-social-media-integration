import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import type { Post } from '@/types'

interface FeaturedPostsProps {
  posts: Post[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  const [mainPost, ...otherPosts] = posts

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Featured Post */}
      <AnimatedSection variant="zoom" className="lg:col-span-2">
        <article className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
          {mainPost.metadata?.featured_image && (
            <div className="relative h-80 overflow-hidden">
              <img
                src={`${mainPost.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                alt={mainPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {mainPost.metadata?.category && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  {mainPost.metadata.category.title}
                </span>
              )}
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              <Link href={`/posts/${mainPost.slug}`}>
                {mainPost.title}
              </Link>
            </h3>
            
            {mainPost.metadata?.summary && (
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {mainPost.metadata.summary}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {mainPost.metadata?.author && (
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{mainPost.metadata.author.title}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <time dateTime={mainPost.metadata?.published_date || mainPost.created_at}>
                    {new Date(mainPost.metadata?.published_date || mainPost.created_at).toLocaleDateString()}
                  </time>
                </div>
              </div>
              
              <Link
                href={`/posts/${mainPost.slug}`}
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200"
              >
                Read More
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>
      </AnimatedSection>

      {/* Secondary Featured Posts */}
      <div className="space-y-6">
        {otherPosts.map((post, index) => (
          <AnimatedSection 
            key={post.id} 
            variant="slide" 
            delay={200 * (index + 1)}
          >
            <article className="group bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300">
              <div className="flex gap-4">
                {post.metadata?.featured_image && (
                  <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
                    <img
                      src={`${post.metadata.featured_image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  {post.metadata?.category && (
                    <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium mb-2">
                      {post.metadata.category.title}
                    </span>
                  )}
                  
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <time dateTime={post.metadata?.published_date || post.created_at}>
                      {new Date(post.metadata?.published_date || post.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
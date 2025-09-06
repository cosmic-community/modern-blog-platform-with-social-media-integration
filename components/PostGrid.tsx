import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import type { Post } from '@/types'

interface PostGridProps {
  posts: Post[]
}

export function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4">No posts found</h3>
          <p className="text-muted-foreground">
            Check back soon for new content!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <AnimatedSection 
          key={post.id} 
          variant="fade" 
          delay={100 * index}
        >
          <article className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            {/* Featured Image */}
            {post.metadata?.featured_image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {post.metadata?.category && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    {post.metadata.category.title}
                  </span>
                )}
              </div>
            )}

            <div className="p-6">
              {/* Title */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                <Link href={`/posts/${post.slug}`} className="line-clamp-2">
                  {post.title}
                </Link>
              </h3>

              {/* Summary */}
              {post.metadata?.summary && (
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.metadata.summary}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {post.metadata?.author && (
                    <div className="flex items-center gap-2">
                      {post.metadata.author.metadata?.avatar && (
                        <img
                          src={`${post.metadata.author.metadata.avatar.imgix_url}?w=24&h=24&fit=crop&auto=format,compress`}
                          alt={post.metadata.author.title}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span className="truncate max-w-20">
                        {post.metadata.author.title}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <time dateTime={post.metadata?.published_date || post.created_at}>
                      {new Date(post.metadata?.published_date || post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>

                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200 font-medium"
                >
                  Read
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Tags */}
              {post.metadata?.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                  {post.metadata.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.metadata.tags.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{post.metadata.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </article>
        </AnimatedSection>
      ))}
    </div>
  )
}
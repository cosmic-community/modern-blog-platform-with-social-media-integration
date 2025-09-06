// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { PostContent } from '@/components/PostContent'
import { SocialShareButtons } from '@/components/SocialShareButtons'
import { RelatedPosts } from '@/components/RelatedPosts'
import { AnimatedSection } from '@/components/AnimatedSection'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for the post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metadata?.seo?.title || post.title,
    description: post.metadata?.seo?.description || post.metadata?.summary,
    keywords: post.metadata?.seo?.keywords || post.metadata?.tags,
    openGraph: {
      title: post.title,
      description: post.metadata?.summary,
      type: 'article',
      publishedTime: post.metadata?.published_date || post.created_at,
      authors: [post.metadata?.author?.title || 'Unknown Author'],
      images: post.metadata?.featured_image ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metadata?.summary,
      images: post.metadata?.featured_image ? [
        `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      ] : [],
    },
  }
}

// Generate static params for all published posts
export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  // Get related posts from the same category
  const allPosts = await getPosts()
  const relatedPosts = allPosts
    .filter(p => 
      p.slug !== post.slug && 
      p.metadata?.category?.id === post.metadata?.category?.id
    )
    .slice(0, 3)

  return (
    <article className="min-h-screen">
      {/* Hero Section with Featured Image */}
      <AnimatedSection variant="cinematic-zoom">
        <div className="relative h-[70vh] overflow-hidden">
          {post.metadata?.featured_image && (
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="max-w-4xl">
                {post.metadata?.category && (
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-4">
                    {post.metadata.category.title}
                  </span>
                )}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-glow">
                  {post.title}
                </h1>
                {post.metadata?.summary && (
                  <p className="text-white/90 text-lg md:text-xl mb-6 max-w-3xl">
                    {post.metadata.summary}
                  </p>
                )}
                
                {/* Author and Date Info */}
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  {post.metadata?.author && (
                    <div className="flex items-center gap-2">
                      {post.metadata.author.metadata?.avatar && (
                        <img
                          src={`${post.metadata.author.metadata.avatar.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                          alt={post.metadata.author.title}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <span>By {post.metadata.author.title}</span>
                    </div>
                  )}
                  <span>•</span>
                  <time dateTime={post.metadata?.published_date || post.created_at}>
                    {new Date(post.metadata?.published_date || post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Post Content */}
      <AnimatedSection variant="fade" delay={300}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <PostContent post={post} />
          </div>
        </div>
      </AnimatedSection>

      {/* Social Share Section */}
      <AnimatedSection variant="slide" delay={500}>
        <div className="border-y border-border bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Share this post</h3>
                <p className="text-muted-foreground">
                  Help spread the word by sharing on your favorite platform
                </p>
              </div>
              <SocialShareButtons post={post} />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <AnimatedSection variant="fade" delay={700}>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-2xl font-bold text-center mb-12">Related Posts</h3>
                <RelatedPosts posts={relatedPosts} />
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}
    </article>
  )
}
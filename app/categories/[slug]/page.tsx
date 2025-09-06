// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPostsByCategory, getCategories } from '@/lib/cosmic'
import { PostGrid } from '@/components/PostGrid'
import { AnimatedSection } from '@/components/AnimatedSection'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for the category page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Modern Blog Platform`,
    description: category.metadata?.description || `Browse all posts in the ${category.title} category`,
  }
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getPostsByCategory(slug)
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Category Hero */}
      <AnimatedSection variant="fade">
        <section className="bg-hero-gradient py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold mb-6 text-glow">
                {category.title}
              </h1>
              {category.metadata?.description && (
                <p className="text-xl text-muted-foreground mb-8">
                  {category.metadata.description}
                </p>
              )}
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span>{posts.length} posts</span>
                <span>•</span>
                <span>Updated regularly</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Posts Grid */}
      <AnimatedSection variant="slide" delay={300}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            {posts.length > 0 ? (
              <>
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4">
                    Latest in {category.title}
                  </h2>
                  <p className="text-muted-foreground">
                    Discover our newest content in this category
                  </p>
                </div>
                <PostGrid posts={posts} />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📝</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">No posts yet</h3>
                  <p className="text-muted-foreground mb-8">
                    We haven't published any content in this category yet. Check back soon!
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Browse All Posts
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
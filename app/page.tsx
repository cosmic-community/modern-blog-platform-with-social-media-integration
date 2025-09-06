import { getPosts, getCategories } from '@/lib/cosmic'
import { HeroSection } from '@/components/HeroSection'
import { FeaturedPosts } from '@/components/FeaturedPosts'
import { PostGrid } from '@/components/PostGrid'
import { SocialMediaFeed } from '@/components/SocialMediaFeed'
import { CategoriesShowcase } from '@/components/CategoriesShowcase'
import { AnimatedSection } from '@/components/AnimatedSection'

export default async function HomePage() {
  const posts = await getPosts()
  const categories = await getCategories()
  
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9)

  return (
    <div className="space-y-16">
      {/* Hero Section with Cinematic Animation */}
      <AnimatedSection variant="fade" className="relative">
        <HeroSection featuredPost={featuredPosts[0]} />
      </AnimatedSection>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <AnimatedSection variant="slide" delay={200}>
          <section className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-glow mb-4">Featured Stories</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our most popular content across all social media platforms
              </p>
            </div>
            <FeaturedPosts posts={featuredPosts} />
          </section>
        </AnimatedSection>
      )}

      {/* Categories Showcase */}
      {categories.length > 0 && (
        <AnimatedSection variant="zoom" delay={400}>
          <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Explore Topics</h2>
                <p className="text-muted-foreground">
                  Browse content by category and find what interests you most
                </p>
              </div>
              <CategoriesShowcase categories={categories} />
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Social Media Integration */}
      <AnimatedSection variant="slide" delay={600}>
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Social Media Hub</h2>
            <p className="text-muted-foreground">
              Stay connected across all our social platforms
            </p>
          </div>
          <SocialMediaFeed />
        </section>
      </AnimatedSection>

      {/* Recent Posts Grid */}
      {recentPosts.length > 0 && (
        <AnimatedSection variant="fade" delay={800}>
          <section className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
              <p className="text-muted-foreground">
                Fresh content from our blog, updated regularly
              </p>
            </div>
            <PostGrid posts={recentPosts} />
          </section>
        </AnimatedSection>
      )}

      {/* Call to Action */}
      <AnimatedSection variant="zoom" delay={1000}>
        <section className="bg-cinematic-gradient py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, behind-the-scenes content, 
              and exclusive stories you won't find anywhere else.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="facebook-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
              >
                Follow on Facebook
              </a>
              <a
                href="https://youtube.com/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
              >
                Subscribe on YouTube
              </a>
              <a
                href="https://t.me/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
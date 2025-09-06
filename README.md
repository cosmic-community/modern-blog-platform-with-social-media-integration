# Modern Blog Platform with Social Media Integration

![App Preview](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=300&fit=crop&auto=format)

A sophisticated Next.js blog platform that seamlessly integrates with Facebook, YouTube, Telegram, and WhatsApp. Features cinematic page transitions, real-time social media feeds, and automated cross-platform content sharing.

## ✨ Features

- 🎬 **Cinematic Page Transitions** - Smooth, film-like animations using Framer Motion
- 📱 **Multi-Platform Integration** - Facebook, YouTube, Telegram, and WhatsApp connectivity
- 📊 **Social Media Widgets** - Live feeds and embedded content from all platforms
- 🎯 **Auto-Posting** - Automatically share blog posts across all connected social channels
- 📈 **Analytics Dashboard** - Track engagement across all platforms
- 🌙 **Dark/Light Mode** - Theme switcher with smooth transitions
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ⚡ **SEO Optimized** - Built-in meta tags and social sharing optimization
- 🔄 **Content Scheduler** - Plan and schedule posts across multiple channels
- 💬 **Social Comments** - Unified commenting system from all platforms

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68bca67f285c02bfe718de98&clone_repository=68bcaa21285c02bfe718dea1)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "i need a web side for my blog with integrated Facebook, YouTube, and Telegram, WhatsApp also cinematic transaction"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for cinematic transitions
- **Content Management**: Cosmic CMS
- **Social Integration**: Facebook SDK, YouTube API, Telegram Bot API
- **TypeScript**: Full type safety
- **Package Manager**: Bun
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Social media API keys (Facebook, YouTube, Telegram)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Blog Posts with Author Information

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all published posts with author and category data
const posts = await cosmic.objects
  .find({ type: 'posts', 'metadata.status': 'published' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a New Blog Post

```typescript
const newPost = await cosmic.objects.insertOne({
  type: 'posts',
  title: 'My New Blog Post',
  slug: 'my-new-blog-post',
  metadata: {
    content: 'This is the post content...',
    status: 'published',
    featured_image: { url: 'image-url' },
    author: 'author-id',
    category: 'category-id',
    social_sharing: {
      facebook: true,
      youtube: false,
      telegram: true,
      whatsapp: true
    }
  }
})
```

## 🔗 Cosmic CMS Integration

This application seamlessly integrates with your Cosmic bucket to:

- **Posts**: Main blog content with social sharing settings
- **Authors**: Author profiles with social media links  
- **Categories**: Content categorization and filtering
- **Social Settings**: Platform-specific configuration and API keys
- **Analytics**: Track social media engagement and performance

The app uses Cosmic's depth parameter to efficiently fetch related content like author information and categories in a single request.

## 🌐 Social Media Integration

### Facebook Integration
- Auto-posting to Facebook Pages
- Facebook Comments embedding
- Facebook Like/Share buttons
- Facebook Pixel tracking

### YouTube Integration  
- Embed YouTube videos in posts
- Auto-upload video content
- YouTube comments integration
- Channel subscriber widgets

### Telegram Integration
- Auto-posting to Telegram channels
- Telegram bot for notifications
- Embedded Telegram widgets
- Channel subscriber count

### WhatsApp Integration
- WhatsApp share buttons
- WhatsApp Business API integration
- Contact forms with WhatsApp
- Status updates automation

## 🚀 Deployment

Deploy to Vercel with one click, or manually:

1. Build the application:
   ```bash
   bun run build
   ```

2. Set environment variables in your hosting platform
3. Deploy the `out` folder to your hosting service

For production, configure your social media API keys and webhook URLs in your hosting platform's environment variables.

<!-- README_END -->
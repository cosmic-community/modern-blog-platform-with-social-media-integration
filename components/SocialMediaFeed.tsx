'use client'

import { Facebook, Youtube, MessageCircle, Phone, ExternalLink, Users, Eye, Heart } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

export function SocialMediaFeed() {
  // Mock social media data - in production, this would come from actual APIs
  const socialPosts = [
    {
      platform: 'facebook',
      icon: Facebook,
      title: 'Latest Blog Update',
      content: 'Just published a new article about modern web development trends. Check it out!',
      engagement: '124 likes, 23 comments',
      time: '2 hours ago',
      link: 'https://facebook.com/yourpage',
      bgColor: 'facebook-brand',
    },
    {
      platform: 'youtube',
      icon: Youtube,
      title: 'New Video Tutorial',
      content: 'Watch our latest tutorial on building cinematic web experiences with React.',
      engagement: '1.2K views, 89 likes',
      time: '1 day ago',
      link: 'https://youtube.com/yourchannel',
      bgColor: 'youtube-brand',
    },
    {
      platform: 'telegram',
      icon: MessageCircle,
      title: 'Channel Update',
      content: 'Join our community for exclusive content and behind-the-scenes updates.',
      engagement: '2.3K members',
      time: '3 days ago',
      link: 'https://t.me/yourchannel',
      bgColor: 'telegram-brand',
    },
    {
      platform: 'whatsapp',
      icon: Phone,
      title: 'WhatsApp Status',
      content: 'Share our latest blog posts with your contacts via WhatsApp.',
      engagement: '456 status views',
      time: '5 days ago',
      link: 'https://wa.me/yourphonenumber',
      bgColor: 'whatsapp-brand',
    },
  ]

  const platformStats = [
    {
      platform: 'Facebook',
      icon: Facebook,
      followers: '12.5K',
      growth: '+5.2%',
      color: 'facebook-brand',
    },
    {
      platform: 'YouTube',
      icon: Youtube,
      followers: '8.9K',
      growth: '+12.1%',
      color: 'youtube-brand',
    },
    {
      platform: 'Telegram',
      icon: MessageCircle,
      followers: '3.2K',
      growth: '+8.7%',
      color: 'telegram-brand',
    },
    {
      platform: 'WhatsApp',
      icon: Phone,
      followers: '1.8K',
      growth: '+15.3%',
      color: 'whatsapp-brand',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Platform Statistics */}
      <AnimatedSection variant="fade">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
            <div
              key={stat.platform}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{stat.platform}</h3>
              <p className="text-2xl font-bold mb-1">{stat.followers}</p>
              <p className="text-sm text-green-500 font-medium">{stat.growth}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Recent Social Posts */}
      <AnimatedSection variant="slide" delay={300}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {socialPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 ${post.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <post.icon size={20} className="text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{post.title}</h4>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {post.engagement}
                    </span>
                    
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200 text-sm font-medium"
                    >
                      View Post
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </AnimatedSection>

      {/* Social Media CTA */}
      <AnimatedSection variant="zoom" delay={600}>
        <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Follow us across all platforms to never miss an update. Get exclusive content, 
            behind-the-scenes looks, and connect with our growing community.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 facebook-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
            >
              <Facebook size={18} />
              Follow
            </a>
            <a
              href="https://youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 youtube-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
            >
              <Youtube size={18} />
              Subscribe
            </a>
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 telegram-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
            >
              <MessageCircle size={18} />
              Join
            </a>
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whatsapp-brand text-white px-6 py-3 rounded-lg social-hover font-medium"
            >
              <Phone size={18} />
              Message
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
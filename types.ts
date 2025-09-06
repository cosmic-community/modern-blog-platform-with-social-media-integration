// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Specific object types with properly typed metadata
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    author?: Author;
    category?: Category;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    status: PostStatus;
    tags?: string[];
    summary?: string;
    published_date: string;
    social_sharing?: SocialSharingSettings;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    social_links?: {
      facebook?: string;
      youtube?: string;
      telegram?: string;
      whatsapp?: string;
      twitter?: string;
      instagram?: string;
    };
    role?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
    color?: string;
    icon?: string;
  };
}

// Social sharing settings
export interface SocialSharingSettings {
  facebook?: boolean;
  youtube?: boolean;
  telegram?: boolean;
  whatsapp?: boolean;
  auto_post?: boolean;
  custom_message?: string;
}

// Type literals for select-dropdown values
export type PostStatus = 'published' | 'draft' | 'archived';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Social media integration types
export interface SocialMediaStats {
  facebook?: {
    likes: number;
    shares: number;
    comments: number;
  };
  youtube?: {
    views: number;
    likes: number;
    comments: number;
    subscribers: number;
  };
  telegram?: {
    views: number;
    members: number;
  };
  whatsapp?: {
    status_views: number;
  };
}

// Component prop types
export interface BlogPostCardProps {
  post: Post;
  showAuthor?: boolean;
  showCategory?: boolean;
  className?: string;
}

export interface SocialShareProps {
  post: Post;
  platforms?: ('facebook' | 'youtube' | 'telegram' | 'whatsapp')[];
}

export interface CinematicTransitionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade' | 'slide' | 'zoom' | 'scale';
  duration?: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types for common patterns
export type OptionalMetadata<T> = Partial<T['metadata']>;
export type CreatePostData = Omit<Post, 'id' | 'created_at' | 'modified_at'>;
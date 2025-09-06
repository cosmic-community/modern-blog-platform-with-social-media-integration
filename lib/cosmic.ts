import { createBucketClient } from '@cosmicjs/sdk';
import type { Post, Author, Category, CosmicResponse } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all published posts with author and category data
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.status': 'published' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    
    const posts = response.objects as Post[];
    
    // Sort by published date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at'])
      .depth(1);
    
    const post = response.object as Post;
    
    // Check if post is published
    if (post.metadata?.status !== 'published') {
      return null;
    }
    
    return post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch post with slug: ${slug}`);
  }
}

// Fetch posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.status': 'published'
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    
    const allPosts = response.objects as Post[];
    
    // Filter posts by category slug
    const filteredPosts = allPosts.filter(post => 
      post.metadata?.category?.slug === categorySlug
    );
    
    // Sort by published date (newest first)
    return filteredPosts.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch posts for category: ${categorySlug}`);
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

// Create a new blog post
export async function createPost(postData: {
  title: string;
  slug: string;
  content: string;
  metadata: Post['metadata'];
}): Promise<Post> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'posts',
      title: postData.title,
      slug: postData.slug,
      content: postData.content,
      metadata: {
        ...postData.metadata,
        published_date: postData.metadata.published_date || new Date().toISOString(),
        status: postData.metadata.status || 'draft',
      },
    });
    
    return response.object as Post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
}

// Update a post
export async function updatePost(id: string, updateData: {
  title?: string;
  content?: string;
  metadata?: Partial<Post['metadata']>;
}): Promise<Post> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      ...(updateData.title && { title: updateData.title }),
      ...(updateData.content && { content: updateData.content }),
      ...(updateData.metadata && { metadata: updateData.metadata }),
    });
    
    return response.object as Post;
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }
}
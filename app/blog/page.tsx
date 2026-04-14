import { client } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/lib/queries';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { SanityImage } from '@/components/ui/SanityImage';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await client.fetch(blogPostsQuery);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-8xl font-display mb-8">Insights</h1>
          <p className="text-xl text-brand-light/70 max-w-2xl mb-24 font-light">
            Thoughts on branding, strategy, and design from the Lotus Media team.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts?.map((post: any) => (
            <StaggerItem key={post._id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[4/3] relative overflow-hidden bg-brand-navy mb-6">
                  {post.coverImage ? (
                    <SanityImage
                      image={post.coverImage}
                      alt={post.title}
                      fill
                      className="image-gradient-mask"
                    />
                  ) : (
                    <Image
                      src={`https://picsum.photos/seed/${post.slug}/800/600`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 image-gradient-mask"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                
                <div className="flex gap-2 mb-4">
                  {post.tags?.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="text-xs font-mono text-brand-accent px-2 py-1 border border-brand-accent/30 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-display mb-2 group-hover:text-brand-accent transition-colors">
                  {post.title}
                </h3>
                
                {post.publishedDate && (
                  <p className="text-brand-light/50 text-sm">
                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {(!posts || posts.length === 0) && (
          <div className="text-center py-24 text-brand-light/50">
            No posts found. Check back soon.
          </div>
        )}
      </div>
    </div>
  );
}

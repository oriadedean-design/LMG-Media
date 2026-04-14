import { client } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery } from '@/lib/queries';
import { FadeIn } from '@/components/ui/Animations';
import { SanityImage } from '@/components/ui/SanityImage';
import { Button } from '@/components/ui/Button';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await client.fetch(blogPostsQuery);
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(blogPostBySlugQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Header */}
        <FadeIn className="mb-12 text-center">
          <div className="flex justify-center gap-2 mb-6">
            {post.tags?.map((tag: string) => (
              <span key={tag} className="text-xs font-mono text-brand-accent px-3 py-1 border border-brand-accent/30 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display mb-8 leading-tight text-balance">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-brand-light/70">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.photo ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <SanityImage image={post.author.photo} alt={post.author.name} fill />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-navy overflow-hidden relative">
                    <Image
                      src={`https://picsum.photos/seed/${post.author.name}/100/100`}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            
            {post.author && post.publishedDate && <span>•</span>}
            
            {post.publishedDate && (
              <span>
                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            )}
          </div>
        </FadeIn>

        {/* Cover Image */}
        <FadeIn delay={0.2} className="w-full aspect-[16/9] relative mb-16 rounded-sm overflow-hidden">
          {post.coverImage ? (
            <SanityImage
              image={post.coverImage}
              alt={post.title}
              fill
              priority
            />
          ) : (
            <Image
              src={`https://picsum.photos/seed/${post.slug}/1200/675`}
              alt={post.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          )}
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.3} className="prose prose-invert prose-brand prose-lg max-w-none mb-24">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p>Content coming soon.</p>
          )}
        </FadeIn>

        {/* Newsletter CTA */}
        <FadeIn className="bg-brand-navy p-12 text-center border border-brand-accent/20 rounded-sm">
          <h3 className="text-3xl font-display mb-4">Want more insights like this?</h3>
          <p className="text-brand-light/70 mb-8 max-w-lg mx-auto">
            Join our newsletter for weekly thoughts on branding, strategy, and design. No spam, just value.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-brand-dark border border-brand-light/20 px-4 py-3 flex-grow focus:outline-none focus:border-brand-accent transition-colors text-brand-light"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </FadeIn>
      </div>
    </article>
  );
}

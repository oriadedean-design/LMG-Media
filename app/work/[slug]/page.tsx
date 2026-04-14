import { client } from '@/sanity/lib/client';
import { projectBySlugQuery, allProjectsQuery } from '@/lib/queries';
import { FadeIn } from '@/components/ui/Animations';
import { SanityImage } from '@/components/ui/SanityImage';
import { Button } from '@/components/ui/Button';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await client.fetch(allProjectsQuery);
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await client.fetch(projectBySlugQuery, { slug: params.slug });

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      {/* Project Hero */}
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-sm font-mono text-brand-accent px-3 py-1 border border-brand-accent/30 rounded-full">
              {project.category?.title}
            </span>
            <span className="text-brand-light/50 text-sm">{project.client}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display mb-12">{project.title}</h1>
        </FadeIn>
      </div>

      {/* Cover Image */}
      <FadeIn delay={0.2} className="w-full aspect-[21/9] min-h-[60vh] relative mb-24">
        {project.coverImage ? (
          <SanityImage
            image={project.coverImage}
            alt={project.title}
            fill
            priority
          />
        ) : (
          <Image
            src={`https://picsum.photos/seed/${project.slug}/1920/1080`}
            alt={project.title}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
          />
        )}
      </FadeIn>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          {/* Project Details Sidebar */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <FadeIn>
              <div className="sticky top-32 space-y-8 border-t border-brand-light/10 pt-8">
                <div>
                  <h3 className="text-sm font-mono text-brand-light/50 mb-2">CLIENT</h3>
                  <p className="text-lg">{project.client}</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-brand-light/50 mb-2">SERVICES</h3>
                  <p className="text-lg">{project.category?.title}</p>
                </div>
                {project.publishedDate && (
                  <div>
                    <h3 className="text-sm font-mono text-brand-light/50 mb-2">YEAR</h3>
                    <p className="text-lg">{new Date(project.publishedDate).getFullYear()}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Project Description */}
          <div className="lg:col-span-8 order-1 lg:order-2 prose prose-invert prose-brand max-w-none prose-lg">
            <FadeIn delay={0.1}>
              {project.description ? (
                <PortableText value={project.description} />
              ) : (
                <p className="text-xl font-light leading-relaxed text-brand-light/80">
                  This project exemplifies our commitment to strategic design and intentional positioning. 
                  By understanding the core audience and the brand's unique value proposition, we developed 
                  a comprehensive solution that drives results and elevates the brand's market presence.
                </p>
              )}
            </FadeIn>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-8 md:space-y-16 mb-24">
            {project.gallery.map((image: any, index: number) => (
              <FadeIn key={image._key || index} className="w-full relative">
                <SanityImage
                  image={image}
                  alt={`${project.title} gallery image ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </FadeIn>
            ))}
          </div>
        )}

        {/* Testimonial */}
        {project.testimonialQuote && (
          <FadeIn className="py-24 border-y border-brand-light/10 mb-24 text-center max-w-4xl mx-auto">
            <p className="text-3xl md:text-5xl font-display leading-tight mb-8">
              "{project.testimonialQuote}"
            </p>
            <div>
              <p className="font-medium text-lg">{project.testimonialAuthor}</p>
              <p className="text-brand-light/50">{project.testimonialRole}</p>
            </div>
          </FadeIn>
        )}

        {/* CTA */}
        <FadeIn className="text-center py-12">
          <h2 className="text-4xl md:text-5xl font-display mb-8">Want results like this?</h2>
          <Button href={`/contact?service=${project.category?.slug}`}>Let's talk</Button>
        </FadeIn>
      </div>
    </article>
  );
}

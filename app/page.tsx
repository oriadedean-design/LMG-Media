import { client } from '@/sanity/lib/client';
import { siteSettingsQuery, featuredProjectsQuery, servicesQuery, testimonialsQuery } from '@/lib/queries';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { Button } from '@/components/ui/Button';
import { CrossMark, DotCluster, SectionRule } from '@/components/ui/GeometricMarks';
import { SanityImage } from '@/components/ui/SanityImage';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [settings, featuredProjects, services, testimonials] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(featuredProjectsQuery),
    client.fetch(servicesQuery),
    client.fetch(testimonialsQuery),
  ]);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-dark/80 z-10" />
          <Image
            src="https://picsum.photos/seed/lotus/1920/1080?blur=2"
            alt="Abstract background"
            fill
            className="object-cover opacity-50"
            referrerPolicy="no-referrer"
            priority
          />
        </div>

        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl lg:text-[120px] leading-[0.9] font-display tracking-tight text-balance mb-8">
                {settings?.heroHeadline || 'We take your audience from Point A to B with intention.'}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-brand-light/70 max-w-2xl mb-12 font-light">
                {settings?.heroSubline || 'A premium branding studio for creatives and small businesses.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-6 items-center">
                <Button href="/contact">Start a project</Button>
                <Button href="/work" variant="text">View our work</Button>
              </div>
            </FadeIn>
          </div>
          <div className="hidden lg:flex lg:col-span-3 justify-end items-end pb-12">
            <CrossMark className="w-12 h-12 opacity-50" />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-brand-navy relative">
        <div className="container mx-auto">
          <FadeIn>
            <SectionRule label="EXPERTISE" className="mb-16" />
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services?.map((service: any, index: number) => (
              <StaggerItem key={service._id} className="group">
                <div className="mb-6 text-brand-accent">
                  <span className="text-sm font-mono tracking-widest opacity-50">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-display mb-4 group-hover:text-brand-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-light/60 text-sm leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
                <Link href={`/services#${service.slug}`} className="text-sm font-medium text-brand-accent hover:text-brand-light transition-colors flex items-center gap-2">
                  Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 px-6 md:px-12 relative">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-display">Selected Work</h2>
            </FadeIn>
            <FadeIn delay={0.2} className="hidden md:block">
              <Button href="/work" variant="text">View all projects</Button>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {featuredProjects?.map((project: any, index: number) => (
              <FadeIn key={project._id} delay={index * 0.1} className={index % 2 !== 0 ? 'md:mt-24' : ''}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="hover-corner-expand p-2 -m-2 mb-6">
                    <div className="aspect-[4/5] relative overflow-hidden bg-brand-navy">
                      {project.coverImage ? (
                        <SanityImage
                          image={project.coverImage}
                          alt={project.title}
                          fill
                          className="image-gradient-mask"
                        />
                      ) : (
                        <Image
                          src={`https://picsum.photos/seed/${project.slug}/800/1000`}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 image-gradient-mask"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-display mb-2">{project.title}</h3>
                      <p className="text-brand-light/50 text-sm">{project.client}</p>
                    </div>
                    <span className="text-xs font-mono text-brand-accent px-3 py-1 border border-brand-accent/30 rounded-full">
                      {project.category?.title}
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-12 md:hidden">
            <Button href="/work" variant="secondary" className="w-full">View all projects</Button>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 bg-brand-navy overflow-hidden relative">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <DotCluster className="mb-12 mx-auto" />
            </FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <p className="text-2xl md:text-4xl font-display leading-tight mb-8 text-balance">
                  "{testimonials[0].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  {testimonials[0].photo && (
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <SanityImage image={testimonials[0].photo} alt={testimonials[0].name} fill />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-medium">{testimonials[0].name}</p>
                    <p className="text-sm text-brand-light/50">{testimonials[0].role}, {testimonials[0].company}</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* CTA Block */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent/5 z-0" />
        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-display mb-8">Ready to elevate your brand?</h2>
            <p className="text-xl text-brand-light/70 mb-12">
              Let's build something that resonates.
            </p>
            <Button href="/contact">Start the conversation</Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

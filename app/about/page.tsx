import { client } from '@/sanity/lib/client';
import { teamMembersQuery } from '@/lib/queries';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { SanityImage } from '@/components/ui/SanityImage';
import { SectionRule } from '@/components/ui/GeometricMarks';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export const revalidate = 60;

export default async function AboutPage() {
  const teamMembers = await client.fetch(teamMembersQuery);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          <div className="lg:col-span-5">
            <FadeIn>
              <h1 className="text-5xl md:text-8xl font-display mb-8">About Us</h1>
              <p className="text-xl text-brand-light/70 font-light">
                We are a premium branding studio based in Toronto, dedicated to taking your audience from Point A to B with intention.
              </p>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-7 prose prose-invert prose-brand max-w-none prose-lg">
            <FadeIn delay={0.2}>
              <p>
                Lotus Media was founded on a simple premise: most brands look the same because most agencies think the same. We believe that true differentiation requires a research-first approach, intentional design, and a deep understanding of human behavior.
              </p>
              <p>
                We don't just make things look pretty. We build strategic assets that convert. Whether it's a full brand identity, a high-performance website, or a targeted content campaign, every decision we make is rooted in data and executed with uncompromising taste.
              </p>
              <p>
                Our team is small by design. When you work with us, you work directly with the experts executing your vision. No account managers, no middle-men. Just direct access to premium creative talent.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Team Section */}
        <section>
          <FadeIn>
            <SectionRule label="THE TEAM" className="mb-16" />
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers?.map((member: any) => (
              <StaggerItem key={member._id}>
                <div className="aspect-square relative overflow-hidden bg-brand-navy mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                  {member.photo ? (
                    <SanityImage
                      image={member.photo}
                      alt={member.name}
                      fill
                    />
                  ) : (
                    <Image
                      src={`https://picsum.photos/seed/${member.name}/600/600`}
                      alt={member.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <h3 className="text-2xl font-display mb-1">{member.name}</h3>
                <p className="text-brand-accent text-sm font-mono mb-4">{member.role}</p>
                
                {member.bio && (
                  <div className="text-brand-light/70 text-sm mb-4 line-clamp-3">
                    <PortableText value={member.bio} />
                  </div>
                )}
                
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex gap-4">
                    {member.socialLinks.map((link: any, i: number) => (
                      <a 
                        key={i} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-medium hover:text-brand-accent transition-colors"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </div>
    </div>
  );
}

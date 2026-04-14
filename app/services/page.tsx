import { client } from '@/sanity/lib/client';
import { servicesQuery } from '@/lib/queries';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { SectionRule } from '@/components/ui/GeometricMarks';
import { Button } from '@/components/ui/Button';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await client.fetch(servicesQuery);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-8xl font-display mb-8">Our Services</h1>
          <p className="text-xl text-brand-light/70 max-w-2xl mb-24">
            Comprehensive branding solutions designed to position you as the premium choice in your market.
          </p>
        </FadeIn>

        <div className="space-y-32">
          {services?.map((service: any, index: number) => (
            <section key={service._id} id={service.slug} className="scroll-mt-32">
              <FadeIn>
                <SectionRule label={`0${index + 1} // ${service.title.toUpperCase()}`} className="mb-12" />
              </FadeIn>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-5">
                  <FadeIn delay={0.1}>
                    <h2 className="text-4xl md:text-5xl font-display mb-6">{service.title}</h2>
                    <p className="text-xl text-brand-light/80 mb-8 font-light leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <Button href={`/contact?service=${service.slug}`} variant="secondary">
                      Get a quote for {service.title}
                    </Button>
                  </FadeIn>
                </div>
                
                <div className="lg:col-span-7 prose prose-invert prose-brand max-w-none">
                  <FadeIn delay={0.2}>
                    {service.fullDescription ? (
                      <PortableText value={service.fullDescription} />
                    ) : (
                      <div className="text-brand-light/60 space-y-6">
                        <p>Detailed description coming soon. We approach this service with the same level of intention and strategic thinking as all our work.</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Strategic planning and research</li>
                          <li>Creative execution and refinement</li>
                          <li>Final delivery and implementation</li>
                        </ul>
                      </div>
                    )}
                  </FadeIn>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

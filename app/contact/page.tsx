import { client } from '@/sanity/lib/client';
import { servicesQuery } from '@/lib/queries';
import { FadeIn } from '@/components/ui/Animations';
import { ContactForm } from '@/components/forms/ContactForm';

export const revalidate = 60;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const services = await client.fetch(servicesQuery);
  const defaultService = typeof searchParams.service === 'string' ? searchParams.service : undefined;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <FadeIn>
              <h1 className="text-5xl md:text-8xl font-display mb-8">Let's Talk</h1>
              <p className="text-xl text-brand-light/70 font-light mb-12">
                Ready to elevate your brand? Fill out the form below and we'll get back to you within 24-48 hours.
              </p>
              
              <div className="space-y-8 border-t border-brand-light/10 pt-12">
                <div>
                  <h3 className="text-sm font-mono text-brand-light/50 mb-2">EMAIL</h3>
                  <a href="mailto:hello@lotusmedia.com" className="text-lg hover:text-brand-accent transition-colors">
                    hello@lotusmedia.com
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-brand-light/50 mb-2">LOCATION</h3>
                  <p className="text-lg">Toronto, ON<br/>Available Worldwide</p>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <ContactForm services={services} defaultService={defaultService} />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

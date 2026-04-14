import { client } from '@/sanity/lib/client';
import { allProjectsQuery, servicesQuery } from '@/lib/queries';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { SanityImage } from '@/components/ui/SanityImage';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function WorkPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [projects, services] = await Promise.all([
    client.fetch(allProjectsQuery),
    client.fetch(servicesQuery),
  ]);

  const activeFilter = typeof searchParams.filter === 'string' ? searchParams.filter : 'all';
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter((p: any) => p.category?.slug === activeFilter);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-8xl font-display mb-12">Selected Work</h1>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1} className="mb-16 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 min-w-max">
            <Link 
              href="/work" 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-brand-accent text-white' 
                  : 'border border-brand-light/20 text-brand-light/70 hover:border-brand-accent hover:text-brand-light'
              }`}
            >
              All Work
            </Link>
            {services?.map((service: any) => (
              <Link 
                key={service._id}
                href={`/work?filter=${service.slug}`} 
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === service.slug 
                    ? 'bg-brand-accent text-white' 
                    : 'border border-brand-light/20 text-brand-light/70 hover:border-brand-accent hover:text-brand-light'
                }`}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Project Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects?.map((project: any) => (
            <StaggerItem key={project._id}>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {filteredProjects?.length === 0 && (
          <div className="text-center py-24 text-brand-light/50">
            No projects found for this category.
          </div>
        )}
      </div>
    </div>
  );
}

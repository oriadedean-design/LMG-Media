import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    heroHeadline,
    heroSubline,
    contactEmail,
    socialLinks,
    footerText
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    icon
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedDate desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    client,
    category->{title},
    coverImage
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(publishedDate desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    category->{title, "slug": slug.current},
    coverImage
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    category->{title, "slug": slug.current},
    coverImage,
    gallery,
    description,
    testimonialQuote,
    testimonialAuthor,
    testimonialRole,
    publishedDate
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] {
    _id,
    name,
    role,
    photo,
    bio,
    socialLinks
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] {
    _id,
    name,
    role,
    company,
    quote,
    photo,
    relatedProject->{"slug": slug.current}
  }
`;

export const faqQuery = groq`
  *[_type == "faqItem"] | order(displayOrder asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedDate desc) {
    _id,
    title,
    "slug": slug.current,
    author->{name, photo},
    coverImage,
    tags,
    publishedDate
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    author->{name, photo, bio},
    coverImage,
    body,
    tags,
    publishedDate
  }
`;

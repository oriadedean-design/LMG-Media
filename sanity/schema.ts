import { type SchemaTypeDefinition } from 'sanity';

import siteSettings from './schemas/siteSettings';
import service from './schemas/service';
import project from './schemas/project';
import teamMember from './schemas/teamMember';
import testimonial from './schemas/testimonial';
import faqItem from './schemas/faqItem';
import blogPost from './schemas/blogPost';
import formSubmission from './schemas/formSubmission';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    service,
    project,
    teamMember,
    testimonial,
    faqItem,
    blogPost,
    formSubmission,
  ],
};

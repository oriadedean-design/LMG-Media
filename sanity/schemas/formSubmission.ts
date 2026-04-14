import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company/Brand Name',
      type: 'string',
    }),
    defineField({
      name: 'serviceInterest',
      title: 'Service Interest',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'projectBudget',
      title: 'Project Budget',
      type: 'string',
    }),
    defineField({
      name: 'projectTimeline',
      title: 'Project Timeline',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
  ],
});

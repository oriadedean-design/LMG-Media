'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/Animations';

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string[];
  projectBudget: string;
  projectTimeline: string;
  message: string;
  source: string;
};

export function ContactForm({ services, defaultService }: { services: any[], defaultService?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    defaultValues: {
      serviceInterest: defaultService ? [defaultService] : [],
      source: 'contact_form'
    }
  });

  const selectedServices = watch('serviceInterest') || [];

  const toggleService = (serviceSlug: string) => {
    const current = [...selectedServices];
    const index = current.indexOf(serviceSlug);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(serviceSlug);
    }
    setValue('serviceInterest', current);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-brand-navy p-12 text-center border border-brand-accent/20">
        <h3 className="text-3xl font-display mb-4">Message Received</h3>
        <p className="text-brand-light/70 mb-8">
          Thank you for reaching out. We'll review your details and get back to you within 24-48 hours.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="secondary">Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      {/* Contact Info */}
      <div className="space-y-8">
        <h3 className="text-sm font-mono text-brand-accent tracking-widest">01 // THE BASICS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              id="name"
              className="peer w-full bg-transparent border-b border-brand-light/20 py-4 text-brand-light focus:outline-none focus:border-brand-accent transition-colors placeholder-transparent"
              placeholder="Name"
            />
            <label htmlFor="name" className="absolute left-0 top-4 text-brand-light/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-accent">
              Name *
            </label>
            {errors.name && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.name.message}</span>}
          </div>

          <div className="relative">
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              type="email"
              id="email"
              className="peer w-full bg-transparent border-b border-brand-light/20 py-4 text-brand-light focus:outline-none focus:border-brand-accent transition-colors placeholder-transparent"
              placeholder="Email"
            />
            <label htmlFor="email" className="absolute left-0 top-4 text-brand-light/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-accent">
              Email *
            </label>
            {errors.email && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.email.message}</span>}
          </div>

          <div className="relative">
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className="peer w-full bg-transparent border-b border-brand-light/20 py-4 text-brand-light focus:outline-none focus:border-brand-accent transition-colors placeholder-transparent"
              placeholder="Phone"
            />
            <label htmlFor="phone" className="absolute left-0 top-4 text-brand-light/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-accent">
              Phone (Optional)
            </label>
          </div>

          <div className="relative">
            <input
              {...register('company')}
              type="text"
              id="company"
              className="peer w-full bg-transparent border-b border-brand-light/20 py-4 text-brand-light focus:outline-none focus:border-brand-accent transition-colors placeholder-transparent"
              placeholder="Company"
            />
            <label htmlFor="company" className="absolute left-0 top-4 text-brand-light/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-accent">
              Company / Brand Name
            </label>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="space-y-8">
        <h3 className="text-sm font-mono text-brand-accent tracking-widest">02 // HOW CAN WE HELP?</h3>
        <div className="flex flex-wrap gap-4">
          {services?.map((service) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => toggleService(service.slug)}
              className={`px-6 py-3 rounded-sm text-sm font-medium transition-all ${
                selectedServices.includes(service.slug)
                  ? 'bg-brand-accent text-white border border-brand-accent'
                  : 'border border-brand-light/20 text-brand-light/70 hover:border-brand-accent hover:text-brand-light'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-8">
        <h3 className="text-sm font-mono text-brand-accent tracking-widest">03 // PROJECT DETAILS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <select
              {...register('projectBudget')}
              className="w-full bg-transparent border-b border-brand-light/20 py-4 text-brand-light focus:outline-none focus:border-brand-accent transition-colors appearance-none"
            >
              <option value="" disabled className="bg-brand-dark">Select Budget Range</option>
              <option value="Under $1K" className="bg-brand-dark">Under $1K</option>
              <option value="$1K-$3K" className="bg-brand-dark">$1K - $3K</option>
              <option value="$3K-$5K" className="bg-brand-dark">$3K - $5K</option>
              <option value="$5K-$10K" className="bg-brand-dark">$5K - $10K</option>
              <option value="$10K+" className="bg-brand-dark">$10K+</option>
            </select>
          </div>

          <div className="relative">
            <select
              {...register('projectTimeline')}
              className="w-full bg-transparent border-b border-brand-light/20 py-4 text-brand-light focus:outline-none focus:border-brand-accent transition-colors appearance-none"
            >
              <option value="" disabled className="bg-brand-dark">Select Timeline</option>
              <option value="ASAP" className="bg-brand-dark">ASAP</option>
              <option value="1-2 weeks" className="bg-brand-dark">1-2 weeks</option>
              <option value="1 month" className="bg-brand-dark">1 month</option>
              <option value="2-3 months" className="bg-brand-dark">2-3 months</option>
              <option value="Flexible" className="bg-brand-dark">Flexible</option>
            </select>
          </div>
        </div>

        <div className="relative mt-8">
          <textarea
            {...register('message', { required: 'Please tell us a bit about your project' })}
            id="message"
            rows={4}
            className="peer w-full bg-transparent border-b border-brand-light/20 py-4 text-brand-light focus:outline-none focus:border-brand-accent transition-colors placeholder-transparent resize-none"
            placeholder="Project Details"
          />
          <label htmlFor="message" className="absolute left-0 top-4 text-brand-light/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-accent">
            Tell us about your project *
          </label>
          {errors.message && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.message.message}</span>}
        </div>
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}

      <div className="pt-8">
        <Button type="submit" className="w-full md:w-auto">
          {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
        </Button>
      </div>
    </form>
  );
}

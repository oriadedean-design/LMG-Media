'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-navy py-16 md:py-24 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <Link href="/" className="text-3xl font-display font-bold tracking-tight mb-6 block">
              LOTUS<span className="text-brand-accent">.</span>
            </Link>
            <p className="text-brand-light/70 max-w-sm mb-8">
              We take your audience from Point A to B with intention. A premium branding studio based in Toronto.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm font-medium hover:text-brand-accent transition-colors">Instagram</a>
              <a href="#" className="text-sm font-medium hover:text-brand-accent transition-colors">LinkedIn</a>
              <a href="#" className="text-sm font-medium hover:text-brand-accent transition-colors">Twitter</a>
            </div>
          </div>
          
          <div className="flex flex-col justify-end">
            <h3 className="text-xl font-display mb-4">Join our newsletter</h3>
            <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-b border-brand-light/20 pb-2 flex-grow focus:outline-none focus:border-brand-accent transition-colors text-brand-light placeholder:text-brand-light/40"
                required
              />
              <button 
                type="submit"
                className="text-sm font-medium hover:text-brand-accent transition-colors uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-light/50">
          <p>&copy; {new Date().getFullYear()} Lotus Media. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-light transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import TopNav from './TopNav';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TopNav onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} mobileMenuOpen={mobileMenuOpen} />
      <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}

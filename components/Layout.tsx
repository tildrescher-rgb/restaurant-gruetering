import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const NavLink: React.FC<{ to: string; label: string; onClick?: () => void; active: boolean }> = ({ to, label, onClick, active }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block py-2 text-sm tracking-widest uppercase transition-colors duration-300 ${
      active ? 'text-gruetering-gold' : 'text-gruetering-muted hover:text-gruetering-goldLight'
    }`}
  >
    {label}
  </Link>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: Page.HOME, label: 'Start' },
    { path: Page.MENU, label: 'Küche' },
    { path: Page.RESERVATION, label: 'Reservierung' },
    { path: Page.EVENTS, label: 'Events' },
    { path: Page.LOCATION, label: 'Kontakt' },
  ];

  return (
    <div className="min-h-screen bg-gruetering-black text-gruetering-text font-sans selection:bg-gruetering-gold selection:text-white flex flex-col">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled ? 'bg-gruetering-black/95 backdrop-blur-sm border-gruetering-stone py-4' : 'bg-transparent border-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to={Page.HOME} className="text-2xl font-serif tracking-wider text-gruetering-text hover:text-gruetering-gold transition-colors duration-300">
            GRÜTERING
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-12">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                label={link.label} 
                active={location.pathname === link.path}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gruetering-text hover:text-gruetering-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gruetering-black border-b border-gruetering-stone p-6 flex flex-col items-center space-y-4 shadow-2xl animate-fade-in-down">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                label={link.label} 
                onClick={() => setIsMobileMenuOpen(false)}
                active={location.pathname === link.path}
              />
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 md:pt-32 px-6 container mx-auto max-w-5xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gruetering-stone py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="font-serif text-lg mb-4 text-gruetering-gold">Kontakt</h4>
            <p className="text-gruetering-muted text-sm leading-relaxed">
              Restaurant Grütering<br />
              Musterstraße 42<br />
              48149 Münster<br />
              +49 251 123456
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif text-2xl tracking-widest text-gruetering-stone">G</span>
          </div>
          <div className="flex flex-col md:items-end">
             <div className="flex space-x-6 text-sm text-gruetering-muted mb-4">
               <Link to={Page.IMPRINT} className="hover:text-gruetering-gold transition-colors">Impressum</Link>
               <Link to={Page.TERMS} className="hover:text-gruetering-gold transition-colors">AGB</Link>
             </div>
             <p className="text-xs text-gruetering-stone">© {new Date().getFullYear()} Restaurant Grütering</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
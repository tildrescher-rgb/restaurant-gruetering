import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../types';
import { IMAGES } from '../data/images';

const Home: React.FC = () => {
  // Fallback function if image is missing
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackType: 'hero' | 'gallery') => {
    const target = e.currentTarget;
    target.onerror = null; // Prevent infinite loop
    if (fallbackType === 'hero') {
      target.src = "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=1600&auto=format&fit=crop";
    } else {
      target.src = "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-16 animate-fade-in overflow-hidden">
      
      {/* Hero Visual - Abstract Metal/Wood vibe */}
      <div className="relative w-full h-96 overflow-hidden rounded-sm border-l-2 border-gruetering-gold/30">
        <img 
          src={IMAGES.HOME_HERO}
          alt="Atmosphäre im Grütering" 
          className="object-cover w-full h-full opacity-60 hover:scale-105 transition-transform duration-[2s]"
          onError={(e) => handleImageError(e, 'hero')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gruetering-black via-transparent to-transparent"></div>
      </div>

      {/* Introduction Text */}
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="font-serif text-3xl md:text-5xl leading-tight text-gruetering-text">
          Restaurant Grütering.<br />
          <span className="text-gruetering-gold italic">...einfack lecker essen.</span>
        </h1>
        
        <p className="text-gruetering-muted leading-loose font-light">
          Nichts drängt sich auf. Alles hat Gewicht. 
          Wir zelebrieren die Küche als Handwerk. 
          Ohne Superlative. Ohne Lärm. 
          Einfach ehrliches, tiefes Essen in einer Atmosphäre, die bleibt.
        </p>

        <div className="pt-8">
          <Link 
            to={Page.RESERVATION} 
            className="inline-block border border-gruetering-stone px-8 py-3 text-sm tracking-widest hover:border-gruetering-gold hover:text-gruetering-gold transition-all duration-300"
          >
            TISCH RESERVIEREN
          </Link>
        </div>
      </div>

      {/* Rotating Gallery */}
      <div className="w-full max-w-6xl py-12 relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gruetering-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gruetering-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Marquee Container */}
        <div className="overflow-hidden flex">
           <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap min-w-full">
              {/* Original Set */}
              {IMAGES.GALLERY.map((src, idx) => (
                <div key={`g1-${idx}`} className="w-64 h-40 md:w-80 md:h-52 flex-shrink-0 px-2 opacity-70 hover:opacity-100 transition-opacity duration-500">
                  <img 
                    src={src} 
                    alt={`Galerie ${idx}`} 
                    className="w-full h-full object-cover rounded-sm border border-gruetering-stone/30"
                    onError={(e) => handleImageError(e, 'gallery')}
                  />
                </div>
              ))}
              {/* Duplicate Set for Loop */}
              {IMAGES.GALLERY.map((src, idx) => (
                <div key={`g2-${idx}`} className="w-64 h-40 md:w-80 md:h-52 flex-shrink-0 px-2 opacity-70 hover:opacity-100 transition-opacity duration-500">
                  <img 
                    src={src} 
                    alt={`Galerie ${idx}`} 
                    className="w-full h-full object-cover rounded-sm border border-gruetering-stone/30"
                    onError={(e) => handleImageError(e, 'gallery')}
                  />
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Decorative Line (Metal sculpture motif) */}
      <div className="w-px h-24 bg-gradient-to-b from-gruetering-stone to-transparent mx-auto"></div>

    </div>
  );
};

export default Home;
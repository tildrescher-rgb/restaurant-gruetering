import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../types';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-16 animate-fade-in">
      
      {/* Hero Visual - Abstract Metal/Wood vibe */}
      <div className="relative w-full h-96 overflow-hidden rounded-sm border-l-2 border-gruetering-gold/30">
        <img 
          src="https://picsum.photos/1200/600?grayscale&blur=2" 
          alt="Atmosphäre im Grütering" 
          className="object-cover w-full h-full opacity-60 hover:scale-105 transition-transform duration-[2s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gruetering-black via-transparent to-transparent"></div>
      </div>

      {/* Introduction Text */}
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="font-serif text-3xl md:text-5xl leading-tight text-gruetering-text">
          Ein ruhiger Raum.<br />
          <span className="text-gruetering-gold italic">Vor dem ersten Gang.</span>
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

      {/* Decorative Line (Metal sculpture motif) */}
      <div className="w-px h-24 bg-gradient-to-b from-gruetering-stone to-transparent mx-auto"></div>

    </div>
  );
};

export default Home;
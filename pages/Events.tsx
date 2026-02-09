import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../types';

const Events: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-12 animate-fade-in text-center">
       <div className="space-y-4">
        <h2 className="font-serif text-3xl text-gruetering-gold">Besondere Abende</h2>
        <p className="text-sm text-gruetering-muted uppercase tracking-widest">Gemeinsam am Tisch.</p>
      </div>

      <div className="space-y-8 max-w-md mx-auto">
        <h3 className="font-serif text-4xl md:text-5xl text-gruetering-text tracking-wider">COMING SOON</h3>
        <p className="text-gruetering-muted font-light leading-relaxed">
          Wir planen derzeit neue kulinarische Erlebnisse für Sie.<br/>
          Freuen Sie sich auf besondere Momente.
        </p>
        
        <div className="pt-4">
          <Link 
            to={Page.RESERVATION} 
            className="inline-block border border-gruetering-stone px-8 py-3 text-sm tracking-widest hover:border-gruetering-gold hover:text-gruetering-gold transition-all duration-300 uppercase"
          >
            Tisch reservieren
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;
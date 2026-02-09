import React from 'react';
import { EventItem } from '../types';

const Events: React.FC = () => {
  const events: EventItem[] = [
    {
      date: "14. NOV",
      title: "Wild & Wald",
      description: "Ein 5-Gänge Menü rund um das Beste aus den heimischen Wäldern. Begleitet von tiefen Rotweinen."
    },
    {
      date: "06. DEZ",
      title: "Nikolaus Menü",
      description: "Winterliche Aromen, dunkel und wärmend. Keine Weihnachtslieder, nur Geschmack."
    },
    {
      date: "31. DEZ",
      title: "Jahresausklang",
      description: "Ein stiller, genussvoller Start in das neue Jahr. 7 Gänge, Champagner, Ruhe."
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
       <div className="text-center space-y-4 mb-16">
        <h2 className="font-serif text-3xl text-gruetering-gold">Besondere Abende</h2>
        <p className="text-sm text-gruetering-muted uppercase tracking-widest">Gemeinsam am Tisch.</p>
      </div>

      <div className="relative border-l border-gruetering-stone/30 ml-4 md:ml-0 md:border-l-0">
        {events.map((event, idx) => (
          <div key={idx} className="group flex flex-col md:flex-row gap-8 mb-16 md:items-start pl-8 md:pl-0">
            {/* Artistic element for separation */}
            <div className="hidden md:block w-12 h-px bg-gruetering-stone/50 mt-6 group-hover:bg-gruetering-gold transition-colors duration-500"></div>
            
            <div className="md:w-32 flex-shrink-0">
              <span className="block font-serif text-2xl text-gruetering-gold">{event.date.split('.')[0]}.</span>
              <span className="text-xs tracking-widest text-gruetering-muted uppercase">{event.date.split(' ')[1]}</span>
            </div>
            
            <div className="max-w-xl">
              <h3 className="text-xl font-medium mb-3 text-gruetering-text group-hover:text-gruetering-goldLight transition-colors">{event.title}</h3>
              <p className="text-gruetering-muted font-light leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
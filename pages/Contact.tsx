import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start animate-fade-in">
      
      {/* Text Info */}
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl text-gruetering-gold">Anfahrt & Kontakt</h2>
          <p className="text-gruetering-muted font-light">
            Wir freuen uns auf Ihren Besuch. <br/>
            Parkplätze finden Sie im Innenhof oder entlang der Straße.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <MapPin className="text-gruetering-gold mt-1 shrink-0" size={20} />
            <div>
              <p className="text-gruetering-text">Restaurant Grütering</p>
              <p className="text-gruetering-muted text-sm">Musterstraße 42<br />48149 Münster</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="text-gruetering-gold mt-1 shrink-0" size={20} />
            <div>
              <p className="text-gruetering-text">+49 251 123456</p>
              <p className="text-gruetering-muted text-sm">Ab 16:00 Uhr erreichbar</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Clock className="text-gruetering-gold mt-1 shrink-0" size={20} />
            <div>
              <p className="text-gruetering-text">Öffnungszeiten</p>
              <p className="text-gruetering-muted text-sm mt-1">
                Mi - Sa: 18:00 - 23:00 Uhr<br />
                So: 12:00 - 15:00 & 18:00 - 22:00 Uhr<br />
                Mo & Di: Ruhetag
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Map Placeholder - Styled darker */}
      <div className="w-full h-96 bg-gruetering-stone/20 rounded-sm relative overflow-hidden border border-gruetering-stone/30 group">
         <img 
            src="https://picsum.photos/800/800?grayscale" 
            alt="Karte" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500"
         />
         <div className="absolute inset-0 flex items-center justify-center">
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-2 border border-gruetering-gold text-gruetering-gold text-xs tracking-widest hover:bg-gruetering-gold hover:text-gruetering-black transition-colors"
            >
              KARTE ÖFFNEN
            </a>
         </div>
      </div>

    </div>
  );
};

export default Contact;
import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { IMAGES } from '../data/images';
import { CONTACT } from '../data/contact';

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
          {/* Address */}
          <div className="flex items-start space-x-4 group">
            <MapPin className="text-gruetering-gold mt-1 shrink-0 group-hover:scale-110 transition-transform" size={20} />
            <div>
              <p className="text-gruetering-text font-medium">Restaurant Grütering</p>
              <a 
                href={CONTACT.address.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="text-gruetering-muted text-sm hover:text-gruetering-gold transition-colors"
              >
                {CONTACT.address.street}<br />{CONTACT.address.city}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4 group">
            <Phone className="text-gruetering-gold mt-1 shrink-0 group-hover:scale-110 transition-transform" size={20} />
            <div>
              <a href={CONTACT.phone.link} className="text-gruetering-text hover:text-gruetering-gold transition-colors block">
                {CONTACT.phone.display}
              </a>
              <p className="text-gruetering-muted text-sm">Ab 16:00 Uhr erreichbar</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4 group">
            <Mail className="text-gruetering-gold mt-1 shrink-0 group-hover:scale-110 transition-transform" size={20} />
            <div>
              <a href={`mailto:${CONTACT.email}`} className="text-gruetering-text hover:text-gruetering-gold transition-colors">
                {CONTACT.email}
              </a>
              <p className="text-gruetering-muted text-sm">Für Anfragen & Feedback</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex items-start space-x-4">
            <Clock className="text-gruetering-gold mt-1 shrink-0" size={20} />
            <div>
              <p className="text-gruetering-text mb-1">Öffnungszeiten</p>
              <div className="text-gruetering-muted text-sm space-y-1">
                <p><span className="w-24 inline-block text-gruetering-stone">Mo:</span> {CONTACT.hours.monday}</p>
                <p><span className="w-24 inline-block text-gruetering-stone">Di - Sa:</span> {CONTACT.hours.tue_sat}</p>
                <p><span className="w-24 inline-block text-gruetering-stone">So:</span> {CONTACT.hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Map Placeholder */}
      <div className="w-full h-96 bg-gruetering-stone/20 rounded-sm relative overflow-hidden border border-gruetering-stone/30 group">
         <img 
            src={IMAGES.CONTACT_MAP}
            alt="Karte" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500"
         />
         <div className="absolute inset-0 flex items-center justify-center">
            <a 
              href={CONTACT.address.mapsLink}
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
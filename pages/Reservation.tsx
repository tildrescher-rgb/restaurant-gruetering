import React, { useState } from 'react';

const Reservation: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
        <h2 className="font-serif text-3xl text-gruetering-gold">Vielen Dank.</h2>
        <p className="text-gruetering-muted max-w-md">
          Wir haben Ihre Anfrage erhalten. Wir prüfen die Verfügbarkeit und melden uns in Kürze persönlich bei Ihnen, um die Reservierung zu bestätigen.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl text-gruetering-gold">Ihre Reservierung</h2>
        <p className="text-sm text-gruetering-muted uppercase tracking-widest">Zeit für das Wesentliche.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gruetering-muted">Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors placeholder-gruetering-stone/50"
              placeholder="Ihr Name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gruetering-muted">Telefon</label>
            <input 
              type="tel" 
              required
              className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors placeholder-gruetering-stone/50"
              placeholder="Für Rückfragen"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gruetering-muted">Datum</label>
            <input 
              type="date" 
              required
              className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gruetering-muted">Personen</label>
            <select 
              className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors [&>option]:bg-gruetering-black"
            >
              <option>2 Personen</option>
              <option>3 Personen</option>
              <option>4 Personen</option>
              <option>5 Personen</option>
              <option>6 Personen</option>
              <option>Größere Gesellschaft (auf Anfrage)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gruetering-muted">Anmerkungen</label>
          <textarea 
            rows={3}
            className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors placeholder-gruetering-stone/50 resize-none"
            placeholder="Allergien, besonderer Anlass..."
          ></textarea>
        </div>

        <div className="pt-8 text-center">
          <button 
            type="submit"
            className="border border-gruetering-stone px-12 py-3 text-sm tracking-widest hover:border-gruetering-gold hover:text-gruetering-gold transition-all duration-300"
          >
            ANFRAGE SENDEN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reservation;
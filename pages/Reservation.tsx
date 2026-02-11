import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Check, AlertCircle } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

const Reservation: React.FC = () => {
  const { findAvailableSlots, createReservation } = useSystem();
  
  // Steps: 0 = Search, 1 = Select Time, 2 = Details, 3 = Confirmation
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Data
  const [date, setDate] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  
  const [details, setDetails] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
    terms: false
  });

  // Calculate minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const handleSearch = () => {
    setLoading(true);
    // Simulate check
    setTimeout(() => {
      const slots = findAvailableSlots(date, partySize);
      setAvailableSlots(slots);
      setLoading(false);
      setStep(1);
    }, 500);
  };

  const handleSlotSelect = (time: string) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) return;
    
    setLoading(true);
    const success = await createReservation({
      date,
      time: selectedTime,
      partySize,
      durationMinutes: 90, // Default duration
      customerName: details.name,
      customerPhone: details.phone,
      customerEmail: details.email,
      notes: details.notes,
    });
    
    setLoading(false);
    if (success) {
      setStep(3);
    }
  };

  // --- Render Steps ---

  const renderStep0 = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gruetering-muted">
            <Calendar size={14} /> <span>Datum</span>
          </label>
          <input 
            type="date" 
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent border-b border-gruetering-stone py-4 text-xl text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors [&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>

        {/* Party Size */}
        <div className="space-y-2">
           <label className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gruetering-muted">
            <Users size={14} /> <span>Personen</span>
          </label>
          <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <button
                key={num}
                onClick={() => setPartySize(num)}
                className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border transition-all duration-300 rounded-sm ${
                  partySize === num 
                  ? 'border-gruetering-gold bg-gruetering-gold/10 text-gruetering-gold' 
                  : 'border-gruetering-stone text-gruetering-muted hover:border-gruetering-muted'
                }`}
              >
                {num}
              </button>
            ))}
            <button
               onClick={() => setPartySize(9)}
               className={`px-4 h-12 flex-shrink-0 flex items-center justify-center border transition-all duration-300 rounded-sm ${
                  partySize > 8
                  ? 'border-gruetering-gold bg-gruetering-gold/10 text-gruetering-gold' 
                  : 'border-gruetering-stone text-gruetering-muted hover:border-gruetering-muted'
                }`}
            >
              Größere Gruppe
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button 
          onClick={handleSearch}
          disabled={!date}
          className="w-full md:w-auto border border-gruetering-stone px-12 py-4 text-sm tracking-widest hover:bg-gruetering-gold hover:text-gruetering-black hover:border-gruetering-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'PRÜFE VERFÜGBARKEIT...' : 'TISCH FINDEN'}
        </button>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center border-b border-gruetering-stone pb-4">
        <div>
          <h3 className="text-gruetering-text text-lg font-serif">Verfügbarkeit am {new Date(date).toLocaleDateString('de-DE')}</h3>
          <p className="text-gruetering-muted text-sm">{partySize} Personen</p>
        </div>
        <button onClick={() => setStep(0)} className="text-xs text-gruetering-gold uppercase tracking-widest hover:underline">Ändern</button>
      </div>

      {availableSlots.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {availableSlots.map(slot => (
            <button
              key={slot}
              onClick={() => handleSlotSelect(slot)}
              className="py-3 border border-gruetering-stone text-gruetering-text hover:border-gruetering-gold hover:text-gruetering-gold transition-colors rounded-sm"
            >
              {slot}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <AlertCircle className="mx-auto text-gruetering-muted" size={32} />
          <p className="text-gruetering-text">Leider keine Online-Tische mehr frei.</p>
          <p className="text-sm text-gruetering-muted">Bitte rufen Sie uns an oder lassen Sie sich auf die Warteliste setzen.</p>
          <div className="pt-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 justify-center">
             <button onClick={() => setStep(0)} className="border border-gruetering-stone px-6 py-2 text-xs tracking-widest">NEUE SUCHE</button>
             <a href="tel:023626089512" className="bg-gruetering-gold text-gruetering-black px-6 py-2 text-xs tracking-widest font-medium text-center">ANRUFEN</a>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center border-b border-gruetering-stone pb-4">
        <div>
           <h3 className="text-gruetering-text text-lg font-serif">Ihre Daten</h3>
           <p className="text-gruetering-muted text-sm">{new Date(date).toLocaleDateString('de-DE')} um {selectedTime} Uhr, {partySize} Pers.</p>
        </div>
         <button type="button" onClick={() => setStep(1)} className="text-xs text-gruetering-gold uppercase tracking-widest hover:underline">Zurück</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gruetering-muted">Name *</label>
            <input 
              type="text" 
              required
              value={details.name}
              onChange={e => setDetails({...details, name: e.target.value})}
              className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors"
              placeholder="Vorname Nachname"
            />
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gruetering-muted">Telefon *</label>
            <input 
              type="tel" 
              required
              value={details.phone}
              onChange={e => setDetails({...details, phone: e.target.value})}
              className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors"
              placeholder="Mobilnummer"
            />
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gruetering-muted">Email (Optional)</label>
            <input 
              type="email" 
              value={details.email}
              onChange={e => setDetails({...details, email: e.target.value})}
              className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors"
              placeholder="Bestätigung per Mail"
            />
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gruetering-muted">Notizen</label>
            <input 
              type="text" 
              value={details.notes}
              onChange={e => setDetails({...details, notes: e.target.value})}
              className="w-full bg-transparent border-b border-gruetering-stone py-2 text-gruetering-text focus:outline-none focus:border-gruetering-gold transition-colors"
              placeholder="Allergien, Anlass..."
            />
        </div>
      </div>

      <div className="flex items-start space-x-3 pt-4">
        <input 
          type="checkbox" 
          id="terms" 
          required
          checked={details.terms}
          onChange={e => setDetails({...details, terms: e.target.checked})}
          className="mt-1 bg-transparent border-gruetering-stone"
        />
        <label htmlFor="terms" className="text-sm text-gruetering-muted leading-tight">
          Ich stimme zu, dass meine Daten für die Reservierung verarbeitet werden. <br/>
          Bei Nichterscheinen ohne Absage behalten wir uns vor, die Nummer für künftige Online-Buchungen zu sperren.
        </label>
      </div>

      <div className="pt-4">
         <button 
          type="submit"
          disabled={loading}
          className="w-full border border-gruetering-stone px-12 py-4 text-sm tracking-widest bg-gruetering-text text-gruetering-black hover:bg-gruetering-gold hover:border-gruetering-gold transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'BUCHUNG WIRD ERSTELLT...' : 'RESERVIERUNG ABSCHLIESSEN'}
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full border-2 border-gruetering-gold flex items-center justify-center text-gruetering-gold mb-4">
          <Check size={32} />
        </div>
        <h2 className="font-serif text-3xl text-gruetering-gold">Vielen Dank.</h2>
        <p className="text-gruetering-text text-xl">Wir freuen uns auf Sie, {details.name}.</p>
        <p className="text-gruetering-muted max-w-md leading-relaxed">
          {partySize > 8 
            ? "Da Sie eine größere Gruppe angemeldet haben, prüfen wir die Kapazitäten und melden uns schnellstmöglich persönlich zur Bestätigung."
            : `Ihre Reservierung für ${partySize} Personen am ${new Date(date).toLocaleDateString('de-DE')} um ${selectedTime} Uhr ist bestätigt.`
          }
        </p>
        <div className="pt-8">
          <button onClick={() => window.location.reload()} className="text-xs uppercase tracking-widest text-gruetering-stone hover:text-gruetering-gold">Zurück zur Startseite</button>
        </div>
      </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-fade-in pb-12">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl text-gruetering-gold">Tisch reservieren</h2>
        <p className="text-sm text-gruetering-muted uppercase tracking-widest">Zeit für das Wesentliche.</p>
      </div>

      <div className="bg-gruetering-anthracite/30 p-8 md:p-12 border border-gruetering-stone/20 rounded-sm shadow-xl backdrop-blur-sm">
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default Reservation;
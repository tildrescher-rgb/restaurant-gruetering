import React from 'react';
import { CONTACT } from '../data/contact';

export const Imprint: React.FC = () => (
  <div className="max-w-2xl mx-auto space-y-8 animate-fade-in text-gruetering-muted font-light text-sm">
    <h2 className="font-serif text-2xl text-gruetering-gold mb-8">Impressum</h2>
    <p>
      Restaurant Grütering<br/>
      {CONTACT.address.street}<br/>
      {CONTACT.address.city}
    </p>
    <p>
      Vertreten durch:<br/>
      Familie Grütering
    </p>
    <p>
      Kontakt:<br/>
      Telefon: {CONTACT.phone.display}<br/>
      E-Mail: {CONTACT.email}
    </p>
    <p>
      Umsatzsteuer-ID:<br/>
      Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: [Muss noch ergänzt werden]
    </p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="max-w-2xl mx-auto space-y-8 animate-fade-in text-gruetering-muted font-light text-sm">
    <h2 className="font-serif text-2xl text-gruetering-gold mb-8">Allgemeine Geschäftsbedingungen</h2>
    <div className="space-y-4">
      <h3 className="text-gruetering-text font-medium">1. Geltungsbereich</h3>
      <p>Diese Geschäftsbedingungen gelten für Verträge über die mietweise Überlassung von Konferenz-, Bankett- und Veranstaltungsräumen des Restaurants zur Durchführung von Veranstaltungen sowie für alle damit zusammenhängenden weiteren Leistungen und Lieferungen des Restaurants.</p>
      
      <h3 className="text-gruetering-text font-medium">2. Vertragsabschluss</h3>
      <p>Der Vertrag kommt durch die Annahme des Antrags des Kunden durch das Restaurant zustande; diese sind die Vertragspartner.</p>
      
      <h3 className="text-gruetering-text font-medium">3. Rücktritt</h3>
      <p>Sofern ein kostenfreies Rücktrittsrecht des Kunden innerhalb einer bestimmten Frist schriftlich vereinbart wurde, ist das Restaurant in diesem Zeitraum seinerseits berechtigt, vom Vertrag zurückzutreten.</p>
    </div>
  </div>
);
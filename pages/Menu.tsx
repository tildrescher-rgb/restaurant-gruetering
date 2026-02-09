import React from 'react';
import { MenuItem } from '../types';

const Menu: React.FC = () => {
  const menuData: MenuItem[] = [
    {
      category: "Vorspeisen",
      items: [
        { name: "Waldpilz Consommé", description: "Wacholderöl. Geröstetes Brot. Thymian.", price: "14" },
        { name: "Rote Bete Carpaccio", description: "Ziegenkäse-Asche. Walnuss. Ahornsirup.", price: "16" },
        { name: "Gebeizter Saibling", description: "Gurkensud. Dillblüte. Senfsaat.", price: "19" }
      ]
    },
    {
      category: "Hauptgänge",
      items: [
        { name: "Rehrücken aus der Region", description: "Selleriepüree. Preiselbeerjus. Rosenkohlblätter.", price: "34" },
        { name: "Geschmorte Ochsenbacke", description: "Dunkles Bier. Wurzelgemüse. Kartoffelstampf.", price: "29" },
        { name: "Zander auf der Haut", description: "Beluga Linsen. Speck. Weißweinschaum.", price: "28" },
        { name: "Gerösteter Blumenkohl", description: "Miso-Creme. Haselnuss. Granatapfel.", price: "24" }
      ]
    },
    {
      category: "Dessert",
      items: [
        { name: "Dunkle Schokolade 70%", description: "Meersalz. Olivenöl. Sauerteig-Crumble.", price: "12" },
        { name: "Birne Helene Interpretation", description: "Pochierte Birne. Vanilleeis. Schokoladensauce.", price: "12" }
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl text-gruetering-gold">Speisekarte</h2>
        <p className="text-sm text-gruetering-muted uppercase tracking-widest">Klar. Konzentriert. Hochwertig.</p>
      </div>

      <div className="grid gap-16">
        {menuData.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <h3 className="font-serif text-xl border-b border-gruetering-stone pb-2 inline-block pr-12">{section.category}</h3>
            <div className="grid gap-10 md:grid-cols-2">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="group relative">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-medium text-lg text-gruetering-text group-hover:text-gruetering-goldLight transition-colors">{item.name}</h4>
                    <span className="text-gruetering-gold font-serif">{item.price}</span>
                  </div>
                  <p className="text-gruetering-muted font-light text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-12">
        <p className="text-xs text-gruetering-stone">
          Änderungen vorbehalten. Wir kochen frisch und saisonal.<br/>
          Für Allergiker halten wir eine separate Karte bereit.
        </p>
      </div>
    </div>
  );
};

export default Menu;
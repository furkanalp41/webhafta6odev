import React from 'react';
import KitapKarti from './KitapKarti';

function KitapListe({ kitaplar, favoriler, onFavoriToggle }) {
  if (kitaplar.length === 0) {
    return <p className="bilgi-mesaji">Arama kriterlerinize uygun kitap bulunamadı.</p>
  }
  
  return (
    <div className="kitap-liste-grid">
      {kitaplar.map((kitap) => (
        <KitapKarti
          key={kitap.id}
          kitap={kitap}
          favorideMi={favoriler.includes(kitap.id)}
          onFavoriToggle={onFavoriToggle}
        />
      ))}
    </div>
  );
}

export default KitapListe;
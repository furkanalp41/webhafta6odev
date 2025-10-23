import React from 'react';

function FavoriPaneli({ favoriKitaplar, onFavoriToggle }) {
  return (
    <div className="favori-paneli">
      <h2>Favoriler ({favoriKitaplar.length})</h2>
      {favoriKitaplar.length > 0 ? (
        <ul>
          {favoriKitaplar.map((kitap) => (
            <li key={kitap.id}>
              <span>{kitap.baslik}</span>
              <button onClick={() => onFavoriToggle(kitap.id)}>Kaldır</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="bilgi-mesaji">Henüz favori kitabınız yok.</p>
      )}
    </div>
  );
}

export default FavoriPaneli;
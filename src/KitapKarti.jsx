import React from 'react';

function KitapKarti({ kitap, favorideMi, onFavoriToggle }) {
  const { id, baslik, yazar, kategori } = kitap;

  return (
    <div className="kitap-karti">
      <div className="kitap-bilgi">
        <h3>{baslik}</h3>
        <p className="yazar">{yazar}</p>
        <span className="kategori-etiket">{kategori}</span>
      </div>
      <button
        onClick={() => onFavoriToggle(id)}
        className={favorideMi ? 'favori-btn favoride' : 'favori-btn'}
      >
        {favorideMi ? '★ Favoriden Çıkar' : '☆ Favori Ekle'}
      </button>
    </div>
  );
}

export default KitapKarti;
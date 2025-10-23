import React from 'react';

function KategoriFiltre({ kategoriler, seciliKategori, onKategoriChange }) {
  return (
    <div className="kategori-filtre">
      <select value={seciliKategori} onChange={onKategoriChange}>
        {kategoriler.map(kategori => (
          <option key={kategori} value={kategori}>
            {kategori}
          </option>
        ))}
      </select>
    </div>
  );
}

export default KategoriFiltre;
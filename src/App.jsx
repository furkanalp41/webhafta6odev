

import React from 'react';
import './App.css';
import KitapListe from './KitapListe';
import AramaCubugu from './AramaCubugu';
import KategoriFiltre from './KategoriFiltre';
import FavoriPaneli from './FavoriPaneli';

const siberGuvenlikKitaplari = [
    { id: 1, baslik: 'The Art of Deception', yazar: 'Kevin Mitnick', kategori: 'Social Engineering' },
    { id: 2, baslik: 'Hacking: The Art of Exploitation', yazar: 'Jon Erickson', kategori: 'Penetration Testing' },
    { id: 3, baslik: 'Practical Malware Analysis', yazar: 'Michael Sikorski', kategori: 'Reverse Engineering' },
    { id: 4, baslik: 'The Web Application Hacker\'s Handbook', yazar: 'Dafydd Stuttard', kategori: 'Web Security' },
    { id: 5, baslik: 'Metasploit: The Penetration Tester\'s Guide', yazar: 'David Kennedy', kategori: 'Penetration Testing' },
    { id: 6, baslik: 'Reversing: Secrets of Reverse Engineering', yazar: 'Eldad Eilam', kategori: 'Reverse Engineering' },
    { id: 7, baslik: 'Black Hat Python', yazar: 'Justin Seitz', kategori: 'Scripting' },
];

function App() {
    const [aramaMetni, setAramaMetni] = React.useState('');
    const [aramaGecmisi, setAramaGecmisi] = React.useState(
        () => JSON.parse(localStorage.getItem('aramaGecmisi')) || []
    );
    const [aramaOdakliMi, setAramaOdakliMi] = React.useState(false);
    const [kategori, setKategori] = React.useState('Tümü');
    const [favoriler, setFavoriler] = React.useState(
        () => JSON.parse(localStorage.getItem('favoriler')) || []
    );

    React.useEffect(() => {
        localStorage.setItem('favoriler', JSON.stringify(favoriler));
    }, [favoriler]);

    const handleArama = (event) => {
        setAramaMetni(event.target.value);
    };

    const handleFocus = () => {
        setAramaOdakliMi(true);
    };

    const handleBlur = () => {
        setTimeout(() => setAramaOdakliMi(false), 150);
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const temizlenmisMetin = aramaMetni.trim();
            if (temizlenmisMetin) {
                const yeniGecmis = [
                    temizlenmisMetin,
                    ...aramaGecmisi.filter((item) => item !== temizlenmisMetin)
                ].slice(0, 5);

                setAramaGecmisi(yeniGecmis);
                localStorage.setItem('aramaGecmisi', JSON.stringify(yeniGecmis));
            }
            event.target.blur();
        }
    };

    const handleGecmisAramaClick = (terim) => {
        setAramaMetni(terim);
    };

    const handleKategoriChange = (event) => setKategori(event.target.value);
    
    const handleFavoriToggle = (kitapId) => {
        const yeniFavoriler = favoriler.includes(kitapId)
            ? favoriler.filter((id) => id !== kitapId)
            : [...favoriler, kitapId];
        setFavoriler(yeniFavoriler);
    };

    const filtrelenmisKitaplar = siberGuvenlikKitaplari.filter((kitap) =>
        (kategori === 'Tümü' || kitap.kategori === kategori) &&
        kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase())
    );

    const favoriKitaplar = siberGuvenlikKitaplari.filter((kitap) =>
        favoriler.includes(kitap.id)
    );
    
    const tumKategoriler = ['Tümü', ...new Set(siberGuvenlikKitaplari.map(k => k.kategori))];

    return (
        <div className="app-container">
            <header>
                <h1>Mini Kitaplık</h1>
                <div className="filter-controls">
                    {/* YAPI DEĞİŞİKLİĞİ BURADA BAŞLIYOR */}
                    <div className="arama-container">
                        <AramaCubugu
                            aramaMetni={aramaMetni}
                            onSearch={handleArama}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                        {/* Arama geçmişi listesi artık doğrudan arama kutusunun kapsayıcısı içinde */}
                        {aramaOdakliMi && aramaGecmisi.length > 0 && (
                            <div className="arama-gecmisi-kutusu">
                                <p className="gecmis-baslik">Son Aramalar</p>
                                <ul>
                                    {aramaGecmisi.map((terim, index) => (
                                        <li key={index} onClick={() => handleGecmisAramaClick(terim)}>
                                            {terim}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* YAPI DEĞİŞİKLİĞİ BURADA BİTİYOR */}

                    <KategoriFiltre 
                        kategoriler={tumKategoriler}
                        seciliKategori={kategori}
                        onKategoriChange={handleKategoriChange}
                    />
                </div>
            </header>
            
            {/* Eski "arama-durumu" div'i burdan kaldırıldı. */}

            <main className="main-content">
                <div className="kitap-listesi-panel">
                    <KitapListe
                        kitaplar={filtrelenmisKitaplar}
                        favoriler={favoriler}
                        onFavoriToggle={handleFavoriToggle}
                    />
                </div>
                <div className="favori-paneli-panel">
                    <FavoriPaneli
                        favoriKitaplar={favoriKitaplar}
                        onFavoriToggle={handleFavoriToggle}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
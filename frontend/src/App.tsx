import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface Ogloszenie {
  id: number;
  uzytkownik_id: number;
  tytul: string;
  opis: string;
  cena: string;
  marka_id: number;
  model_id: number;
  vin: string;
  numer_rejestracyjny: string;
  data_pierwszej_rej: string;
  przebieg: number;
  rodzaj_paliwa: string;
  skrzynia_biegow: string;
  pojemnosc_silnika: string;
  status: string;
  created_at: string;
}

function App() {
  const [ogloszenia, setOgloszenia] = useState<Ogloszenie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/ogloszenia`)
      .then(res => res.json())
      .then(data => {
        setOgloszenia(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Błąd pobierania:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Lista ogłoszeń z API:</p>

        {loading ? (
          <p>Ładowanie ogłoszeń...</p>
        ) : (
          <ul className="ogloszenia-list">
            {ogloszenia.map(o => (
              <li key={o.id} className="ogloszenie-item">
                <h3>{o.tytul} ({o.cena} PLN)</h3>
                <p><strong>Opis:</strong> {o.opis}</p>
                <p><strong>Użytkownik ID:</strong> {o.uzytkownik_id}</p>
                <p><strong>Marka ID:</strong> {o.marka_id}, <strong>Model ID:</strong> {o.model_id}</p>
                <p><strong>VIN:</strong> {o.vin}</p>
                <p><strong>Rejestracja:</strong> {o.numer_rejestracyjny}, <strong>Data rej.:</strong> {o.data_pierwszej_rej}</p>
                <p><strong>Przebieg:</strong> {o.przebieg} km</p>
                <p><strong>Paliwo:</strong> {o.rodzaj_paliwa}, <strong>Skrzynia:</strong> {o.skrzynia_biegow}</p>
                <p><strong>Pojemność:</strong> {o.pojemnosc_silnika} L, <strong>Status:</strong> {o.status}</p>
                <p><em>Utworzono: {new Date(o.created_at).toLocaleString()}</em></p>
              </li>
            ))}
          </ul>
        )}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

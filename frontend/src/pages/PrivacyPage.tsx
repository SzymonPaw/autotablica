import React from 'react';
import './PrivacyPage.css';

interface PrivacySection {
  title: string;
  paragraphs: string[];
  list?: string[];
  extraParagraphs?: string[];
}

const lastUpdate = '10 grudnia 2025 r.';

const sections: PrivacySection[] = [
  {
    title: '1. Informacje ogólne',
    paragraphs: [
      'Niniejsza Polityka prywatności wyjaśnia zasady przetwarzania danych osobowych oraz korzystania z plików cookies w serwisie AutoTablica (dalej: Serwis), prowadzonym przez Szymona Paw prowadzącego działalność gospodarczą pod firmą AutoTablica z siedzibą na terytorium Rzeczypospolitej Polskiej (dalej: Administrator).',
      'Dokument został sporządzony zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO), ustawą z dnia 10 maja 2018 r. o ochronie danych osobowych oraz ustawą z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.',
      'Korzystanie z Serwisu oznacza akceptację niniejszej Polityki. W przypadku braku zgody prosimy o zaprzestanie korzystania z Serwisu i usług elektronicznych.',
    ],
  },
  {
    title: '2. Administrator danych',
    paragraphs: [
      'Administratorem danych osobowych jest Szymon Paw (AutoTablica). Kontakt w sprawach ochrony danych możliwy jest pod adresem e-mail: iod@autotablica.pl lub listownie na adres siedziby.',
      'Administrator wyznaczył osobę odpowiedzialną za kontakt w sprawach ochrony danych. Każdy Użytkownik może zwrócić się z pytaniami dotyczącymi sposobu przetwarzania danych lub realizacji swoich praw.',
    ],
  },
  {
    title: '3. Zakres zbieranych danych',
    paragraphs: ['W zależności od korzystanych usług gromadzimy następujące kategorie danych:'],
    list: [
      'Dane rejestracyjne: imię i nazwisko, adres e-mail, numer telefonu, hasło (przechowywane w formie kryptograficznej).',
      'Dane identyfikujące ogłoszenia: informacje o pojeździe, zdjęcia, informacje o cenie i parametrach technicznych.',
      'Dane transakcyjne i księgowe związane z usługami płatnymi (np. wyróżnienia).',
      'Dane techniczne: adres IP, dane logowania, typ urządzenia, przeglądarka i statystyki aktywności (logi systemowe).',
      'Dane pochodzące z plików cookies lub podobnych technologii służących zapewnieniu ciągłości sesji i analityce ruchu.',
    ],
  },
  {
    title: '4. Cele i podstawy przetwarzania danych',
    paragraphs: [
      'Realizacja umów i świadczenie usług drogą elektroniczną (art. 6 ust. 1 lit. b RODO) — obejmuje obsługę kont, publikację ogłoszeń, wyszukiwanie oraz komunikację między Użytkownikami.',
      'Wypełnienie obowiązków prawnych ciążących na Administratorze (art. 6 ust. 1 lit. c RODO), w tym wynikających z przepisów podatkowych, rachunkowych i przepisów o ochronie konsumentów.',
      'Realizacja prawnie uzasadnionych interesów Administratora (art. 6 ust. 1 lit. f RODO), takich jak dochodzenie roszczeń, zapewnienie bezpieczeństwa Serwisu oraz marketing własnych usług.',
      'Na podstawie zgody (art. 6 ust. 1 lit. a RODO) — w przypadku newslettera, komunikacji marketingowej lub przesyłania ofert handlowych drogą elektroniczną.',
    ],
  },
  {
    title: '5. Odbiorcy danych i przekazywanie poza EOG',
    paragraphs: [
      'Dane mogą być przekazywane podmiotom przetwarzającym je na zlecenie Administratora, takim jak dostawcy hostingu, systemów płatności, narzędzi analitycznych, firm księgowych lub kancelarii prawnych. W takich przypadkach zawierane są umowy powierzenia przetwarzania danych.',
      'Dane mogą być przekazywane organom publicznym uprawnionym na mocy przepisów prawa (np. policji, sądom, organom podatkowym).',
      'Administrator nie przekazuje danych osobowych do państw trzecich poza Europejskim Obszarem Gospodarczym, chyba że: (a) Użytkownik udzieli na to wyraźnej zgody, (b) jest to niezbędne do wykonania umowy, lub (c) obowiązuje decyzja stwierdzająca odpowiedni stopień ochrony danych.',
    ],
  },
  {
    title: '6. Okres przechowywania danych',
    paragraphs: [
      'Dane przechowywane są przez okres świadczenia usługi, a po jej zakończeniu — przez czas odpowiadający terminom przedawnienia roszczeń lub wymaganiom prawa podatkowego i rachunkowego.',
      'Dane przetwarzane w oparciu o zgodę będą przechowywane do czasu jej wycofania. Użytkownik może w każdej chwili cofnąć zgodę, co nie wpływa na zgodność z prawem przetwarzania dokonanego przed cofnięciem.',
    ],
  },
  {
    title: '7. Prawa osób, których dane dotyczą',
    paragraphs: ['Użytkownikom przysługują następujące prawa wynikające z RODO:'],
    list: [
      'Prawo dostępu do danych (art. 15 RODO).',
      'Prawo do sprostowania danych (art. 16 RODO).',
      'Prawo do usunięcia danych (art. 17 RODO).',
      'Prawo do ograniczenia przetwarzania (art. 18 RODO).',
      'Prawo do przenoszenia danych (art. 20 RODO).',
      'Prawo sprzeciwu wobec przetwarzania (art. 21 RODO).',
      'Prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.',
    ],
    extraParagraphs: [
      'Realizacja powyższych praw jest możliwa poprzez przesłanie wniosku na adres e-mail iod@autotablica.pl. Administrator udzieli odpowiedzi w terminie do 30 dni, a w przypadkach skomplikowanych — do 90 dni, informując o wydłużeniu terminu.',
    ],
  },
  {
    title: '8. Pliki cookies i technologie śledzące',
    paragraphs: [
      'Serwis wykorzystuje pliki cookies sesyjne i trwałe oraz podobne technologie (np. localStorage) w celach operacyjnych, analitycznych i marketingowych.',
      'Cookies można kontrolować i usuwać w ustawieniach przeglądarki. Ograniczenie stosowania plików cookies może jednak wpłynąć na funkcjonalność Serwisu.',
      'Zgodnie z art. 173 ustawy Prawo telekomunikacyjne użytkownik może wyrazić zgodę na wykorzystywanie cookies za pomocą ustawień przeglądarki lub banera zgody. Informacje o zmianie preferencji znajdują się w sekcji Pomoc.',
    ],
  },
  {
    title: '9. Profilowanie i zautomatyzowane podejmowanie decyzji',
    paragraphs: [
      'Administrator może wykorzystywać dane do profilowania w celu dopasowania treści ogłoszeń, rekomendacji lub komunikacji marketingowej do preferencji Użytkownika.',
      'Profilowanie nie powoduje skutków prawnych wobec Użytkownika ani nie wpływa na jego sytuację w podobny istotny sposób (art. 22 RODO). Użytkownik ma prawo do sprzeciwu wobec profilowania.',
    ],
  },
  {
    title: '10. Środki bezpieczeństwa',
    paragraphs: [
      'Administrator stosuje środki organizacyjne i techniczne zapewniające ochronę danych przed utratą, zniszczeniem, nieuprawnionym dostępem lub ujawnieniem, takie jak szyfrowanie, kopie zapasowe, kontrola dostępu i monitorowanie infrastruktury.',
      'Dostęp do danych osobowych mają wyłącznie upoważnione osoby zobowiązane do zachowania poufności.',
    ],
  },
  {
    title: '11. Zmiany Polityki prywatności',
    paragraphs: [
      'Polityka może być aktualizowana w przypadku zmian przepisów prawa, technologii lub sposobu świadczenia usług. O istotnych zmianach Administrator poinformuje Użytkowników poprzez Serwis lub e-mail, co najmniej 14 dni przed wejściem w życie nowych postanowień.',
      'Dalsze korzystanie z Serwisu po wejściu w życie zmian oznacza ich akceptację.',
    ],
  },
];

const PrivacyPage: React.FC = () => {
  return (
    <div className="privacy-page">
      <header className="privacy-hero">
        <p className="privacy-label">Polityka prywatności</p>
        <h1>Polityka prywatności i cookies AutoTablica</h1>
        <p>Data ostatniej aktualizacji: {lastUpdate}</p>
      </header>

      <div className="privacy-content">
        {sections.map((section) => (
          <section className="privacy-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.extraParagraphs && section.extraParagraphs.map((paragraph, idx) => (
              <p key={`extra-${section.title}-${idx}`}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="privacy-contact">
        <h3>Kontakt w sprawach ochrony danych</h3>
        <p>
          Inspektor Ochrony Danych: iod@autotablica.pl<br />
          AutoTablica &mdash; Szymon Paw<br />
          ul. Przyjazna 1, 00-000 Warszawa
        </p>
        <p>Wnioski dotyczące danych osobowych można przesyłać mailowo lub pocztą tradycyjną. Administrator odpowie nie później niż w terminie 30 dni.</p>
      </div>
    </div>
  );
};

export default PrivacyPage;

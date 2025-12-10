import React from 'react';
import './TermsPage.css';

interface TermsSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

const lastUpdate = '10 grudnia 2025 r.';

const sections: TermsSection[] = [
  {
    title: '1. Postanowienia ogólne',
    paragraphs: [
      'Niniejszy regulamin określa zasady korzystania z platformy AutoTablica, prowadzonej przez Szymona Paw prowadzącego działalność gospodarczą pod firmą AutoTablica na terytorium Rzeczypospolitej Polskiej (dalej: Operator).',
      'Regulamin stanowi regulamin świadczenia usług drogą elektroniczną w rozumieniu art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną i jest udostępniony nieodpłatnie w sposób umożliwiający jego pozyskanie, odtworzenie i utrwalanie.',
      'Operator świadczy usługi pośrednictwa w prezentowaniu ogłoszeń sprzedaży pojazdów mechanicznych, przy czym nie jest stroną umów sprzedaży zawieranych pomiędzy Użytkownikami.',
    ],
    list: [
      'Ustawa z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (Dz.U. z 2020 r. poz. 344).',
      'Ustawa z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. z 2020 r. poz. 287).',
      'Ustawa z dnia 23 kwietnia 1964 r. – Kodeks cywilny (Dz.U. z 2023 r. poz. 1610).',
      'Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z 27 kwietnia 2016 r. (RODO).',
    ],
  },
  {
    title: '2. Definicje',
    paragraphs: ['Dla potrzeb Regulaminu poniższe pojęcia oznaczają:'],
    list: [
      'Serwis – platformę internetową AutoTablica dostępną pod adresem https://autotablica.pl lub w środowisku testowym pod adresem http://localhost:3000.',
      'Użytkownik – osobę fizyczną posiadającą pełną zdolność do czynności prawnych, osobę prawną lub jednostkę organizacyjną, która założyła konto lub korzysta z Serwisu.',
      'Konto – zbiór zasobów w systemie teleinformatycznym Operatora oznaczony indywidualnym loginem i hasłem, w którym gromadzone są dane Użytkownika.',
      'Ogłoszenie – informację handlową dotyczącą pojazdu mechanicznego, przygotowaną i opublikowaną przez Użytkownika w Serwisie.',
      'Konsument – Użytkownik będący konsumentem w rozumieniu art. 22^1 Kodeksu cywilnego.',
    ],
  },
  {
    title: '3. Zakres i warunki świadczenia usług',
    paragraphs: [
      'Operator umożliwia Użytkownikom zakładanie kont, dodawanie ogłoszeń, korzystanie z narzędzi wyszukiwania oraz komunikację pomiędzy zainteresowanymi stronami.',
      'Warunkiem technicznym korzystania z Serwisu jest posiadanie urządzenia z dostępem do Internetu, aktualnej przeglądarki i aktywnego konta poczty elektronicznej.',
      'Użytkownicy zobowiązani są do korzystania z Serwisu w sposób zgodny z prawem, Regulaminem oraz dobrymi obyczajami, a w szczególności do powstrzymania się od dostarczania treści bezprawnych (art. 6 ust. 1 ustawy o świadczeniu usług drogą elektroniczną).',
    ],
  },
  {
    title: '4. Rejestracja i konto',
    paragraphs: [
      'Założenie Konta następuje po wypełnieniu formularza rejestracyjnego i akceptacji Regulaminu. Operator może weryfikować poprawność danych kontaktowych poprzez wysłanie wiadomości e-mail.',
      'Użytkownik jest zobowiązany do nieudostępniania danych logowania osobom trzecim oraz do niezwłocznego zgłaszania podejrzenia nieuprawnionego dostępu.',
      'Operator może zablokować lub usunąć Konto, jeżeli Użytkownik narusza przepisy prawa, niniejszy Regulamin lub godzi w dobre imię Serwisu.',
    ],
  },
  {
    title: '5. Dodawanie i prezentowanie ogłoszeń',
    paragraphs: [
      'Dodając ogłoszenie, Użytkownik oświadcza, że posiada prawo do dysponowania pojazdem oraz materiałami (zdjęcia, opis) i że nie narusza praw osób trzecich.',
      'Ogłoszenie powinno zawierać informacje zgodne ze stanem faktycznym. Operator może odmówić publikacji ogłoszenia lub je usunąć, jeżeli treść narusza prawo, dobre obyczaje lub charakter Serwisu.',
      'Zabronione jest umieszczanie treści wprowadzających w błąd, reklam niezwiązanych z motoryzacją, treści o charakterze obraźliwym lub sprzecznym z art. 3 ust. 1 ustawy o zwalczaniu nieuczciwej konkurencji.',
    ],
  },
  {
    title: '6. Opłaty i zasady zawierania umów',
    paragraphs: [
      'Korzystanie z podstawowych funkcjonalności Serwisu jest bezpłatne, chyba że wyraźnie wskazano inaczej. Odpłatne usługi (np. wyróżnienia) są opisane w cenniku i wymagają akceptacji warunków przed dokonaniem płatności.',
      'Umowy sprzedaży pojazdów zawierane są bezpośrednio pomiędzy Użytkownikami. Operator nie jest stroną tych umów i nie ponosi odpowiedzialności za ich wykonanie, co pozostaje w zgodzie z art. 471 Kodeksu cywilnego.',
      'W przypadku usług płatnych świadczonych drogą elektroniczną Konsumentowi przysługuje prawo odstąpienia od umowy w terminie 14 dni, o ile świadczenie nie zostało w pełni spełnione za jego wyraźną zgodą (art. 27 i art. 38 pkt 13 ustawy o prawach konsumenta).',
    ],
  },
  {
    title: '7. Odpowiedzialność i moderacja',
    paragraphs: [
      'Operator stosuje środki organizacyjne i techniczne zapewniające bezpieczeństwo danych, jednak nie gwarantuje ciągłej dostępności Serwisu, zwłaszcza w razie prac serwisowych lub zdarzeń siły wyższej.',
      'Za treści zamieszczane przez Użytkowników odpowiada ich autor, zgodnie z art. 14 ustawy o świadczeniu usług drogą elektroniczną. Po otrzymaniu wiarygodnego zgłoszenia naruszenia Operator podejmie niezwłoczne działania zmierzające do usunięcia lub zablokowania dostępu do takich treści.',
      'Operator nie ponosi odpowiedzialności za szkody wynikłe z działania lub zaniechania innych Użytkowników, w szczególności za nienależyte wykonanie umów sprzedaży pojazdów.',
    ],
  },
  {
    title: '8. Reklamacje i odstąpienie od umowy',
    paragraphs: [
      'Reklamacje związane z funkcjonowaniem Serwisu należy zgłaszać na adres kontakt@autotablica.pl lub listownie na adres siedziby Operatora.',
      'Operator rozpatrzy reklamację w terminie 14 dni od jej otrzymania, zgodnie z art. 7a ustawy o prawach konsumenta. O wyniku poinformuje Użytkownika w formie elektronicznej.',
      'Konsumentowi przysługuje prawo odstąpienia od umowy o świadczenie usług elektronicznych w terminie 14 dni od zawarcia umowy, chyba że usługa została w pełni wykonana za jego wyraźną zgodą i po poinformowaniu o utracie prawa odstąpienia (art. 27 i art. 38 ustawy o prawach konsumenta).',
    ],
  },
  {
    title: '9. Ochrona danych osobowych i cookies',
    paragraphs: [
      'Administratorem danych osobowych jest Operator. Dane przetwarzane są w celach związanych z realizacją usług świadczonych drogą elektroniczną, obsługą reklamacji oraz – za zgodą – w celach marketingowych (art. 6 ust. 1 lit. b, c i a RODO).',
      'Użytkownik ma prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu. Przysługuje mu także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.',
      'Szczegółowe zasady przetwarzania danych i korzystania z technologii cookies opisuje Polityka prywatności. Korzystanie z Serwisu oznacza akceptację stosowania cookies w celu zapewnienia prawidłowego działania i analityki.',
    ],
  },
  {
    title: '10. Postanowienia końcowe',
    paragraphs: [
      'Operator może zmieniać Regulamin z ważnych przyczyn, w szczególności w przypadku zmian przepisów prawa, rozwoju funkcjonalności Serwisu lub zmiany modelu biznesowego. O zmianach Użytkownik zostanie poinformowany z 14-dniowym wyprzedzeniem.',
      'Do umów zawieranych na podstawie Regulaminu stosuje się prawo polskie oraz właściwe przepisy prawa Unii Europejskiej. Spory z Konsumentami mogą być rozstrzygane w drodze postępowania polubownego lub przed właściwym sądem powszechnym.',
      'Regulamin obowiązuje od dnia publikacji i zastępuje wszystkie wcześniejsze wersje dokumentu.',
    ],
  },
];

const TermsPage: React.FC = () => {
  return (
    <div className="terms-page">
      <header className="terms-hero">
        <p className="terms-label">Regulamin</p>
        <h1>Regulamin świadczenia usług AutoTablica</h1>
        <p>Data ostatniej aktualizacji: {lastUpdate}</p>
      </header>

      <div className="terms-content">
        {sections.map((section) => (
          <section className="terms-section" key={section.title}>
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
          </section>
        ))}
      </div>

      <div className="terms-contact">
        <h3>Kontakt do Operatora</h3>
        <p>
          AutoTablica &mdash; Szymon Paw<br />
          ul. Przyjazna 1, 00-000 Warszawa<br />
          NIP: 000-000-00-00<br />
          e-mail: <a href="mailto:kontakt@autotablica.pl">kontakt@autotablica.pl</a>
        </p>
        <p>W sprawach pilnych prosimy o kontakt elektroniczny &mdash; każda wiadomość otrzyma odpowiedź nie później niż w terminie 14 dni.</p>
      </div>
    </div>
  );
};

export default TermsPage;

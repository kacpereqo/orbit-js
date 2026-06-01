#set text(
  font: "Linux Libertine",
  lang: "pl",
  size: 11pt,
)

#set page(
  paper: "a4",
  margin: (x: 2.5cm, y: 2.5cm),
  numbering: "1",
)

#set heading(numbering: "1.")

// Stylizacja podpisów pod rysunkami
#show figure: set text(size: 9pt, style: "italic")

// --- STRONA TYTUŁOWA ---
#align(center)[
  #v(1cm)
  #text(size: 28pt, weight: "bold")[Układ Słoneczny 3D]

  #text(size: 12pt)[Grafika Komputerowa 2025 / 2026] \
]

// Pcha resztę zawartości na sam dół strony
#v(1fr)

#align(right)[
  #text(size: 14pt)[  Sekcja IP3 ] \
  #text(size: 14pt)[Grupa 3 ] \
  #text(size: 14pt)[Kacper Remzak ] \
  #v(1cm)
]

#pagebreak()
// --- KONIEC STRONY TYTUŁOWEJ ---

// Spis treści
#outline(title: "Spis Treści", indent: 2em)

#pagebreak()

= Wstęp
Projekt "Układ Słoneczny 3D" to interaktywna wizualizacja układu słonecznego, stworzona przy użyciu biblioteki *Three.js*. Aplikacja umożliwia użytkownikom obserwację ruchu planet, zmianę prędkości symulacji, regulację jasności słońca oraz skupienie kamery na wybranej planecie lub słońcu. Projekt jest idealnym przykładem wykorzystania grafiki 3D w przeglądarce do celów edukacyjnych i rozrywkowych.

= Użyte Technologie
- *HTML5*: Struktura strony.
- *CSS3*: Stylowanie interfejsu użytkownika.
- *JavaScript ES6+*: Logika aplikacji.
- *Three.js*: Biblioteka do tworzenia i wyświetlania grafiki 3D w przeglądarce.
- *OrbitControls.js*: Rozszerzenie Three.js do obsługi interaktywnej kamery.

Wybór technologii został poparty, łatwością w przygotowaniu środowiska i multiplatformowością, również ze względu na moje poprzednie doświadczenie z technologiami webowymi.

= Instrukcja Uruchomienia
1. Skopiować ścieżkę do pliku `index.html`.
2. Wkleić skopiowaną ścieżkę w pasek adresu przeglądarki.

= Opis Funkcjonalności

- *Wizualizacja Układu Słonecznego*: Wyświetlanie słońca i sześciu planet (Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn) wraz z ich orbitami.

#figure(
  image("image.png", width: 80%),
  caption: [Widok Układu Słonecznego.],
) <rys1>

- *Interaktywna Kamera*: Użycie `OrbitControls` pozwala na obracanie, przybliżanie i oddalanie widoku sceny za pomocą myszy.

#grid(
  columns: (1fr, 1fr),
  gutter: 10pt,
  figure(
    image("image-1.png", width: 100%),
    caption: [Przykład interakcji z kamerą.],
  ),
  figure(
    image("image-2.png", width: 100%),
    caption: [Inny widok interakcji z kamerą.],
  ),
)

- *Kontrola Prędkości Symulacji*: Suwak na panelu UI umożliwia regulację prędkości, z jaką planety poruszają się po swoich orbitach i obracają wokół własnej osi.

- *Regulacja Jasności Słońca*: Suwak do zmiany intensywności światła emitowanego przez słońce, wpływając na ogólne oświetlenie sceny.

- *Skupienie Kamery na Obiekcie*: Rozwijana lista pozwala na wybranie obiektu (Słońce, konkretna planeta lub widok ogólny), na którym kamera automatycznie się skupi i wokół którego będzie się obracać.

#figure(
  image("image-3.png", width: 55%),
  caption: [Dostępne opcje sterowania.],
)

- *Wizualizacja Orbit*: Przycisk "Pokaż/Ukryj Orbity" kontroluje widoczność linii orbitalnych planet.

#figure(
  image("image-4.png", width: 70%),
  caption: [Wyłączenie orbit.],
)

- *Responsywny Design*: Scena 3D dostosowuje się do rozmiaru okna przeglądarki.

#figure(
  image("image-5.png", width: 70%),
  caption: [Aplikacja uruchomiona w trybie urządzenia mobilnego.],
)

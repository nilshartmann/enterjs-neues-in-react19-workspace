# Streaming

- **Implementiere die Book-Detail-Seite**
    - Die Datei muss sein: `app/books/[bookId]/page.tsx`
    - Über die Properties der Komponente kommst du an die `bookId`
        - Achtung! Seit Next.js 15 sind `params` und `searchParams` Promises!
        - ```tsx
      const BookPage: NextPage<{ params: Promise<{ bookId: string }> }> = async (props) => {
        const params = await props.params;
        const bookId = params.bookId;
      
        // ...
      }            
      ```
    - Du kannst die Seite entweder direkt mit einer ID in der URL aufrufen (http://localhost:3000/books/1) oder du baust dir einen Link in die
      `TabelRow`-Komponente, z.B.
        * ```tsx
      import Link from "next/link";
      
      // ...
      <Link href={`/books/${book.id}`}>{book.isbn}</Link>
      // ...
      ```
    - Verwende `ky` um das Buch sowie dessen Reviews zu lesen. Die Endpunkte lauten jeweils:
        - http://localhost:3001/books/BOOK_ID  (liefert den Typescript-Typ `Book` zurück)
        - http://localhost:3001/books/BOOK_ID/reviews (liefert ein Array von `Review` zurück)
        - Du kannst beide Requests künstlich verzögern, in dem du den Search Param
          `?slowdown=DELAY_IN_MY` an die URL hängst
        - Achte darauf, dass die beiden Requests parallel ausgeführt werden!
    - Zeige das Buch (z.B. dessen Titel und Autoren) und die Reviews an
    - Das Buch soll angezeigt werden, sobald die Daten für das Buch vorliegen. Das Laden der Reviews soll die Darstellung nicht verzögern.
        - Während die Reviews geladen werden, kannst du einen Hinweis für den Benutzer anzeigen ("Reviews loading...")
    - **Optional**: Variiere mit den `Suspense`-Boundaries:
        - Kannst du die Anwendung auch so bauen, dass:
            1. Buch und Review nur zusammendargestellt werden (egal, welcher Request der schnellere ist, es gibt **eine
               ** zentrale Wartemeldung bis beide Request abgeschlossen sind)
                - auch wenn beide Requests parallel ausgeführt werden?
            2. Unabhängig davon, welcher Request zuerst zurückkommt, dessen Daten schon angezeigt werden?
    - **Optional**: Fehlerbehandlung
      - Verwende `ErrorBoundary`-Komponente(n), um Fehler anzuzeigen, z.B. wenn das Buch nicht vorhanden ist
        - Dafür kannst du die Seite mit einer nicht vorhandenen BookId aufrufen (http://localhost:3000/books/666), dann liefert der Endpunkt 404 zurück und `ky` schmeisst einen Fehler
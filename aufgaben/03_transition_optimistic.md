# Transitions und optimistische Updates

- **Die *Likes* für ein Buch sollen erhöht werden!**
- In der `ClientPage`-Komponente musst du eine Funktion bauen, die ein Buch im State aktualisiert:
- Baue eine `LikeWidget`-Komponente
  - Diese braucht drei Properties:
    - `id: string` und `likes: number` eines Buches
    - `onUpdate(updatedBook: Book): void`-Funktion
- Füge die `LikeWidget`-Komponente in einer neuen Spalte in `TableRow` hinzu
- Die `LikeWidget`-Komponente soll die Likes anzeigen. Wenn jemand darauf klickt,
  sollen die Likes im Backend erhöht werden.
  - Dazu kannst du folgenden `ky`-Aufruf verwenden:
    - ```typescript
        const updatedBook = await ky.patch<Book>(`http://localhost:3001/books/${id}`)
          .json();
      ```
    - Das `updatedBook` musst du mit deiner `handleUpdate`-Funktion in den globalen State setzen
- Die Ausführung des "Likens" soll in einer Transition erfolgen. 
  - Zeige dem Benutzer eine Meldung an, während der Request läuft.
  - Während der Request läuft, soll man nicht erneut auf "Like" drücken können
  - Du kannst den Like-Request künstlich verzögern, in dem du den Search Param `?slowdown=delay_in_ms` hinzufügtst, z.B. `?slowdown=2400`
  - Das angenommene Ergebnis (neue Likes) soll dem Benutzer schon während des Requests angezeigt werden (`useOptimistic`)

## Doku

* [useTransition](https://19.react.dev/reference/react/useTransition)
* [useOptimistic](https://19.react.dev/reference/react/useOptimistic)
* [ky-Bibliothek](https://github.com/sindresorhus/ky)
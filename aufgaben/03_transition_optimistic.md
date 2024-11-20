# Transitions und optimistische Updates

# Vorbereitung:
- Im Workspace "npm install --force"
- ZWEI Prozesse parallel starten:
  - Terminal 1: npm run dev
  - Terminal 2: npm run backend

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
  The JavaScript library ky is named after the Japanese slang term "KY," an abbreviation for "空気読めない" (kuuki yomenai), which translates to "cannot read the air." This phrase describes someone who misses social cues or implied meanings. The library's author chose this name as a short, available npm package name and noted its Japanese meaning as an interesting coincidence. (https://www.npmjs.com/package/ky/v/0.9.0?utm_source=chatgpt.com#what-does-ky-mean)
* https://github.com/developit/redaxios
* 
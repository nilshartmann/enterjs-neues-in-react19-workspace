# Übung: useActionState

* Erzeuge eine neue Komponente /app/books/form/page.tsx mit dem Namen `BooksFormPage`
* Implementiere Ein einfaches Formular, um die Werte für die folgenden Eigenschaften zu setzen:
  * isbn, title, author, release, pages, language, price - alle Felder sind einfache Zeichenketten
* Implementiere eine Server Function, um ein Buch zu speichern, verwende dafür `ky.post`
* Verwende die `useActionState`-Funktion und übergib die Server Function als erstes Argument. Der State ist eine Zeichenkette, die eine Fehlermeldung enthält, falls beim Speichern ein Problem auftritt
* Zeige die Fehlermeldung an, um deine User zu informieren.
* Verbinde die submitAction der useActionState-Funktion mit der `action`-Prop des Formulars
* Bonus: zeige eine Information an während der Datensatz gespeichert wird. Verwende dafür die `isPending`-Information von `useActionState´

Syntax:
```ts
const [state, submitAction, isPending] = useActionStatate<StateType, FormData>(serverFunction, initialState);
```
# Übung: Server Function

* **Server Function - I Like!**
* Implementiere die (nahezu) identische Logik des Client-Beispiels jetzt mit einer Server-Funktion
* Lege die Server Function an (`increaseLikes`)
  * In der Server Function musst du das (JSON-)Backend aufrufen
  * Du musst auf das Rückgabe-Promise warten. Die Daten daraus brauchst du aber nicht. Stattdessen weisen wir Next.js an, die Route neuzurendern:
    * `invalidatePath("/books")`
  * Gib einen String zurück, "Liked" oder "Fehler", je nachdem, ob das Like geklappt hat oder nicht
* Baue eine `LikeWidget`-Komponente
  * Du kannst deine client-seitige Komponete übernehmen und anpassen, oder eine neue Komponente bauen
  * Die Komponente braucht die `id` und die `likes` als Property (`onUpdate` aus dem Client-Beispiel brauchen wir nicht)
  * Wenn geklickt wird, ruf deine `increaseLikes`-Server-Function auf
  * Das Liken und die Aktualisierung der Darstellung sollte jetzt funktionieren
* Zeig dem Benutzer Feedback an
  * Verwende den Rückgabewert von `increaseLikes` ("Liked" oder "Fehler") und zeige dem Benutzer entsprechendes Feedback an
* 
# KantoKids V2.6

## Neu in V2.6
- Neue Kategorie **Farben**: Rot, Blau, Gelb, Grün, Orange, Lila, Rosa, Braun, Schwarz, Weiß und Grau.
- Jede Farbe mit kantonesischer Schrift, Jyutping, deutscher Bedeutung und farbiger Darstellung.
- Farben funktionieren in Entdecken, Spielen und im Aufnahmebereich.
- Im Spiel: falsche Antwort = **roter Rahmen**, richtige Antwort = **grüner Rahmen**.
- Nach einer falschen Antwort kann weiter geraten werden; nach einer richtigen Antwort folgt automatisch die nächste Aufgabe.
- Cache-Version `kk-v10`.
- Audio-IndexedDB bleibt unverändert.

## Versionshistorie
### V1
Erste installierbare KantoKids-Web-App mit Lern- und Spielbereich.

### V2
Lokale eigene Sprachaufnahmen, Zahlen 1–100 und erste Alltagsfloskeln.

### V2.1
Verbesserter Aufnahme-Workflow mit Weiter/Zurück, Wischgesten, Fortschrittsanzeige und Suche.

### V2.2
Tagesziel, Tagesfortschritt, langfristige Sterne sowie Familie/Aktivitäten.

### V2.3
Elternbereich mit PIN `1990`, Audio-Backup und Wiederherstellung.

### V2.4
Verbesserte Update-Strategie der Homescreen-PWA mit Offline-Fallback.

### V2.5
Kein Hochscrollen beim Aufnehmen; Aufnahmebereich nach oben; täglicher Reset des Tagesfortschritts ab 00:00 Uhr.

### V2.6
Kategorie Farben mit 11 gebräuchlichen Farben und rot/grünem Antwort-Feedback im Spiel.

## Update
Diese vier Dateien hochladen:
- `index.html` ersetzen
- `sw.js` ersetzen
- `README.md` ersetzen
- `v26.js` **neu hinzufügen**

`app.js`, `data.js`, `manifest.webmanifest` und `icon.svg` bleiben gegenüber V2.5 unverändert.

## Audio-Sicherheit
Die Datenbank `KantoKidsAudio` / `clips` wird durch V2.6 nicht gelöscht oder migriert. Vorhandene Backups weiterhin sicher aufbewahren.

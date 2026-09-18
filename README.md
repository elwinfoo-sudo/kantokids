# KantoKids V2.5

## Neu in V2.5
- Aufnahme-Workflow ohne automatisches Scrollen zum Seitenanfang.
- Beim Speichern sowie bei „Weiter“, „Zurück“ und Wischen bleibt die Aufnahmeansicht an ihrer aktuellen Scrollposition.
- Der Aufnahmebereich steht im Elternbereich jetzt vor Backup und Tagesziel, damit häufiges Aufnehmen schneller erreichbar ist.
- Der Tagesfortschritt wird beim Wechsel auf einen neuen lokalen Kalendertag ab 00:00 Uhr automatisch auf 0 gesetzt.
- Auch wenn KantoKids über Mitternacht geöffnet bleibt, prüft die App regelmäßig den Tageswechsel.
- Beim Zurückkehren in die App wird der Tageswechsel ebenfalls sofort geprüft.
- Sterne/Gesamtbelohnung bleiben vom täglichen Reset unberührt.
- Cache-Version auf `kk-v9` erhöht.
- Audio-IndexedDB `KantoKidsAudio` / `clips` wird nicht verändert.

## Versionshistorie

### V1
- Erste KantoKids-Version als installierbare Web-App.
- Grundlegender Lern- und Spielbereich für kantonesische Wörter.

### V2
- Eigene Sprachaufnahmen direkt im Elternbereich.
- Aufnahmen werden lokal auf dem iPhone in IndexedDB gespeichert und nicht zu GitHub übertragen.
- Zahlen 1–100 und erste Alltagsfloskeln ergänzt.

### V2.1
- Verbesserter Aufnahme-Workflow mit Weiter/Zurück und Wischgesten.
- Fortschrittsanzeige für die Aufnahmeliste.
- Nach dem Speichern bleibt die Aufnahmekarte aktiv.
- Suche für gezielte Sprünge.

### V2.2
- Einstellbares Tagesziel, Standard 20 richtige Wiederholungen.
- Tagesfortschritt und langfristige Sterne.
- Tages-Reset und separater Sterne-Reset.
- Kategorien Familie und Aktivitäten sowie weitere Alltagsbegriffe.

### V2.3
- Elternbereich mit PIN `1990`.
- Elternbereich nach Neustart wieder gesperrt und zusätzlich manuell sperrbar.
- Audio-Backup und Wiederherstellung.
- Export verändert oder löscht die Originalaufnahmen nicht.
- Vor dem Überschreiben vorhandener Aufnahmen beim Import wird nachgefragt.

### V2.4
- Update-Mechanismus der Homescreen-PWA verbessert.
- Zentrale App-Dateien werden online bevorzugt vom Server geladen.
- Cache bleibt als Offline-Fallback.
- Schnellere Service-Worker-Aktivierung und aktive Update-Prüfung.
- Audio-IndexedDB bleibt unangetastet.

### V2.5
- Kein Sprung mehr zum Seitenanfang beim Aufnahme-Workflow.
- Aufnahmebereich im Elternbereich nach oben verschoben.
- Automatischer Tagesreset bei Beginn eines neuen lokalen Kalendertags um 00:00 Uhr, auch bei geöffneter App.
- Sterne bleiben erhalten.

## Wichtiger Hinweis zu den Aufnahmen
Vorhandene Aufnahmen liegen lokal in IndexedDB. Updates dieser Version löschen oder migrieren die Audio-Datenbank nicht. Ein vorhandenes Audio-Backup weiterhin sicher aufbewahren.

## Update über GitHub Pages
Die vier Dateien aus diesem ZIP in das bestehende Repository hochladen und die gleichnamigen Dateien ersetzen. `data.js`, `manifest.webmanifest` und `icon.svg` bleiben unverändert.

# KantoKids V2.4

## Neu in V2.4
- Robustere Update-Strategie für die Homescreen-PWA.
- `index.html`, `app.js` und `data.js` werden bei bestehender Internetverbindung bevorzugt vom Server geladen; der Cache bleibt als Offline-Fallback erhalten.
- Neue Service-Worker-Versionen werden mit `skipWaiting()` schneller aktiviert und mit `clients.claim()` übernommen.
- Beim App-Start wird zusätzlich aktiv nach einem Service-Worker-Update gesucht.
- Cache-Version auf `kk-v8` erhöht.
- Die Audio-Datenbank `KantoKidsAudio` / `clips` wird durch diese Update-Logik nicht gelöscht oder verändert.
- Alle Funktionen aus V2.3 bleiben erhalten: Eltern-PIN 1990 sowie Audio-Backup und Wiederherstellung.

## Versionshistorie

### V1
- Erste KantoKids-Version als installierbare Web-App.
- Grundlegender Lern- und Spielbereich für kantonesische Wörter.

### V2
- Eigene Sprachaufnahmen direkt im Elternbereich.
- Aufnahmen werden lokal auf dem iPhone in IndexedDB gespeichert und nicht zu GitHub übertragen.
- Zahlen 1–100 und erste Alltagsfloskeln ergänzt.

### V2.1
- Verbesserter Aufnahme-Workflow.
- Weiter/Zurück direkt an der Aufnahmekarte.
- Navigation per Wischgeste.
- Fortschrittsanzeige, z. B. 17 / 144.
- Nach dem Speichern bleibt die Aufnahmekarte oben.
- Suche für gezielte Sprünge bleibt erhalten.

### V2.2
- Einstellbares Tagesziel im Elternbereich, Standard 20 richtige Wiederholungen.
- Tagesfortschritt mit automatischem Reset an einem neuen Kalendertag.
- Separater Tages-Reset und Reset aller Sterne.
- Sterne bleiben als langfristige Belohnung erhalten.
- Kategorien „Familie“ und „Aktivitäten“ ergänzt.
- Oma/Opa nach mütterlicher und väterlicher Seite differenziert.
- Weitere Alltagsaktivitäten ergänzt.
- Aufnahme-Workflow aus V2.1 bleibt erhalten.

### V2.3
- Elternbereich mit PIN `1990` geschützt.
- Elternbereich ist nach jedem Neustart wieder gesperrt und kann manuell gesperrt werden.
- Audio-Backup im Elternbereich.
- Lokal gespeicherte Aufnahmen können in eine Backup-Datei exportiert werden.
- Backup kann in einer anderen KantoKids-Installation wiederhergestellt werden.
- Vor dem Überschreiben vorhandener Aufnahmen wird nachgefragt.
- Backup-Erstellung verändert oder löscht die Originalaufnahmen nicht.

### V2.4
- Update-Mechanismus der Homescreen-PWA überarbeitet.
- Zentrale App-Dateien werden online bevorzugt frisch vom Server geladen.
- Offline-Fallback über den Cache bleibt erhalten.
- Neue Service Worker sollen schneller aktiviert und übernommen werden.
- Zusätzliche aktive Update-Prüfung beim App-Start.
- Audio-IndexedDB bleibt unangetastet.

## Wichtiger Hinweis zur Rettung alter Aufnahmen
Die alte Homescreen-Installation, in der die Aufnahmen noch funktionieren, **nicht löschen**.
Keine Safari-/Website-Daten löschen und keinen Speicher bereinigen, solange die Aufnahmen nicht erfolgreich gesichert wurden.

Nach dem Hochladen von V2.4:
1. Die alte KantoKids-Homescreen-App mit bestehender Internetverbindung öffnen.
2. Kurz geöffnet lassen, vollständig schließen und erneut öffnen.
3. Prüfen, ob beim Öffnen des Elternbereichs die PIN `1990` verlangt wird.
4. Sobald die neuen Funktionen dort sichtbar sind, unter „Eltern“ → „Aufnahmen sichern“ sofort „Backup erstellen“ wählen.
5. Die erzeugte KantoKids-Audio-Backup-Datei sicher in „Dateien“ aufbewahren.
6. Erst nach erfolgreicher Wiederherstellung mehrere Aufnahmen testen.

Die alte Homescreen-Installation erst löschen, wenn Backup und Wiederherstellung sicher geprüft wurden.

## Update über GitHub Pages
Die vier Dateien aus diesem ZIP in das bestehende Repository hochladen und die gleichnamigen Dateien ersetzen. `data.js`, `manifest.webmanifest` und `icon.svg` bleiben unverändert.

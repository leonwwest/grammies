# Grammar Games - Clickable Prototype

Open here https://benl-dev.github.io/grammies-prototype/
Ein vollständig funktionsfähiger Clickable Prototype für das Grammar Games Experiment, basierend auf der spezifizierten Hypothese und Roadmap.

## 🎯 Primäre Hypothese (H1)

**Wenn Eltern die Value Proposition „10-minütige, spielerische Grammatik-Games (printable + einfache Routine)" sehen, dann klicken ≥8–12 % auf „Starter-Pack erhalten" und geben ihre E-Mail an.**

## 🖥️ Prototype öffnen

### Option 1: Lokaler Server (empfohlen)
```bash
cd /Users/leonwestermeir/Documents/grammies_prototype
python3 -m http.server 8080
```
Dann öffnen Sie: http://localhost:8080

### Option 2: Direkt im Browser
Öffnen Sie die `index.html` Datei direkt in Ihrem Browser.

## 🔄 5 Prototype Screens

### 1. **Landing (Hero)**
- Headline: „10-Min Grammar Games" 
- Sub-Claims: spielerisch, multisensorisch, kurz, strukturiert
- Badge: „für 4–10 Jahre"
- CTA: „Beispiel-Games ansehen"

### 2. **Preview**
- 1–2 Karten/Printables mit visuellen Beispielen
- Mini-Routine mit Farbcoding/Manipulatives (5 Schritte)
- Wortarten-Sortier-Spiel & Sätze-Bau-Spiel
- CTA: „Passende Spiele für mein Kind"

### 3. **Chooser (Altersauswahl)**
- Auswahl: 4–6 Jahre / 7–10 Jahre
- Altersgerechte Beispiel-Spiele
- Automatischer Übergang nach Auswahl

### 4. **CTA & Capture**
- „Kostenloses Starter-Pack per E-Mail"
- E-Mail-Eingabefeld + optional Name
- Altersgerechte Starter-Pack Inhalte
- Trust-Indicators (kostenlos, sofort, kein Spam)

### 5. **Danke/Next**
- „Pack kommt per Mail" Bestätigung
- Detail-Informationen über nächste Schritte
- Optionen: „mehr Spiele ansehen" & „Nochmal von vorne"

## 🧪 A/B Testing Varianten

**Variante A:** „10-Min Games"
- Fokus auf Zeit-Effizienz und schnelle Ergebnisse

**Variante B:** „Multisensory Grammar at Home"
- Fokus auf ganzheitliche Lernmethoden

### Varianten testen:
- Verwenden Sie die Buttons oben links zum Wechseln
- Headline und Subline ändern sich automatisch
- Analytics tracken beide Varianten separat

## 📊 Metriken & Analytics

Der Prototype misst automatisch:

### Primäre Metriken
- **CTR Hero→Preview:** Klicks von Landing zu Preview Screen
- **CTR Preview→Chooser:** Engagement mit Game-Beispielen  
- **CTR Chooser→Capture:** Interesse nach Altersauswahl
- **E-Mail-Submit-Rate:** **Haupt-KPI für Hypothese-Validierung**

### Zielwerte
- **Primäres Ziel:** ≥8–12% E-Mail-Submit-Rate
- **Sekundär:** ≥70% identifizieren sich als Eltern (über Altersauswahl)

### Analytics Panel
- Live-Metriken unten rechts im Browser
- Farbcodierung: Grün (≥12%), Gelb (8-12%), Rot (<8%)
- Click-through-Raten für jeden Funnel-Schritt

## 🛠️ Features

### Interaktivität
- ✅ Vollständig navigierbare Screens
- ✅ Funktionales E-Mail-Formular mit Validierung
- ✅ Altersauswahl mit dynamischen Inhalten
- ✅ Responsive Design für Mobile/Desktop

### Tracking & Analytics
- ✅ Click-Tracking für alle CTAs
- ✅ Screen-View Tracking
- ✅ A/B Variant Tracking
- ✅ Real-time Metrics Dashboard
- ✅ Conversion Funnel Analysis

### Design
- ✅ Moderne, ansprechende UI
- ✅ Deutsche Texte durchgängig
- ✅ Farbkodierung für Wortarten
- ✅ Smooth Übergänge und Animationen
- ✅ Mobile-optimiert

## 🎮 Test-Funktionen

### Automatische User Journey simulieren:
```javascript
// In Browser Console:
grammarGamesPrototype.simulateUserJourney()
```

### Analytics Report generieren:
```javascript
// In Browser Console:
console.log(grammarGamesPrototype.generateReport())
```

### Manual Testing Checklist:
- [ ] Hero Screen → Preview funktioniert
- [ ] Preview → Age Chooser funktioniert  
- [ ] Altersauswahl (beide Optionen) funktioniert
- [ ] E-Mail-Formular validiert und submitted
- [ ] Thank You Screen erscheint
- [ ] A/B Varianten wechseln korrekt
- [ ] Analytics werden live aktualisiert
- [ ] Mobile Ansicht funktioniert

## 🔧 Technische Details

### Dateien:
- `index.html` - Haupt-HTML mit allen 5 Screens
- `style.css` - Responsive CSS mit modernem Design
- `script.js` - JavaScript für Interaktivität & Analytics
- `README.md` - Diese Dokumentation

### Browser-Kompatibilität:
- Chrome/Safari/Firefox (modern browsers)
- Mobile-optimiert (responsive)
- Keine externen Dependencies außer Google Fonts

## 📈 Hypothesis Testing

Verwenden Sie diesen Prototype um zu testen:

1. **Value Proposition Resonanz:** Welche Variante performt besser?
2. **Funnel Optimierung:** Wo verlieren Sie die meisten Users?
3. **E-Mail Conversion:** Erreichen Sie die 8-12% Zielmarke?
4. **Age Segmentation:** Welche Altersgruppe ist interessierter?

Die Analytics zeigen live, ob Ihre Hypothese validiert wird! 🎯

---

**Erstellt für das Grammar Games Clickable Prototype Experiment**  
*Alle Metriken sind für Testzwecke - integrieren Sie echte Analytics für Produktiv-Tests.*

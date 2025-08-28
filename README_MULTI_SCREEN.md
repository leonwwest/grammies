# Grammar Games - Echtes 5-Screen Clickable Prototype

Ein vollständig funktionsfähiges **Multi-Screen Clickable Prototype** für das Grammar Games Experiment - genau wie in professionellen Prototyping-Tools!

## 🎯 **Primäre Hypothese (H1)**
**Wenn Eltern die Value Proposition „10-minütige, spielerische Grammatik-Games (printable + einfache Routine)" sehen, dann klicken ≥8–12 % auf „Starter-Pack erhalten" und geben ihre E-Mail an.**

---

## 🖥️ **So starten Sie das Prototype:**

### **Option 1: Python Server (empfohlen)**
```bash
cd /Users/leonwestermeir/Documents/grammies_prototype
python3 server.py
```
→ Öffnet automatisch: http://localhost:8080

### **Option 2: Direkt im Browser**
Öffnen Sie `index.html` direkt im Browser (moderne Browser unterstützen dies)

### **Option 3: Live Server (VS Code)**
1. Installieren Sie die "Live Server" Extension in VS Code
2. Rechtsklick auf `index.html` → "Open with Live Server"

---

## 🎮 **5 Separate Screens (echtes Multi-Screen Prototype):**

### **📱 Screen 1: Hero Landing** (`index.html`)
- **Headline:** "10-Min Grammar Games" (A/B testbar)
- **Value Props:** Spielerisch, multisensorisch, kurz, strukturiert
- **Badge:** "Für Kinder 4-10 Jahre"
- **CTA:** "Beispiel-Games ansehen" → `preview.html`

### **🎯 Screen 2: Game Preview** (`preview.html`)
- **Wortarten-Sortier-Spiel** mit visuellen Karten
- **5-Schritt Mini-Routine** detailliert erklärt
- **Sätze-Bau-Spiel** Demonstration
- **CTA:** "Passende Spiele für mein Kind" → `chooser.html`

### **👶 Screen 3: Age Chooser** (`chooser.html`)
- **Altersauswahl:** 4-6 Jahre / 7-10 Jahre
- **Spezifische Beispiel-Spiele** pro Altersgruppe
- **Visuelle Auswahl** mit Hover-Effekten
- **Auto-Weiterleitung** nach Auswahl → `capture.html`

### **📧 Screen 4: Email Capture** (`capture.html`)
- **Personalisierte Starter-Packs** basierend auf Altersauswahl
- **Email + Name Formular** mit Validierung
- **Trust-Indicators:** Kostenlos, sofort, kein Spam
- **CTA:** "Kostenloses Starter-Pack erhalten" → `thankyou.html`

### **🎉 Screen 5: Thank You** (`thankyou.html`)
- **Bestätigung** der Email-Übermittlung
- **Next Steps** erklärt
- **Actions:** "Mehr Spiele" / "Nochmal von vorne"
- **Finale Metriken** und Hypothese-Validierung

---

## 🧪 **A/B Testing Features:**

### **Variante A:** "10-Minuten Grammatik-Games"
- Fokus: Zeit-Effizienz und schnelle Ergebnisse
- Headline: "10-Minuten Grammatik-Games"

### **Variante B:** "Multisensorische Grammatik für zu Hause"  
- Fokus: Ganzheitliche Lernmethoden
- Headline: "Multisensorische Grammatik für zu Hause"

**Wechseln:** Über Buttons oben links auf jeder Seite
**Persistenz:** Variante wird über alle Screens hinweg beibehalten

---

## 📊 **Analytics & Tracking:**

### **Live-Metriken auf jeder Seite:**
- **Screen-spezifische Conversion Rates**
- **Gesamt-Funnel Performance**
- **A/B Varianten Vergleich**
- **Echte Multi-Screen Journey Tracking**

### **Hauptmetriken für Hypothesen-Validierung:**
- ✅ **CTR Hero → Preview** (Interesse an Games)
- ✅ **CTR Preview → Chooser** (Engagement)
- ✅ **CTR Chooser → Capture** (Intent)
- ✅ **Email Submit Rate** (★ Haupt-KPI: 8-12% Ziel)

### **Automatische Berichte:**
- **Session-übergreifendes Tracking** via localStorage
- **Finale Hypothese-Validierung** auf Thank You Seite
- **Detaillierte Console-Reports** für jeden Screen

---

## 🚀 **Warum ist das ein "echtes" Clickable Prototype?**

✅ **5 separate HTML-Dateien** (wie Figma/InVision/Principle)  
✅ **Echte Navigation** zwischen Screens  
✅ **Persistente Daten** über Screen-Grenzen hinweg  
✅ **A/B Testing** funktioniert über alle Screens  
✅ **Analytics** tracken die komplette User Journey  
✅ **Realistische Delays** und Loading-States  
✅ **Mobile-responsive** für echte Geräte-Tests  

### **vs. Single-Page Prototypes:**
❌ Single-Page mit versteckten Divs (nicht realistisch)  
❌ Alle Inhalte in einer Datei (unübersichtlich)  
❌ Kein echtes Multi-Screen Experience  

---

## 🔧 **Dateistruktur:**

```
📁 grammies_prototype/
├── 📄 index.html          # Screen 1: Hero
├── 📄 preview.html        # Screen 2: Game Preview  
├── 📄 chooser.html        # Screen 3: Age Chooser
├── 📄 capture.html        # Screen 4: Email Capture
├── 📄 thankyou.html       # Screen 5: Thank You
├── 🎨 shared.css          # Gemeinsames Styling
├── 🧠 analytics.js        # Cross-Screen Analytics
├── 🚀 server.py           # Lokaler Development Server
└── 📚 README_MULTI_SCREEN.md
```

---

## 📈 **Testing & Validierung:**

### **Komplette User Journey testen:**
1. ✅ **Hero Screen** → Click "Beispiel-Games ansehen"
2. ✅ **Preview Screen** → Click "Passende Spiele für mein Kind"  
3. ✅ **Chooser Screen** → Wähle Altersgruppe (4-6 oder 7-10)
4. ✅ **Capture Screen** → Gib E-Mail ein & submit
5. ✅ **Thank You Screen** → Siehe finale Metriken

### **A/B Testing:**
- 🔄 **Variante wechseln** auf beliebiger Seite
- ✅ **Persistenz prüfen** über alle Screens
- 📊 **Metriken vergleichen** zwischen Varianten

### **Analytics Validierung:**
- 📊 **Live-Updates** auf jedem Screen beobachten
- 🎯 **8-12% Email Submit Rate** anstreben
- 📈 **Console Reports** für detaillierte Daten

---

## 🎯 **Ready für echte User Tests!**

Dieses Prototype ist **production-ready** für:
- ✅ **Echte Zielgruppen-Tests** mit Eltern
- ✅ **A/B Testing** verschiedener Value Propositions  
- ✅ **Conversion-Rate Optimierung**
- ✅ **Hypothesen-Validierung** (8-12% Submit-Rate)
- ✅ **Mobile Testing** auf echten Geräten

**Teilen Sie einfach den Link und sammeln Sie echte Daten!** 📊

---

*Erstellt für das Grammar Games Clickable Prototype Experiment*  
*Echtes 5-Screen Multi-Page Experience für maximalen Realismus* 🚀

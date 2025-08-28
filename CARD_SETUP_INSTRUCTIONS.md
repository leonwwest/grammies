# Card Game PNG Setup Instructions

## 📁 File Organization

Place your PNG card files in the `cards/` folder with these exact filenames. **German and Mandarin versions use completely separate files** to accommodate different pairing structures.

## 🇩🇪 German Language Cards:

### **Character Cards:**
```
cards/german_ich.png          → "ich" character card (boy with closed eyes)
cards/german_I.png            → "I" character card (girl with black hair, yellow dress)
cards/german_du.png           → "du" character card (boy with one wink)
cards/german_you.png          → "you" character card (girl with black hair, yellow dress)
cards/german_er_sie_es.png    → "er/sie/es" character card (boy with both eyes open)
cards/german_he_she_it.png    → "he/she/it" character card (girl with black hair, yellow dress)
```

### **Verb/Flower Cards:**
```
cards/german_bin.png          → "bin" flower card (yellow shell shape)
cards/german_am.png           → "am" flower card (yellow shell shape)
cards/german_bist.png         → "bist" flower card (pink flower shape)
cards/german_are.png          → "are" flower card (pink flower shape)
cards/german_ist.png          → "ist" flower card (white/blue flower shape)
cards/german_is.png           → "is" flower card (white/blue flower shape)
```

## 🇨🇳 Mandarin Language Cards:

### **Character Cards:**
```
cards/mandarin_wo.png         → "我" character card (girl with closed eyes, yellow dress)
cards/mandarin_I.png          → "I" character card (girl with black hair, yellow dress)
cards/mandarin_ni.png         → "你" character card (girl with one wink, yellow dress)
cards/mandarin_you.png        → "you" character card (girl with black hair, yellow dress)
cards/mandarin_ta_ta_ta.png   → "他/她/它" character card (girl with both eyes open, yellow dress)
cards/mandarin_he_she_it.png  → "he/she/it" character card (girl with black hair, yellow dress)
```

### **Verb/Flower Cards with Combined Forms:**
```
cards/mandarin_wo_shi.png     → "我是" flower card (yellow shell shape with Chinese characters)
cards/mandarin_am.png         → "am" flower card (yellow shell shape)
cards/mandarin_ni_shi.png     → "你是" flower card (pink flower shape with Chinese characters)
cards/mandarin_are.png        → "are" flower card (pink flower shape)
cards/mandarin_ta_shi.png     → "他/她/它是" flower card (white/blue flower shape with Chinese characters)
cards/mandarin_is.png         → "is" flower card (white/blue flower shape)
```

## 🎯 Pairing Logic

### **German Pairs (6 pairs of 2 cards each):**
1. **ich** + **I** (German/English pronouns)
2. **bin** + **am** (German/English "to be" for I)
3. **du** + **you** (German/English pronouns) 
4. **bist** + **are** (German/English "to be" for you)
5. **er/sie/es** + **he/she/it** (German/English pronouns)
6. **ist** + **is** (German/English "to be" for he/she/it)

### **Mandarin Pairs (6 pairs of 2 cards each):**
1. **我** + **I** (Chinese/English pronouns)
2. **我是** + **am** (Chinese combined form + English verb)
3. **你** + **you** (Chinese/English pronouns)
4. **你是** + **are** (Chinese combined form + English verb)
5. **他/她/它** + **he/she/it** (Chinese/English pronouns)
6. **他/她/它是** + **is** (Chinese combined form + English verb)

## 🔍 Key Differences:

- **German**: Uses separate pronoun and verb cards (ich + bin)
- **Mandarin**: Uses combined pronoun+verb cards (我是) to show the complete Chinese construction

## 📂 File Structure Example:
```
cards/
├── german_ich.png
├── german_I.png
├── german_bin.png
├── german_am.png
├── german_du.png
├── german_you.png
├── german_bist.png
├── german_are.png
├── german_er_sie_es.png
├── german_he_she_it.png
├── german_ist.png
├── german_is.png
├── mandarin_wo.png
├── mandarin_I.png
├── mandarin_wo_shi.png
├── mandarin_am.png
├── mandarin_ni.png
├── mandarin_you.png
├── mandarin_ni_shi.png
├── mandarin_are.png
├── mandarin_ta_ta_ta.png
├── mandarin_he_she_it.png
├── mandarin_ta_shi.png
└── mandarin_is.png
```

## 🚀 How to Test

1. Place your PNG files in the `cards/` folder with the exact filenames above
2. Open `card-game.html` in your browser
3. Switch between German (Deutsch) and Mandarin (中文) using the language buttons
4. Each language will load its own set of cards with appropriate pairing logic
5. Complete all pairs to see the celebration page!

## 📝 Notes

- **24 total PNG files** needed (12 for German + 12 for Mandarin)
- If a PNG file is missing, the game will show a placeholder with the filename
- The English cards (I, you, he/she/it, am, are, is) appear in both languages but as separate files
- Cards float randomly around the screen and can be dragged to pair slots
- Invalid pairs will automatically return to the floating area
- The celebration page appears when all 3 pairs are correctly matched
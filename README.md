# Skyltkoll

En iPhone-app som visar hastighetsgränsen på vägen du kör på, plus din egen hastighet.
Skärmen blir röd om du kör för fort.

## Hemskärmsappen (ingen nedladdning)

Hemskärmsappen finns i mappen `docs/` och visas via GitHub Pages:
**https://snxp226.github.io/Claude/**

1. Öppna länken i **Safari** på din iPhone.
2. Tryck på **Dela** (fyrkanten med pilen) och välj **Lägg till på hemskärmen**.
3. Öppna Skyltkoll från hemskärmen, tryck **Starta** och tillåt platsåtkomst.

## Riktig app: testa med Expo Go (gratis, ingen Mac behövs)

1. Ladda ner appen **Expo Go** från App Store.
2. Gå till **snack.expo.dev** på en dator.
3. Radera allt i filen `App.js` där och klistra in innehållet från `App.js` i det här projektet.
4. Om sidan frågar om att lägga till `expo-location` och `expo-keep-awake`: klicka **Add/Lägg till**.
5. Klicka på **My Device** till höger. En QR-kod visas.
6. Skanna QR-koden med iPhonens kamera. Appen öppnas i Expo Go.
7. Tillåt platsåtkomst när appen frågar.

## Bra att veta

- Hastighetsgränserna kommer från OpenStreetMap och kan ibland saknas eller vara fel.
- Tillfälliga skyltar (vägarbeten) och tidsstyrda skyltar (skolor) visas inte.
- Skärmen hålls tänd medan appen är öppen. Ha gärna laddsladd i bilen.
- Rör inte telefonen medan du kör.

## Senare: en riktig app i App Store

Samma kod kan byggas till en riktig app med Expos molntjänst (EAS Build), utan Mac.
Det kräver ett Apple Developer-konto (ca 1 000 kr/år).

# Architectuurregels

## 1. Geen god components
Een scherm componeert componenten; complexe logica hoort niet in JSX.

## 2. Eén bron voor formules
Alle technische berekeningen lopen via `src/domain/calculators/engine.ts`.

## 3. JSON blijft brondata
De 39 calculators komen uit `src/data/calculators.json`. UI-labels die nog verfijnd worden staan los in `uiMeta.ts`.

## 4. Geen calculator-specifieke copy-paste
Alle calculator-detailpagina's gebruiken dezelfde route `app/calculator/[id].tsx`.

## 5. Opslag achter adapter
AsyncStorage wordt alleen aangesproken vanuit `src/storage/appStorage.ts`.

## 6. Design tokens centraal
Kleuren, spacing en radius staan in `src/theme/tokens.ts`.

## 7. Maximaal doel per bestand
Als een module meerdere verantwoordelijkheden krijgt, splitsen we ze voordat we nieuwe features toevoegen.

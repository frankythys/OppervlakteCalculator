# Oppervlakte Calculator

Eerste werkende Expo/React Native basis van de Android-app.

## Architectuur

De app is bewust opgesplitst om **god code** te vermijden:

- `app/` — alleen routing en schermcompositie
- `src/components/` — kleine, herbruikbare UI-componenten
- `src/domain/calculators/` — calculator-types, repository en rekenengine
- `src/data/` — de app-ready JSON met 39 calculators
- `src/storage/` — AsyncStorage-adapter
- `src/state/` — favorieten en geschiedenis
- `src/theme/` — design tokens
- `src/utils/` — formattering en invoerhelpers

De calculator-detailpagina is **data-driven**. We maken dus niet 39 bijna identieke schermen.

## Huidige functionaliteit

- Dashboard in de stijl van de Stitch mockup
- 12 categorieën
- 39 calculators geladen uit JSON
- Zoekfunctie
- Favorieten
- Geschiedenis
- Generiek invoerscherm
- Live berekening
- Resultaatkaart
- Reset en opslaan
- Niet-beschikbare lookup-calculators worden veilig geblokkeerd
- Eerste set menselijke labels voor de belangrijkste calculators

## Starten

Vereist Node.js 22.13+ voor Expo SDK 58.

```bash
npm install
npx expo install --fix
npx expo start
```

Voor Android:

```bash
npm run android
```

## Volgende stap

1. Alle 39 calculators van definitieve menselijke labels + eenheden voorzien.
2. Resultaatlabels uit de oude Excel-context opschonen.
3. De vijf Stitch detailmockups pixel-nauwkeuriger overnemen.
4. Lookup-tabellen toevoegen zodra de ontbrekende Excel-tabeldata beschikbaar is.
5. Tests toevoegen met de voorbeeldresultaten uit de JSON.

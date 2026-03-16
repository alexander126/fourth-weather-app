# Fourth Weather App

Expo + React Native weather demo built on top of OpenWeather's 5-day / 3-hour forecast API.

## What this project does

- Shows a 5-day forecast on the home screen
- Lets the user open a day breakdown screen with hourly forecast entries
- Supports current-location weather via `expo-location`
- Includes a demo city picker in the search input dropdown
  - Right now the dropdown only exposes `San Francisco`
- Stores the loaded forecast in Zustand so screens can reuse the same response

## Environment setup

Create a local `.env` file in the project root. A template exists in [.env.example](../fourth-weather-app/.env.example).

Example:

```env
EXPO_PUBLIC_API_URL=https://api.openweathermap.org/data/2.5/forecast
EXPO_PUBLIC_API_KEY=your_openweather_api_key
```

## Install

```bash
npm install
```

## Run the app

Start the Expo development server:

```bash
npx expo start
```

Then press i in the terminal to open the app in the iOS simulator.

Notes:

- The location button will request foreground location permission when used.
- To test user location, please use [this](https://docs.expo.dev/versions/latest/sdk/location/#ios-simulator) guide and change the simulator default location to the desired place. The default simulator location is usually San Francisco, so you will not see a difference unless you change it.

## Target device

This app was developed to be presented on the iOS simulator with the iPhone 16 Pro selected, so the current UI is optimized around that screen size.

## Test and quality checks

Lint:

```bash
npm run lint
```

Type-check:

```bash
npm run type-check
```

CI-style test run:

```bash
npm run test:ci
```

Watch mode:

```bash
npm run test
```

## Git hooks

Husky is configured with:

- `pre-commit`
  - `npm run lint`
  - `npm run type-check`
- `commit-msg`
  - validates the commit message format

Accepted commit prefixes include:

- `add:`
- `fix:`
- `refactor:`
- `feat:`
- `chore:`
- `others available in the commit-msg file`

Example:

```text
add: day forecast breakdown screen
```

## Project structure

```text
src/
  app/          Expo Router route files
  components/   Shared UI components
  config/       Shared constants
  hooks/        Device/app hooks
  screens/      Screen implementations
  services/     API calls
  store/        Zustand state
  theme/        App theme tokens
  utils/        Shared formatting helpers
tests/          Jest tests
typescript/     Shared API types
```

## What I would implement with more time

- Real city search and autocomplete instead of the hardcoded dropdown
- Tanstack fetching rather then base `fetch` api
- Retry controls and more user-friendly error states
- E2E tests
- Better ui, animations & theme improvements (dark mode/fonts)
- Responsiveness across multiple devices
- Localisation
- Release/build automation for distributable app builds
- A backend proxy for the weather API so the API key is not exposed through `EXPO_PUBLIC_*`
- List of selected locations
- Richer weather details on the day screen
  - humidity
  - wind
  - precipitation totals
  - sunrise / sunset

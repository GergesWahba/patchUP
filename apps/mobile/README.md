# PatchUp Mobile

Expo React Native app for PatchUp.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

## Platform scripts

```bash
npm run ios
npm run android
npm run build
```

The `ios` and `android` scripts require a local simulator or emulator setup, or a connected device via Expo tooling.

## API connection

Set `EXPO_PUBLIC_API_URL` to your backend API URL. If you test on a real phone, use your computer's LAN IP instead of `localhost`.

## Environment variables

- `EXPO_PUBLIC_API_URL`: backend API base URL, for example `http://192.168.1.24:4000/api` on a physical device

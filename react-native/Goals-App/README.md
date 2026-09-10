# RNCourse-01

A React Native "Goals" app for my introduction to React Native development, built with Expo SDK 57.

## Prerequisites

- Node.js `22.13.x` or newer
- npm
- For a physical device: the [Expo Go](https://expo.dev/go) app
- For Android: Android Studio with an Android emulator configured, or a physical Android device
- For iOS: macOS with Xcode and an iOS Simulator, or a physical iOS device

## First run

1. Clone the repository and open its directory:

   ```sh
   git clone <repository-url>
   cd RNCourse-01
   ```

2. Install the dependencies:

   ```sh
   npm ci
   ```

3. Start the Expo development server:

   ```sh
   npm run start
   ```

   You can also run `npx expo start` directly.

4. Open the app using one of the options shown by Expo:

   - Scan the QR code with Expo Go on a physical device.
   - Press `a` to open an Android emulator.
   - Press `i` to open an iOS Simulator on macOS.
   - Press `w` to open the app in a web browser.

Keep the terminal running while developing. Expo will normally reload the app when source files change.

## Platform commands

```sh
npm run android  # Start and open Android
npm run ios      # Start and open iOS (macOS only)
npm run web      # Start and open the web version
```

When using Expo Go on a physical device, the device and computer should be on the same Wi-Fi network. If the QR code cannot connect, start Expo with a tunnel:

```sh
npx expo start --tunnel
```

Tunnel connections can be slower than LAN connections.

## Project entry point

The app starts from `index.js` and renders the main application in `App.js`.

## Useful links

- [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/)
- [Expo: Start developing](https://docs.expo.dev/get-started/start-developing/)

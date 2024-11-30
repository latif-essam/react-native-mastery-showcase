# React Native Setup on Windows 11 and other OSs

This guide will walk you through the steps to set up a React Native development environment on a clean installation of Windows 11 using command line tools and providing relevant links.

## Prerequisites

Before you start, ensure you have the following:

- Windows 11 installed on your machine.
- Internet connection.

## Step 1: Install Node.js and npm

Node.js and npm are required to build and run React Native projects.

1. Open Command Prompt or PowerShell.
2. Install Node.js and npm using `winget`:
   ```bash
   winget search Node
   ```
   find the suitable version or stick with lts version
   ```bash
   winget install OpenJS.NodeJS.LTS
   ```
3. Verify the installation:
   ```bash
   node -v
   npm -v
   ```

## Step 2: Install Java Development Kit (JDK)

1. Download and install the Microsoft OpenJDK from the [Microsoft OpenJDK website](https://microsoft.github.io/react-native-windows/).
2. Set the `JAVA_HOME` environment variable:
   1. Open System Properties and go to **Environment Variables**.
   2. Under **System variables**, click **New**.
   3. Set `JAVA_HOME` as the variable name and the path to your JDK installation as the variable value (e.g., `C:\Program Files\Microsoft\jdk-17`).

## Step 3: Install Android Studio

1. Download and install Android Studio from the [official Android Studio website](https://microsoft.github.io/react-native-windows/).
2. During installation, make sure to install the Android SDK, Android SDK Platform-Tools, and Android Emulator.

## Step 4: Set Up Android SDK

1. Open Android Studio.
2. Go to **File > Settings > Appearance & Behavior > System Settings > Android SDK**.
3. Select the SDK Platforms tab and check the latest Android version.
4. Select the SDK Tools tab and check the following:
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android Emulator

## Step 5: Set Environment Variables

1. Open System Properties and go to **Environment Variables**.
2. Add the following system variables:
   - `ANDROID_HOME`: `C:\Users\<YourUserName>\AppData\Local\Android\Sdk`
3. Update the `Path` variable by adding:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\emulator`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

## Step 6: Create a New React Native Project

1. Open Command Prompt or PowerShell.
2. Create a new React Native project using the latest CLI:
   ```bash
   npx @react-native-community/cli@latest init rn_demo
   cd rn_demo
   ```

## Step 7: Install Scrcpy

1. Download `scrcpy` from the [official GitHub repository](https://github.com/Genymobile/scrcpy).
   or install it via winget

```
winget install --id Genymobile.scrcpy
```

2. Extract the downloaded zip file to a directory of your choice.
3. Connect your Android device to your computer using a USB cable.
4. Enable USB debugging on your Android device (Settings > Developer options > USB debugging).
5. Run `scrcpy` from the command line:
   ```bash
   scrcpy
   ```

## Step 8: Run Your React Native Project

### For Android:

1. Start the Android emulator from Android Studio or connect a physical device.
2. Run the project:
   ```bash
   npx react-native run-android
   ```

### For iOS (if you are using a macOS machine):

1. Open your project in Xcode.
2. Select your target device and press the run button or use:
   ```bash
   npx react-native run-ios
   ```

## Optional: Install Using Terminal for Other Systems

For macOS and Linux, you can use the terminal to install the necessary tools:

### macOS:

1. Install Node.js:
   ```bash
   brew install node
   ```
2. Install Watchman:
   ```bash
   brew install watchman
   ```
3. Install Java Development Kit (JDK):
   ```bash
   brew install openjdk
   ```
4. Install Xcode from the Mac App Store and the Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```

### Linux:

1. Install Node.js:
   ```bash
   sudo apt-get update
   sudo apt-get install nodejs
   ```
2. Install Watchman:
   ```bash
   sudo apt-get install watchman
   ```
3. Install Java Development Kit (JDK):
   ```bash
   sudo apt-get install openjdk-17-jdk
   ```
4. Install Android Studio and set up the Android SDK as described above.

## Troubleshooting

### Cleaning and Rebuilding the Project

If you encounter build issues or need to ensure a fresh build, you can clean and rebuild the project using the following steps:

1. Navigate to the `android` directory:
   ```bash
   cd ./android
   ```
2. Run the clean command to remove build artifacts:
   ```bash
   ./gradlew clean
   ```
3. Rebuild the project:
   ```bash
   ./gradlew build
   ```
4. Navigate back to the project root directory:
   ```bash
   cd ..
   ```

This process helps resolve potential issues by ensuring that your next build starts from a clean state.

## Troubleshooting with `doctor` Command

If you encounter any issues during the setup process, you can use the `doctor` command to diagnose common issues:

```bash
npx react-native doctor
```

For more information, refer to the [React Native documentation](https://reactnative.dev/docs/environment-setup).

---

By following these steps, you should have a fully functional React Native development environment set up on your Windows 11 machine. Happy coding!

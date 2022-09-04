# SoundApp

Steps to run the project

Open you terminal pointing to the root folder of the project and run the following commands in specified order.

`yarn` - Installs all npm dependencies

### iOS:

Run the following command on terminal:

`yarn pods` - script to install pods on iOS

`yarn ios` - runs the project on iOS

### Android:

Run the following command on terminal:

`yarn android` - runs the project on Android

### Note:

You can test the project on both iOS and android simulators respectively, but simulators do not support changing volume levels, you will need to test the same on a real physical device. 
The dependency used for changing volume levels is `react-native-volume-manager`, you can confirm this requirement here: https://github.com/hirbod/react-native-volume-manager#notice

# SoundApp

### Steps to run the project

Open your terminal pointing to the root folder of the project and run the following commands in specified order.

`yarn` - Installs all npm dependencies

## iOS:

`yarn pods` - script to install all the pods on iOS

`yarn ios` - runs the project on the iOS platform

## Android:

`yarn android` - runs the project on the Android platform

## Notes:

1. You can test the project on both iOS and android simulators respectively, but simulators do not support changing volume levels, you will need to test the same on a real physical device. 
The dependency used for changing volume levels is `react-native-volume-manager`, you can confirm this requirement here: https://github.com/hirbod/react-native-volume-manager#notice

2. The video attached is recorded using `screen recorder`, so the volume level changes are not observale or distorted (only in the attached video), although it works flawlessly on real devices. Once you run the code on your real device, you can test it. The video is recorded on `One plus 7T - Android`. Unfortunately, I could not test the volume change level feature on a real iPhone device.

## Android video



https://user-images.githubusercontent.com/60910844/189544303-aef28d38-f906-497c-bab1-e2538b08e607.mp4




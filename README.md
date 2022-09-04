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

2. The video attached is recorded using `screen recorder`, so the volume level changes are not observale, although it works flawlessly. Once you run the code on your real device, you can test it. The video is recorded on `One plus 7T - Android`. Unfortunately, I could not test the volume change level feature on a real iPhone device.

3. Playing multiple sounds together is very much possible in the current code with just a simple tweak, but here I stopped the previous sound to play the selected one purposely because of the awful sounds in the output :) 

4. The `sound icon levitating animation on selected` in the requirement is achieved a little differently here, I am performing the same kind of animation on `selected music file name and playing sound waves (as I call them)`, just to give a different flavour altogether.

## Android video



https://user-images.githubusercontent.com/60910844/188329130-0223d08c-e8cc-46a2-9c00-c1cd5d646025.mp4



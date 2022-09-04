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

### Notes:

1. You can test the project on both iOS and android simulators respectively, but simulators do not support changing volume levels, you will need to test the same on a real physical device. 
The dependency used for changing volume levels is `react-native-volume-manager`, you can confirm this requirement here: https://github.com/hirbod/react-native-volume-manager#notice

2. The video attached is recorded using `screen recorder`, so the volume level change is not observale although it works flawlessly. Once you run the code on your real device, you can test it.

3. Playing multiple sounds together is very much possible with the current code with just a simple tweak, but here I stopped the previous sound to play the selected one purposely because of the awful sounds in the output :) 

4. The `sound icon levitating animation on selected` in the requirement is achieved a little differently here, I am performing the same kind of animation on `selected music file name and playing sound waves (as I call them)`

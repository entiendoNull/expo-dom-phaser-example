# Simple Expo DOM Component + Phaser Example

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Description

Just a simple example of how to use the [Expo DOM Component](https://docs.expo.dev/guides/dom-components/) with [Phaser](https://phaser.io/).

It uses Expo DOM Components and leverage from the experimental [useImperativeHandle](https://docs.expo.dev/guides/dom-components/#passing-refs) to pass the game functions (DOM component) to the parent component (native).

The UI (buttons and score) is implemented with React Native components, while the game itself runs with Phaser within a DOM component.

This example partly follows the [Phaser tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game/part1), but was modified (e.g. no usage of keyboard) so that it could be used to run on mobile devices. I didn't implement it all as I just really wanted to try the useImperativeHandle out, and this was a fun way to do it.

It runs with Expo Go (only tested it on iOS).

Check out Expo and Phaser if you're interested to learn more.

![IMG_0552](https://github.com/user-attachments/assets/37e8ff9c-2516-440c-90f2-a4fc715e44f6)

# Windups Demo

A small React app that shows off [windups](https://github.com/sgwilym/windups), a typewriter effect library for React by Sam Gwilym. It types out text one character at a time, and it works on JSX too, so styled and nested elements type out as well.

I made this for my class Show and Tell project.

## Features

The app has five demo cards, one for each part of the library:

1. **useWindupString**: The simplest API. A hook that types out a plain string, with Skip and Replay buttons.
2. **WindupChildren**: Types out JSX/TSX, including **bold**, *italic*, and custom-styled text.
3. **Pace & Pause**: Changes the typing speed partway through and adds a pause.
4. **OnChar, Effect & isPaused**: Runs a callback on every character, fires an effect at a set point, and lets you pause and resume.
5. **Playground**: Enter your own text and pick the typing speed with a slider.

## Using windups in Your Own Project

Install the package:

```bash
npm install windups
```

or

```bash
yarn add windups
```

Basic usage with the hook:

```jsx
import { useWindupString } from "windups";

function Greeting() {
  const [text] = useWindupString("Hello, world!");
  return <p>{text}</p>;
}
```

Typing out JSX with custom speed and a pause:

```jsx
import { WindupChildren, Pace, Pause } from "windups";

function Intro() {
  return (
    <WindupChildren>
      <Pace ms={25}>{"I can talk really fast... "}</Pace>
      <Pause ms={1000} />
      <Pace ms={200}>{"or reeeally slow."}</Pace>
    </WindupChildren>
  );
}
```

## Credits

The windups library was created by [Sam Gwilym](https://github.com/sgwilym). I found it on [madewithreactjs.com](https://madewithreactjs.com/windups).
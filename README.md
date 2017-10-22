# waves - ui

_Low level components for the display and edition of audio and timeseries data._

![waves-ui screenshot](https://raw.githubusercontent.com/wavesjs/ui/master/examples/assets/waves-ui-screenshot.png)

## Usage

```bash
npm install --save wavesjs/waves-ui
```

consume in your modules

```javascript
import * as ui from 'waves-ui';
```

## Documentation

- [Basic examples](http://wavesjs.github.io/waves-ui/manual/example.html#examples)  
- [Full documentation](http://wavesjs.github.io/waves-ui/)

## Goals and Features

*waves - ui* proposes primitives to build interactive temporal visualizations of audio and timeseries data for in-browser rendering. 
It has been designed by abstracting common features required in both music production environments and analysis authoring tools. 
Its main goal is to ease the development of audio-based web applications requiring interactive temporal visualizations. 
Its components have been designed to easily create aligned superposed and/or juxtaposed representations of audio signals and related data streams such as audio descriptors, motion capture signals and descriptors as well as event or segmentation markers and annotations.

## Library Overview

Synthetic view of the library components and their interconnections:

`Timeline` 1⬄n `Track` 1⬄n `Layer` and its associated `Shape`: `Waveform`, `Marker`, `Segment` ...

### Timeline

The `timeline` is the main entry point of a temporal representation, it:
- contains factories to manage its `tracks` and `layers`,
- provides the context for any visualization of temporal data, gets or sets the view overs its `tracks` through `offset`, `zoom`, `pixelsPerSecond`, `visibleWidth`,
- is the central hub for all user interaction events (keyboard, mouse),
- holds the current interaction `state` which defines how the different timeline elements (tracks, layers, shapes) respond to those events.

### Track

The `tracks` simply organize the vertical arrangement of the `layers`. They are similar to the tracks of a Digital Audio Workstation. 

Each `track` is associated to a DOM element.

### Layer

The `layers`: 
- contain a reference to the audio data or timeserie, 
- have `start`, `offset`, `duration`, `stretchRatio` getters/setters to position it on the overall timeline,
- configure a `Shape` to display the data, 
- set a `Behavior` to modify the data (both programmatically or based on user interaction dispatched from the `timeline` and its current `state`). 

Each `layer` is associated to a DOM element.

### Shape

The library comes with usual shapes to display audio data and timeseries: 

- `waveform`
- `segment` and `annotated-segment`
- `marker` and `annotated-marker` 
- `dot` and `line`, for break point functions (used for automation curves)
- `trace`
- `cursor` 

The library also provides a template (`BaseShape`) to create custom shapes to display the data.

### Interactions - states

The `timeline` registers events to listen to from: 
- the keyboard,
- the mouse upon each of its tracks. 

A `state` of the timeline sorts these events and call the appropriate methods to:
- browse and zoom into the tracks (`BrushZoomState`, `CenteredZoomState`)
- modify layers time characteristics (`ContextEditionState`)
- modify layers data (`EditionState`)
- select layers time characteristics, data (`SelectionState`)

`BaseState` is the base class to implement a specific `state` thus defining a custom event handlers for the `Timeline`.

### Behavior

The `behaviors` give an entry point to modify a shape or a layer directly from its rendering. It allows you to programmatically move DOM elements associated to a shape or a layer and modify accordingly the data associated to it. 

The `BaseBehavior` is the base class to define custom interaction with a shape.

### Utils

Traditionally, timeseries data can be formated like an array of object or multiple arrays. An `OrthogonalData` instance can format the datas in one or another formats.

## Custom build

In order to create your own custom build, you need to
remove/comment all the component you don't need from `waves-ui.js`, then run

```bash
npm run bundle
```

_`core/timeline`, `core/layer`, and `helpers/utils` are mandatory_

## Pull-Request, Tests and Coverage

To collaborate, you need to install dependencies referenced in "globalDependencies[nonStandard]" key of package.json so that `npm run test`, `npm run coverage` will correctly run. (We didn't put this dependencies in the package.json because you have probably already installed these ones globally and because they are huge.)

Pull-Request are reviewed as long as they: 
* provide test 
* keep a good code coverage
* fill an explained use-case regarding the library goals

## License

This module is released under the BSD-3-Clause license.

## Acknowledgments

This code is part of the [WAVE](http://wave.ircam.fr) project, funded by ANR (The French National Research Agency).

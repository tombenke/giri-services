giri-services
=============

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coveralls][BadgeCoveralls]][Coveralls]

## About

The backend services of the giri system.

This is a standalone application that holds the REST endpoint implementations of the giri backend services.


## Installation

Run the install command:

    npm install -g giri-services

Check if giri-services is properly installed:

```bash
    $ giri-services --help

    Options:
      --version        Show version number                                 [boolean]
      --config, -c     The name of the configuration file    [default: "config.yml"]
      --logLevel, -l   The log level                      [string] [default: "info"]
      --logFormat, -t  The log (`plainText` or `json`)
                                                     [string] [default: "plainText"]
      --help           Show help                                           [boolean]
```

## Configuration

TODO

## Usage

Start the application:

```bash
    $ giri-services
    2019-05-17T06:22:06.090Z [giri-services@3.2.0] info: Start up pdmsHemera
    2019-05-17T06:22:07.663Z [giri-services@3.2.0] info: hemera: "Connected!"
    2019-05-17T06:22:07.668Z [giri-services@3.2.0] info: Hemera is connected
    2019-05-17T06:22:07.670Z [giri-services@3.2.0] info: Start up service adapter
    2019-05-17T06:22:07.678Z [giri-services@3.2.0] info: hemera: {"topic":"/systems","method":"get","uri":"/systems"}
    2019-05-17T06:22:07.684Z [giri-services@3.2.0] info: hemera: {"topic":"/systems","method":"post","uri":"/systems"}
    2019-05-17T06:22:07.685Z [giri-services@3.2.0] info: hemera: {"topic":"/systems","method":"delete","uri":"/systems"}
    2019-05-17T06:22:07.688Z [giri-services@3.2.0] info: App runs the jobs...
```

THe application starts and subsribes to NATS topic. When incoming requests will be forwarded through these topics, the services will respond.

## Get Help

To learn more about the tool visit the [homepage](http://tombenke.github.io/giri-services/).


[npm-badge]: https://badge.fury.io/js/giri-services.svg
[npm-url]: https://badge.fury.io/js/giri-services
[travis-badge]: https://api.travis-ci.org/tombenke/giri-services.svg
[travis-url]: https://travis-ci.org/tombenke/giri-services
[Coveralls]: https://coveralls.io/github/tombenke/giri-services?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/tombenke/giri-services/badge.svg?branch=master

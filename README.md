giri-services
=============

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coveralls][BadgeCoveralls]][Coveralls]

## About

This application provides the backend services of the giri system.

It is a standalone application that holds the REST endpoint implementations of the giri backend services.


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

#### General server parameters

`giri-services` can be configured via:
- configuration file,
- environment variables,
- command line arguments,
- the combination of these above.

Dump the effective configuration object, before start:
- CLI parameter: `-d [true]`, or `--dumpConfig [true]`.

#### Logging

Set the log level of the server and its internal components:
- CLI parameter: `-l <level>`, or `logLevel <level>`
- Environment: `LOG_LEVEL`.
- Config object property: `logger.level`.
- Possible values: `info`, `debug`, `warn`, `error`.
- Default value: `info`.

Set the log format of the server and its internal components:
- CLI parameter: `-t <format>`, or `--logFormat <format>`.
- Environment: `LOG_FORMAT`.
- Config object property: `logger.transports.console.format`.
- Possible values: `plainText`, `json`.
- Default value: `plainText`.

#### PDMS (NATS) Gateway

Define the URI of the NATS server used by the pdms adapter:
- CLI parameter: `-n <nats-uri>`, or `--natsUri <nats-uri>`.
- Environment: `PDMS_NATS_URI`.
- Config object parameter: `pdms.natsUri`.
- Default value: `"nats://demo.nats.io:4222"`.

Define the NATS timeout value:
- CLI parameter: TODO.
- Environment: `PDMS_TIMEOUT`.
- Config object property: `pdms.timeout`.
- Default value: `2000`.

See [npac-pdms-hemera-adapter](https://www.npmjs.com/package/npac-pdms-hemera-adapter) for further details.

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

The application starts and subsribes to NATS topic. When incoming requests will be forwarded through these topics, the services will respond.

## Get Help

To learn more about the functions visit the [source documentation](http://tombenke.github.io/giri-services/api/).

[npm-badge]: https://badge.fury.io/js/giri-services.svg
[npm-url]: https://badge.fury.io/js/giri-services
[travis-badge]: https://api.travis-ci.org/tombenke/giri-services.svg
[travis-url]: https://travis-ci.org/tombenke/giri-services
[Coveralls]: https://coveralls.io/github/tombenke/giri-services?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/tombenke/giri-services/badge.svg?branch=master

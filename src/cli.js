#!/usr/bin/env node
/*jshint node: true */
'use strict'

const yargs = require('yargs')

const parse = (defaults, processArgv = process.argv) => {

    const argv = yargs()
        //        .exitProcess(false)
        .option('config', {
            alias: 'c',
            desc: 'The name of the configuration file',
            default: defaults.configFileName
        })
        .option('logLevel', {
            alias: 'l',
            desc: 'The log level',
            type: 'string',
            default: defaults.logger.level
        })
        .option('logFormat', {
            alias: 't',
            desc: 'The log (`plainText` or `json`)',
            type: 'string',
            default: defaults.logger.transports.console.format
        })
        .demandOption([])
        .showHelpOnFail(false, 'Specify --help for available options')
        .help()
        .parse(processArgv.slice(2))

    const results = {
        command: {
            name: 'server',
            type: 'async', // sync | async
            args: {
            }
        },
        cliConfig: {
            configFileName: argv.config,
            logger: {
                level: argv.logLevel,
                transports: {
                    console: {
                        format: argv.logFormat
                    }
                }
            }
        }
    }

    return results
}

module.exports = {
    parse
}

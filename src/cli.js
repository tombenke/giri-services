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
        .option('dumpConfig', {
            alias: 'd',
            desc: 'Print the effective configuration object to the console',
            type: 'boolean',
            default: false
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
        .option('natsUri', {
            alias: 'n',
            desc: 'NATS server URI used by the pdms adapter.',
            type: 'string',
            default: defaults.pdms.natsUri
        })
        .demandOption([])
        .showHelpOnFail(false, 'Specify --help for available options')
        .help()
        .parse(processArgv.slice(2))

    const results = {
        command: {
            name: 'server',
            type: 'async',
            args: {}
        },
        cliConfig: {
            configFileName: argv.config,
            dumpConfig: argv.dumpConfig,
            logger: {
                level: argv.logLevel,
                transports: {
                    console: {
                        format: argv.logFormat
                    }
                }
            },
            pdms: {
                natsUri: argv.natsUri
            }
        }
    }

    return results
}

module.exports = {
    parse
}

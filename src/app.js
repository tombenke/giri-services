/**
 * This module contains the `startApp()` function that is the main function of the application.
 *
 * @module app
 */
import _ from 'lodash'
import cli from './cli'
import pdms from 'npac-pdms-hemera-adapter'
import systems from './executives/systems/'
import npac from 'npac'
import appDefaults from './config'

/**
 * Start the application
 *
 * The main function of the application.
 *
 * The function sets up the configuration, the startup and terminator functions, and an empty list of jobs, then executes the startup process of the container.
 *
 * @arg {Object} argv - The command line arguments of the application. Default value: `process.argv`.
 * @arg {Function} cb - An error-first callback function which (if not `null`, then will be called, when the application successfully finishes its execution. Default value is `null`.
 *
 * @function
 */
export const startApp = (argv = process.argv, cb = null) => {
    const defaults = _.merge({}, appDefaults, pdms.defaults)

    // Use CLI to gain additional parameters
    const { cliConfig } = cli.parse(defaults, argv)

    // Create the final configuration parameter set
    const config = npac.makeConfig(defaults, cliConfig, 'configFileName')

    // Print the effective configuration on demand
    if (config.dumpConfig) {
        console.log('CONFIG: ', JSON.stringify(config, null, 2))
    }

    // Define the adapters and executives to add to the container
    const adapters = [npac.mergeConfig(config), npac.addLogger, pdms.startup, systems.startup]

    // Define the terminators
    const terminators = [systems.shutdown, pdms.shutdown]

    // Define the jobs to execute: hand over the command got by the CLI.
    const jobs = []

    //Start the container
    npac.start(adapters, jobs, terminators, cb)
}

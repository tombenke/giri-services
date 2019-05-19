import _ from 'lodash'
import defaults from './config'
import cli from './cli'
import pdms from 'npac-pdms-hemera-adapter'
import systems from './executives/systems/'
import npac from 'npac'
import appDefaults from './config'

export const startApp = (argv = process.argv, cb = null) => {
    const defaults = _.merge({}, appDefaults, pdms.defaults)

    // Use CLI to gain additional parameters, and command to execute
    const { cliConfig, command } = cli.parse(defaults, argv)
    // Create the final configuration parameter set
    const config = npac.makeConfig(defaults, cliConfig, 'configFileName')

    // Print the effective configuration on demand
    if (config.dumpConfig) {
        console.log('CONFIG: ', JSON.stringify(config, null, 2))
    }

    // Define the adapters and executives to add to the container
    const adapters = [
        npac.mergeConfig(config),
        npac.addLogger,
        pdms.startup,
        systems.startup
]

    // Define the terminators
    const terminators = [systems.shutdown, pdms.shutdown]

    // Define the jobs to execute: hand over the command got by the CLI.
    const jobs = []

    const endCb =
        cb !== null
            ? cb
            : (err, res) => {
                  if (command.type === 'async') {
                      console.log('npac jobs successfully finished')
                      process.kill(process.pid, 'SIGTERM')
                  }
              }

    //Start the container
    npac.start(adapters, jobs, terminators, /*endCb*/cb)
}

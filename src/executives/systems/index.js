/**
 * The main module of the `systems` executive.
 *
 * This module is responsible for registering the service endpoints during the startup process.
 *
 * This module holds the implementation of `startup()` and `shutdown()` functions of the executive, that are responsible for doing the maintenance functions during the shutdown process of the application, e.g. registering service endpoints, initializing/closing database connections, and so on.
 *
 * @module executives/systems/index
 */
import defaults from './config'
import _ from 'lodash'
import { getSystems, postSystems, deleteSystems } from './restEndpoints'

/**
 * The startup function of the adapter
 *
 * This function should be registered with the startup phase, then npac will call when the project is starting.
 *
 * @arg {Object} container  - The actual state of the container this adapter will be added
 * @arg {Function} next     - Error-first callback function to pass the result partial container extended with the pdmsHemera adapter.
 *
 * see also: the `npac.startup` process description.
 *
 * @function
 */
const startup = (container, next) => {
    // Merges the defaults with the config coming from the outer world
    const serviceConfig = _.merge({}, defaults, { service: container.config.service || {} })
    container.logger.info('Start up service adapter')

    // Register PDMS service(s)
    container.pdms.add({ topic: '/systems', method: 'get', uri: '/systems' }, getSystems(container))
    container.pdms.add({ topic: '/systems', method: 'post', uri: '/systems' }, postSystems(container))
    container.pdms.add({ topic: '/systems', method: 'delete', uri: '/systems' }, deleteSystems(container))

    // Call next setup function with the context extension
    next(null, {
        config: serviceConfig,
        systems: {}
    })
}

/**
 * The shutdown function of the service adapter
 *
 * This function should be registered with the shutdown phase, then npac will call when graceful shutdown happens.
 *
 * @arg {Object} container  - The actual state of the container this adapter is running
 * @arg {Function} next     - Error-first callback function to pass the result partial container extended with the pdmsHemera adapter.
 *
 * see also: the `npac.startup` process description.
 *
 * @function
 */
const shutdown = (container, next) => {
    container.logger.info('Shut down service adapter')
    next(null, null)
}

module.exports = {
    defaults: defaults,
    startup: startup,
    shutdown: shutdown
}

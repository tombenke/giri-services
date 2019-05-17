import defaults from './config'
import _ from 'lodash'
import uuid from 'node-uuid'
import { defaultHeaders, wrapOkResponse, wrapEmptyResponse } from '../commons'
import { findAllSystems, findSystemById, upsertSystem, deleteAllSystems } from './systems'

export const getSystems = container => (data, cb) => wrapOkResponse(findAllSystems, cb)

export const deleteSystems = container => (data, cb) => wrapEmptyResponse(deleteAllSystems, cb)

export const postSystems = container => (data, cb) => {
    const { headers, body } = data.request
    const newSystem = body
    const { host } = headers

    if (_.has(newSystem, 'id')) {
        // The new system object has ID
        if (findSystemById(newSystem.id) !== null) {
            // Conflict: the system exist yet
            cb(null, {
                headers: {
                    ...defaultHeaders,
                    "Location": `http://${host}/systems/${newSystem.id}`
                },
                status: 409,
                body: {
                    error: "Conflict. The system with the given ID already exists."
                }
            })
        } else {
            // Store the new system using its predefined ID
            wrapOkResponse(upsertSystem(newSystem), cb)
        }
    } else {
        // Generate a new, unique ID then store it
        wrapOkResponse(upsertSystem(_.extend({ id: uuid.v4() }, newSystem)), cb)
    }
}

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
    container.pdms.add({ topic: "/systems", method: "get", uri: "/systems" }, getSystems(container))
    container.pdms.add({ topic: "/systems", method: "post", uri: "/systems" }, postSystems(container))
    container.pdms.add({ topic: "/systems", method: "delete", uri: "/systems" }, deleteSystems(container))

    // Call next setup function with the context extension
    next(null, {
        config: serviceConfig,
        systems: {
        }
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
    container.logger.info("Shut down service adapter")
    next(null, null)
}

module.exports = {
    defaults: defaults,
    startup: startup,
    shutdown: shutdown
}

/**
 * The `systems` implementation
 *
 * Thi is the implementation of system management operations.
 *
 * @module systems
 */

import _ from 'lodash'

/**
 * The in-memory dictionary of system descriptors
 */
let systems = {}

/**
 * Delete all systems from the in-memory systems dictionary
 *
 * @return [Array] The list of systems (an empty array).
 *
 * @function
 */
export const deleteAllSystems = () => {
    systems = {}
    return findAllSystems(systems)
}

/**
 * Find all systems in the in-memory systems dictionary
 *
 * @return [Array] The list of systems found.
 *
 * @function
 */
export const findAllSystems = () => _.map(systems, value => value)

/**
 * Find a system by its unique ID
 *
 * @arg {String} id - The unique ID of the system to find
 *
 * @return [Object] The system object found, or `null` if not found.
 *
 * @function
 */
export const findSystemById = id => _.get(systems, id, null)

/**
 * Find a system by its ID and update, or create if it does not found.
 *
 * @arg {String} system - The system object to update, including it `id` property.
 *
 * @return [Object] The updated or created system object.
 *
 * @function
 */
export const upsertSystem = system => {
    systems[system.id] = system
    return systems[system.id]
}

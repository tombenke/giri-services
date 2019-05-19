/**
 * The REST API service endpoint implementations of the `systems` executive.
 *
 * These functions must be registered during the startup phase of the application, via the `startup()` functions of the executive, and they will respond to the incoming API calls.
 *
 * The responses are objects, that hold the complete information that is required by the `npac-webserver-adapter` middleware to make a correct HTTP response to the client, including `{ headers: {...}, status: ..., body: ... }`. This response object must be placed into the second parameter of the `cb` callback function, and `null` value as the first parameter.
 * NOTE: In case of the service wants to respond with a HTTP-level error, the callback also has to be called with `null`, and the response object will contain the error code and error content body.
 *
 * @module executives/systems/restEndpoints
 */

import defaults from './config'
import _ from 'lodash'
import uuid from 'node-uuid'
import { defaultHeaders, wrapOkResponse, wrapEmptyResponse } from '../commons'
import { findAllSystems, findSystemById, upsertSystem, deleteAllSystems } from './systems'

/**
 * Serve the `GET /systems` API call.
 *
 * The function retrieves and responses wth the list of systems.
 *
 * @arg {Object} data - The complete data payload of the incoming call
 * @arg {Function} cb - The error-first callback function that will be called either with the complete success response or with the response that describe the error and contains the corresponding error status code.
 *
 * @function
 */
export const getSystems = container => (data, cb) => wrapOkResponse(findAllSystems, cb)

/**
 * Serve the `DELETE /systems` API call.
 *
 * The function deletes all systems.
 *
 * @arg {Object} data - The complete data payload of the incoming call
 * @arg {Function} cb - The error-first callback function that will be called either with the complete success response or with the response that describe the error and contains the corresponding error status code.
 *
 * @function
 */
export const deleteSystems = container => (data, cb) => wrapEmptyResponse(deleteAllSystems, cb)

/**
 * Serve the `POST /systems` API call.
 *
 * The function creates a new system.
 *
 * @arg {Object} data - The complete data payload of the incoming call
 * @arg {Function} cb - The error-first callback function that will be called either with the complete success response or with the response that describe the error and contains the corresponding error status code.
 *
 * @function
 */
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
                    Location: `http://${host}/systems/${newSystem.id}`
                },
                status: 409,
                body: {
                    error: 'Conflict. The system with the given ID already exists.'
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

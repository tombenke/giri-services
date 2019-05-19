/**
 * The REST API service endpoint implementations of the `systems` executive.
 *
 * This module is responsible for registering the service endpoints during the startup process.
 *
 * These functions must be registered during the startup phase of the application, via the `startup()` functions of the executive.
 *
 * @module systems.restEndpoints
 */

import defaults from './config'
import _ from 'lodash'
import uuid from 'node-uuid'
import { defaultHeaders, wrapOkResponse, wrapEmptyResponse } from '../commons'
import { findAllSystems, findSystemById, upsertSystem, deleteAllSystems } from './systems'

/**
 * Serve the `GET /systems` API call.
 *
 * This function is registered by the `startup()` function of the `systems` executive, to respond the incoming API calls. The function retrieves the list of systems, then return a response object, that holds the complete information that is required by the `npac-webserver-adapter` middleware to make a correct HTTP response to the client, including `{ headers: {...}, status: ..., body: ... }`. This response object must be placed into the second parameter of the `cb` callback function, and `null` value as the first parameter.
 * NOTE: In case of the service wants to respond with a HTTP-level error, the callback also has to be called with `null`, and the response object will contain the error code and error content body.
 *
 * @arg {Object} data - The complete data payload of the incoming call
 * @arg {Function} cb - The error-first callback function
 *
 * @function
 */
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

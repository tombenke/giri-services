/**
 * Common functions used by several executives
 *
 * @module executives/commons
 */
import _ from 'lodash'

/**
 * A doctionary of default headers.
 *
 * These are the default headers that will be placed in the response if that is wrapped by the `Ok...`, or `Empty...` response functions.
 * type: {Object}
 */
export const defaultHeaders = {
    'Content-Type': 'application/json'
}

/**
 * Wraps the response body into a complete OK response object.
 *
 * @arg {Function | Object} bodyProvider - The body object of the response. If it is a Function, then it will be called, and its response will be used as response body.
 * @arg {Function} cb -  An error-first callback, that has to be called with the complete response object.
 *
 * @function
 */
export const wrapOkResponse = (bodyProvider, cb) =>
    cb(null, {
        headers: defaultHeaders,
        body: _.isFunction(bodyProvider) ? bodyProvider() : bodyProvider
    })

/**
 * Wraps an empty response without body.
 *
 * @arg {Function | Object} bodyProvider - If it is a Function, then it will be called to ensure that the operation is executed, but its result will not be used.
 * @arg {Function} cb -  An error-first callback, that has to be called with the empty-body response object.
 *
 * @function
 */
export const wrapEmptyResponse = (bodyProvider, cb) => {
    // Call wrapped body provider function
    if (_.isFunction(bodyProvider)) {
        bodyProvider()
    }

    // Return with an empty response
    cb(null, {
        headers: defaultHeaders,
        status: 204
    })
}

import _ from 'lodash'

export const defaultHeaders = {
    "Content-Type": "application/json"
}

export const defaultBody = {
    message: "This is the placeholder of the service response that is not implemented yet."
}

export const wrapOkResponse = (bodyProvider, cb) => cb(null, {
        headers: defaultHeaders,
        body: _.isFunction(bodyProvider) ? bodyProvider() : bodyProvider
    })

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

import npac from 'npac'
import { expect } from 'chai'
import sinon from 'sinon'
import * as _ from 'lodash'
import defaults from './config'
import * as pdms from 'npac-pdms-hemera-adapter'
import * as systems from './index'
import { findFilesSync, mergeJsonFilesSync } from 'datafile'
import { removeSignalHandlers, catchExitSignals, npacStart } from 'npac'
import { deleteAllSystems } from './systems'
import { testSystems } from './fixtures/'

const pdmsAct = (container, method, uri, request) => new Promise((resolve, reject) => {
    container.pdms.act({
            topic: uri,
            method: method,
            uri: uri,
            endpointDesc: {},
            request: request
        },
        (err, resp) => {
            if (err === null) {
                resolve(resp)
            }
        })
    })

const getSystems = container => pdmsAct(container, "get", "/systems", {
        cookies: {},
        headers: { "Accept": "application/json" },
        parameters: { query: {}, uri: {} }
    }).then(resp => {
        return Promise.resolve(resp.body)
    })

const postSystems = (container, newSystem) => pdmsAct(container, "post", "/systems", {
        cookies: {},
        headers: { "Accept": "application/json" },
        parameters: { query: {}, uri: {} },
        body: newSystem
    }).then(resp => {
        return Promise.resolve(resp.body)
    })

const deleteSystems = container => pdmsAct(container, "delete", "/systems", {
        cookies: {},
        headers: { "Accept": "application/json" },
        parameters: { query: {}, uri: {} }
    }).then(resp => {
        return Promise.resolve()
    })

describe('systems', () => {
    let sandbox

    beforeEach(done => {
        deleteAllSystems()
        removeSignalHandlers()
        sandbox = sinon.sandbox.create({})
        done()
    })

    afterEach(done => {
        removeSignalHandlers()
        sandbox.restore()
        done()
    })

    const config = _.merge({}, defaults, { /* Add command specific config parameters */ })
    const adapters = [
        npac.mergeConfig(config),
        npac.addLogger,
        pdms.startup,
        systems.startup
    ]

    const terminators = [
        systems.shutdown,
        pdms.shutdown
    ]

    it('#getSystems', (done) => {
        catchExitSignals(sandbox, done)

        const testJob = (container, next) => {
            getSystems(container).then(response => {
                expect(response).to.eql([])
                next(null, null)
            })
        }

        npacStart(adapters, [testJob], terminators)
    }).timeout(10000)

    it('#postSystems - create new system with no ID', (done) => {
        catchExitSignals(sandbox, done)

        const testJob = (container, next) => {
            const newSystem = _.omit(testSystems[0], ['id'])
            postSystems(container, newSystem).then(response => {
                expect(response.name).to.eql(newSystem.name)
                next(null, null)
            })
        }

        npacStart(adapters, [testJob], terminators)
    }).timeout(10000)

    it('#postSystems - create new system with ID', (done) => {
        catchExitSignals(sandbox, done)

        const testJob = (container, next) => {
            postSystems(container, testSystems[0]).then(response => {
                expect(_.has(response, 'id')).to.be.true
                expect(_.isString(response.id)).to.be.true
                expect(response).to.eql(testSystems[0])
                next(null, null)
            })
        }

        npacStart(adapters, [testJob], terminators)
    }).timeout(10000)

    it('#postSystems - conflict, system exits yet', (done) => {
        catchExitSignals(sandbox, done)

        const testJob = (container, next) => {
            const newSystem = testSystems[0]
            postSystems(container, newSystem).then(response => {
                postSystems(container, newSystem).then(response => {
                    expect(response).to.eql({ error: 'Conflict. The system with the given ID already exists.' })
                    next(null, null)
                })
            })
        }

        npacStart(adapters, [testJob], terminators)
    }).timeout(10000)

    it('#deleteSystems', (done) => {
        catchExitSignals(sandbox, done)

        const testJob = (container, next) => {
            const newSystem = testSystems[0]
            postSystems(container, newSystem).then(response => {
                deleteSystems(container).then(response => {
                    console.log(response)
                    next(null, null)
                })
            })
        }

        npacStart(adapters, [testJob], terminators)
    }).timeout(10000)
})

import npac from 'npac'
import { expect } from 'chai'
import sinon from 'sinon'
import * as _ from 'lodash'
import defaults from './config'
import * as pdms from 'npac-pdms-hemera-adapter'
import * as systems from './index'
import { findFilesSync, mergeJsonFilesSync } from 'datafile'
import { removeSignalHandlers, catchExitSignals, npacStart } from 'npac'

describe('systems', () => {
    let sandbox

    beforeEach(done => {
        removeSignalHandlers()
        sandbox = sinon.sandbox.create({ /* useFakeTimers: false */  })
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
//            const expected = serviceTestData
//            const results = container.service.serviceFunction()
//            expect(results).to.eql(expected)
            next(null, null)
        }

        npacStart(adapters, [testJob], terminators)
    }).timeout(10000)
})

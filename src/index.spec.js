import sinon from 'sinon'
import { expect } from 'chai'
import { removeSignalHandlers, catchExitSignals } from 'npac'

import { startApp } from './index'

describe('app', () => {
    let sandbox

    before(done => {
        removeSignalHandlers()
        sandbox = sinon.createSandbox({})
        done()
    })

    afterEach(done => {
        removeSignalHandlers()
        sandbox.restore()
        done()
    })

    it('#start - default mode', done => {
        catchExitSignals(sandbox, done)

        const processArgv = ['node', 'src/app.js']
        startApp(processArgv, (err, res) => {
            console.log('Send SIGTERM signal')
            process.kill(process.pid, 'SIGTERM')
        })
    })

})

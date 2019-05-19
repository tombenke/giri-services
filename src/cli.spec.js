import _ from 'lodash'
import { expect } from 'chai'
import pdms from 'npac-pdms-hemera-adapter'
import config from './config'
import cli from './cli'

before(done => {
    done()
})

after(done => {
    done()
})

describe('cli', () => {
    it('echo', done => {
        const processArgv = ['node', 'src/index.js']
        const defaults = _.merge({}, config, pdms.defaults)
        const expected = {
            command: {
                name: 'server',
                type: 'async',
                args: {}
            },
            cliConfig: {
                configFileName: 'config.yml',
                dumpConfig: false,
                logger: {
                    level: 'info',
                    transports: {
                        console: {
                            format: 'plainText'
                        }
                    }
                },
                pdms: {
                    natsUri: 'nats://demo.nats.io:4222'
                }
            }
        }

        expect(cli.parse(defaults, processArgv)).to.eql(expected)
        done()
    })
})

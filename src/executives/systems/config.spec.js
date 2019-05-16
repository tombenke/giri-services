import { expect } from 'chai'
import config from './config'

before(done => { done() })
after(done => { done() })

describe('systems.config', () => {

    it('#defaults', done => {
        const expected = {
            service: {
            }
        }
        
        const defaults = config
        expect(defaults).to.eql(expected)
        done()
    })
})

import { expect } from 'chai'
import _ from 'lodash'
import { deleteAllSystems, findAllSystems, upsertSystem, findSystemById } from './systems'
import { testSystems } from './fixtures/'

describe('systems.systems', () => {

    const uploadTestSystems = () => {
        _.map(testSystems, system => upsertSystem(system))
    }

    it('#deleteAllSystems', done => {
        expect(deleteAllSystems()).to.eql([])
        done()
    })

    it('#upsertSystem', done => {
        const newSystem = testSystems[0]
        expect(upsertSystem(newSystem)).to.eql(newSystem)
        expect(findAllSystems()).to.eql([newSystem])
        done()
    })

    it('#findAllSystems - when no systems are defined', done => {
        deleteAllSystems()
        expect(findAllSystems()).to.eql([])
        done()
    })

    it('#findAllSystems - when systems are defined', done => {
        deleteAllSystems()
        uploadTestSystems()
        expect(findAllSystems()).to.eql(testSystems)
        done()
    })

    it('#findSystemById - when systems are defined', done => {
        deleteAllSystems()
        uploadTestSystems()
        _.map(testSystems, testSystem => expect(findSystemById(testSystem.id)).to.eql(testSystem))
        done()
    })

    it('#findSystemById - when no systems are defined', done => {
        deleteAllSystems()
        _.map(testSystems, testSystem => expect(findSystemById(testSystem.id)).to.eql(null))
        done()
    })
})

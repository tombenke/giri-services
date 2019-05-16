import _ from 'lodash'

let systems = {}

export const deleteAllSystems = () => {
    systems = {}
    return findAllSystems(systems)
}

export const findAllSystems = () => _.map(systems, value => value)

export const findSystemById = id => _.get(systems, id, null)

export const upsertSystem = system => {
    systems[system.id] = system
    return systems[system.id]
}


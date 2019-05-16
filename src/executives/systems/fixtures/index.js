import { loadJsonFileSync } from 'datafile'

export const testSystems = loadJsonFileSync(__dirname + '/systems.yml')

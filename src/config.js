/**
 * The configuration parameters module of the webserver adapter.
 *
 * The property values of this object will be resolved during the startup process.
 * This object will appear as the default setup within the `container.config` object during the startup process, when the `startup` function of this adapter is called.
 *
 * In order to change the values of the configuration parameters, use either the corresponding environment variables, or merge your config object, with this default config setup.
 *
 * @module config
 */
import path from 'path'
import thisPackage from '../package.json'

/**
 * The default configuration
 *
 * @property {String} app.name - The name of the application
 * @property {String} app.version - The version of the application
 * @property {String} configFileName - The name of the config file. Default: `config.yml`
 * @property {String} logger.level - The log level: (`info` | `warn` | `error` | `debug`). Env. var.: `LOG_LEVEL`.
 * @property {String} logger.transport.console.format - The format of the log. Either `plainText` or `json`. Env. var.: `LOG_FORMAT`
 */
module.exports = {
    app: {
        name: thisPackage.name,
        version: thisPackage.version
    },
    configFileName: 'config.yml',

    logger: {
        level: process.env.LOG_LEVEL || 'info',
        transports: {
            console: {
                format: process.env.LOG_FORMAT || 'plainText'
            }
        }
    },
    installDir: path.resolve('./')
}

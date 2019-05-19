/**
 * The configuration parameters module of the systems executive.
 *
 * The property values of this object will be resolved during the startup process, and will extend the application level configuration.
 * This object will appear as the default setup within the `container.config.systems` object during the startup process, when the `startup` function of this adapter is called.
 *
 * In order to change the values of the configuration parameters, use either the corresponding environment variables, or merge your config object, with this default config setup.
 *
 * @module executives/systems/config
 */

/**
 * The default configuration for the systems executive
 * @property {Object} systems - The configuration parameters of the `systems` executive.
 */
module.exports = {
    systems: {
        // Place config `systems` executive specific parameters here, if needed!
    }
}

#!/usr/bin/env node
/*jshint node: true */
'use strict'
/**
 * The entry point of the application that is exposed as a command to execute.
 * This is the script that will be executed, when the user starts the `rest-services` command.
 *
 * @module start
 */
import { startApp } from './app'

startApp()

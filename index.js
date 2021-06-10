// Imports
const Auth = require('./auth')
const aedes = require('aedes')()
const stats = require('aedes-stats')
const term = require( 'terminal-kit' ).terminal
const version = require('./package.json').version
const { createServer } = require('aedes-server-factory')

// Variables
const auth  = new Auth(aedes) 
const port = 1883


// Create server aedes
const server = createServer(aedes)

// Running Exensions
auth.verifyAuth() // This exension verify autentication, if set.
stats(aedes) // This exension verify stats.

server.listen(port, function () {
  term.windowTitle('MyBroker')
  term( ' My' ).bold.bgBlue( 'Broker' ).green(` ${version}`)
  term('\n\n Broker started and listening on port ').bgBlue(port)
  term('\n Broker id instance is ').bgGray(aedes.id)
  term('\n\n').bgCyan('   Log   ')
})
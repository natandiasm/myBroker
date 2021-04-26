const aedes = require('aedes')()
const stats = require('aedes-stats')
const Auth = require('./auth')
const auth = new Auth(aedes) 
const { createServer } = require('aedes-server-factory')
const port = 1883

// Create server aedes
const server = createServer(aedes, {
  ws: true,
})

// Running Exensions
auth.verifyAuth() // This exension verify autentication, if set.
stats(aedes) // This exension verify stats, .

server.listen(port, function () {
  console.log('Broker started and listening on port ', port)
  console.log('Broker id instance is', aedes.id)
})
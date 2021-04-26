class Auth {
    constructor(aedes) {
        this.aedes = aedes
    }

    verifyAuth() {
        const user = process.env.USER_BROKER;
        const pass = process.env.PASS_BROKER;

        // Verify that the user has been set in the environment variables
        if (user) {
            // Get Authenticate with variable 
            this.aedes.authenticate = function (client, username, password, callback) {
                // Verify username
                if (username === user) {
                    // Verify that the password has been set in the environment variables
                    if (pass) {
                        // Verify password
                        if (password.toString() === pass) {
                            // If hit, connect with broker
                            console.log('user with id', client.id, 'connected')
                            callback(null, username, password)
                        } else {
                            let error = new Error('Auth error')
                            error.returnCode = 4
                            console.warn('user with id', client.id, 'password error')
                            callback(error, null)
                        }
                    } else {
                        // If not pass set, connect with broker only on username
                        callback(null, username)
                    }
                
                } else {
                    let error = new Error('Auth error')
                    error.returnCode = 4
                    console.warn('user with id', client.id, 'user error ', username)
                    callback(error, null)
                }
            }
        }

    }
}

module.exports = Auth
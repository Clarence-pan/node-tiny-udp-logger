var dgram = require('dgram');

module.exports = function TinyUdpLogger(port, host) {
    if (!(this instanceof TinyUdpLogger)) {
        return new TinyUdpLogger(port, host)
    }

    this.port = port || 514 // default use syslog port
    this.host = host || 'localhost'

    this.open = function () {
        if (!this.socket) {
            this.socket = dgram.createSocket('udp4')
        }
    }.bind(this)

    this.log = function (msg, cb) {
        if (this.socket) {
            this.socket.send(msg, this.port, this.host, cb || noop)
        } else {
            if (cb) {
                cb(new Error("Logger already closed."))
            }
        }
    }

    this.close = function () {
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
    }

    this.open()

    return this
}

function noop() {

}

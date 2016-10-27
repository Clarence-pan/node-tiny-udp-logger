var dgram = require('dgram');

var extend = Object.assign.bind(Object)

/**
 * Create or construct a TinyUdpLogger
 * @constructor
 * @param options {{host, port, shareSocket}}
 *          - host: which host to send message to, default is localhost
 *          - port: default use syslog's port
 *          - shareSocket: whether share socket
 * @returns {TinyUdpLogger}
 */
module.exports = function TinyUdpLogger(options) {
    if (!(this instanceof TinyUdpLogger)) {
        return new TinyUdpLogger(options)
    }

    options = extend({
        host: 'localhost',  // which host to send message to
        port: 514,          // default use syslog's port
        shareSocket: false  // whether share socket
    }, options)

    var sharedSocket = null

    /**
     * open socket -- only useful after close -- it will be auto called when constructing
     */
    this.open = function () {
        if (options.shareSocket && !sharedSocket){
            sharedSocket = dgram.createSocket('udp4')
        }
    }

    /**
     * Send a log message
     * @param msg {string} the log message to be sent
     * @param cb  {function} the callback which will be called after sent or failed
     */
    this.log = function (msg, cb) {
        if (options.shareSocket) {
            if (sharedSocket){
                sharedSocket.send(msg, options.port, options.host, cb || noop)
            } else {
                if (cb) {
                    cb(new Error("Logger already closed."))
                }
            }
        } else {
            var privateSocket = dgram.createSocket('udp4')
            privateSocket.send(msg, options.port, options.host, function(){
                privateSocket.close()
                if (cb){
                    cb.apply(this, arguments)
                }
            })
        }
    }

    /**
     * close the logger, prevent leaking socket
     */
    this.close = function () {
        if (options.shareSocket && sharedSocket){
            sharedSocket.close()
            sharedSocket = null
        }
    }

    this.open()

    return this
}

function noop() {

}

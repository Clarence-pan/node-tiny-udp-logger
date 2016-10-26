var dgram = require('dgram');

function _TinyUdpLogger(port, host){
    if (!(this instanceof _TinyUdpLogger)){
        return new _TinyUdpLogger(port, host)
    }

    this.port = port || 514 // default use syslog port
    this.host = host || 'localhost'

    this.open = function(){
        if (!this.socket){
            this.socket = dgram.createSocket('udp4')
        }
    }

    this.log = function(msg, cb){
        if (this.socket){
            this.socket.send(msg, this.port, this.host, cb)
        } else {
            if (cb){
                cb(new Error("Logger already closed."))
            }
        }
    }

    this.close = function(){
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
    }

    this.open()

    return this
}

module.exports = function TinyUdpLogger(port, host){
    var logger = new _TinyUdpLogger(port, host);

    if (!(this instanceof TinyUdpLogger)){
        return Object.assign(function (){
            logger.log.apply(logger, arguments);
        }, {
            log: logger.log,
            open: logger.open,
            close: logger.close,
        })
    }

    Object.assign(this, {
        log: logger.log,
        open: logger.open,
        close: logger.close,
    })

    return this;
}

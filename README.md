Tiny UDP Logger
===============

A tiny logger using UDP to send log messages.


Install
========


```
npm install --save tiny-udp-logger
```


Usage
=====

1. Default mode -- each log message using a new socket

```js
var logger = require('tiny-udp-logger')({port: 514, host: 'localhost'})

logger.log("Hello world!")
logger.log("Hello world!")
logger.log("Hello world!")


```


2. Share socket mode -- all log message using a shared socket -- so, don't forget to close the logger so that prevent leaking socket.
  
  

```js
var logger = require('tiny-udp-logger')({port: 514, host: 'localhost', shareSocket})

logger.log("Hello world!")
logger.log("Hello world!")
logger.log("Hello world!")
logger.log("Hello world!")
logger.log("Hello world!", function(){
    logger.close() // close the logger to prevent leaking socket
})

```




